<script lang="ts" setup>
import { useRafFn } from '@vueuse/core'
import type { Edge, Node } from '.'
import { computed } from 'vue'

const emit = defineEmits<{
  delete: []
}>()

const modelValue = defineModel<Edge>({ required: true })

const midPoint = computed(() => ({
  x: (modelValue.value.source.x + modelValue.value.target.x) / 2,
  y: (modelValue.value.source.y + modelValue.value.target.y) / 2,
}))

const speed = 0.1

function moveTowardsLength(source: Node, target: Node) {
  const dx = target.x - source.x
  const dy = target.y - source.y
  const currentLength = Math.sqrt(dx * dx + dy * dy)

  if (currentLength === 0) return

  const scale = (currentLength - modelValue.value.length) * speed
  const offsetX = (dx / currentLength) * scale
  const offsetY = (dy / currentLength) * scale

  // move the nodes
  target.x -= offsetX
  target.y -= offsetY

  source.x += offsetX
  source.y += offsetY
}

useRafFn(() => {
  moveTowardsLength(modelValue.value.source, modelValue.value.target)
})

const colors = computed(() => {
  const c = modelValue.value.color
  return `stroke-${c}-500`
})
</script>

<template>
  <g>
    <line
      :x1="modelValue.source.x"
      :y1="modelValue.source.y"
      :x2="modelValue.target.x"
      :y2="modelValue.target.y"
      :class="colors"
      :stroke-width="modelValue.width"
    />
    <!-- <text
      v-if="modelValue.label"
      class="select-none"
      :x="midPoint.x"
      :y="midPoint.y"
      text-anchor="middle"
    >
      {{ modelValue.label }}
    </text> -->
    <circle
      :cx="midPoint.x"
      :cy="midPoint.y"
      r="10"
      fill="transparent"
      class="cursor-pointer hover:fill-red-400 active:fill-red-600"
      @click="emit('delete')"
    />
  </g>
</template>
