<script lang="ts" setup>
import { useMouse, useMousePressed, useRafFn } from '@vueuse/core'
import type { Node } from './'
import { computed, reactive, useTemplateRef, watch } from 'vue'

const emit = defineEmits<{
  delete: []
}>()

const modelValue = defineModel<Node>({ required: true })

const cirlceElement = useTemplateRef('circleElement')
const mouse = reactive(useMouse())
const { pressed } = useMousePressed({ target: cirlceElement })

const clickOffsetPosition = reactive({ x: 0, y: 0 })

// Watch for when the circle is pressed
watch(pressed, (nv) => {
  if (nv) {
    // Calculate the offset between the mouse and the circle's center
    clickOffsetPosition.x = mouse.x - modelValue.value.x
    clickOffsetPosition.y = mouse.y - modelValue.value.y
  }
  modelValue.value.isBeingDragged = nv
})

const speed = 0.5

useRafFn(() => {
  // Move the node towards the mouse while pressed, considering the offset
  if (pressed.value) {
    const targetPosition = {
      x: mouse.x - clickOffsetPosition.x,
      y: mouse.y - clickOffsetPosition.y,
    }

    modelValue.value.x += (targetPosition.x - modelValue.value.x) * speed
    modelValue.value.y += (targetPosition.y - modelValue.value.y) * speed
  }
})

const colors = computed(() => {
  const c = modelValue.value.color
  return `fill-${c}-500 hover:fill-${c}-600 active:fill-${c}-700 focus-visible:stroke-${c}-900`
})
</script>

<template>
  <g>
    <!-- node -->
    <circle
      ref="circleElement"
      :cx="modelValue.x"
      :cy="modelValue.y"
      :r="modelValue.radius"
      class="cursor-grab outline-0 active:cursor-grabbing focus-visible:stroke-3"
      :class="colors"
      tabindex="0"
    />

    <!-- label -->
    <text
      v-if="modelValue.label"
      class="select-none"
      :x="modelValue.x"
      :y="modelValue.y - modelValue.radius - 10"
      text-anchor="middle"
    >
      {{ modelValue.label }}
    </text>

    <!-- id text -->
    <text
      v-if="modelValue.id"
      class="pointer-events-none select-none"
      :x="modelValue.x"
      :y="modelValue.y"
      text-anchor="middle"
    >
      {{ modelValue.id }}
    </text>

    <!-- coordinate text -->
    <text
      class="pointer-events-none select-none"
      :x="modelValue.x"
      :y="modelValue.y + modelValue.radius + 15"
      text-anchor="middle"
    >
      {{ modelValue.x.toFixed(0) }}, {{ modelValue.y.toFixed(0) }}
    </text>

    <!-- delete button -->
    <circle
      :cx="modelValue.x + modelValue.radius"
      :cy="modelValue.y - modelValue.radius"
      r="10"
      fill="transparent"
      class="cursor-pointer hover:fill-red-400 active:fill-red-600"
      @click="emit('delete')"
    />
  </g>
</template>
