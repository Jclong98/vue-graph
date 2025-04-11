<script lang="ts" setup>
import { useRafFn } from '@vueuse/core'
import type { Edge, Node } from '.'
import { computed } from 'vue'

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

  target.x -= offsetX
  target.y -= offsetY

  source.x += offsetX
  source.y += offsetY
}

useRafFn(() => {
  moveTowardsLength(modelValue.value.source, modelValue.value.target)
})
</script>

<template>
  <g>
    <line
      :x1="modelValue.source.x"
      :y1="modelValue.source.y"
      :x2="modelValue.target.x"
      :y2="modelValue.target.y"
      stroke="black"
    />
    <text
      v-if="modelValue.label"
      class="select-none"
      :x="midPoint.x"
      :y="midPoint.y"
      text-anchor="middle"
    >
      {{ modelValue.label }}
    </text>
  </g>
</template>
