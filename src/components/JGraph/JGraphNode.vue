<script lang="ts" setup>
import { useMouse, useMousePressed, useRafFn } from '@vueuse/core'
import type { Node } from './'
import { reactive, useTemplateRef, watch } from 'vue'

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

// const coords = computed(() => `${modelValue.value.x.toFixed()}, ${modelValue.value.y.toFixed()}`)
</script>

<template>
  <g>
    <circle
      ref="circleElement"
      :cx="modelValue.x"
      :cy="modelValue.y"
      :r="modelValue.radius"
      class="cursor-grab outline-0 fill-blue-500 hover:(fill-blue-600) active:(cursor-grabbing fill-blue-700) focus-visible:(stroke-2 stroke-blue-900)"
      tabindex="0"
    />
    <text
      v-if="modelValue.label"
      class="select-none"
      :x="modelValue.x"
      :y="modelValue.y - modelValue.radius - 10"
      text-anchor="middle"
    >
      {{ modelValue.label }}
    </text>
  </g>
</template>
