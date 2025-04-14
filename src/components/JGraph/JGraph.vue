<script lang="ts" setup>
import JGraphNode from './JGraphNode.vue'
import type { Graph } from './'
import JGraphEdge from './JGraphEdge.vue'
import { useRafFn } from '@vueuse/core'

const { minDistance = 100, repulsionFactor = 0.1 } = defineProps<{
  minDistance?: number
  repulsionFactor?: number
}>()

const modelValue = defineModel<Graph>({ required: true })

useRafFn(() => {
  const nodes = modelValue.value.nodes

  for (const [i, nodeA] of nodes.entries()) {
    for (const nodeB of nodes.slice(i + 1)) {
      const dx = nodeB.x - nodeA.x
      const dy = nodeB.y - nodeA.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < minDistance) {
        const angle = Math.atan2(dy, dx)
        const offset = (minDistance - distance) * repulsionFactor
        const offsetX = Math.cos(angle) * offset
        const offsetY = Math.sin(angle) * offset

        nodeA.x -= offsetX
        nodeA.y -= offsetY
        nodeB.x += offsetX
        nodeB.y += offsetY
      }
    }
  }
})
</script>

<template>
  <svg>
    <JGraphEdge
      v-for="(edge, index) in modelValue.edges"
      :key="`${edge.source}-${edge.target}`"
      :model-value="edge"
      @update:model-value="modelValue.edges[index] = $event"
      @delete="modelValue.edges.splice(index, 1)"
    />

    <JGraphNode
      v-for="(node, index) in modelValue.nodes"
      :key="node.id"
      :model-value="node"
      @update:model-value="modelValue.nodes[index] = $event"
    />
  </svg>
</template>
