<script lang="ts" setup>
import JGraphNode from './JGraphNode.vue'
import type { Graph } from './'
import JGraphEdge from './JGraphEdge.vue'

const props = defineModel<Graph>({ required: true })
</script>

<template>
  <svg>
    <JGraphEdge
      v-for="(edge, index) in props.edges"
      :key="`${edge.source}-${edge.target}`"
      :model-value="edge"
      @update:model-value="props.edges[index] = $event"
    />

    <JGraphNode
      v-for="(node, index) in props.nodes"
      :key="node.id"
      :model-value="node"
      @update:model-value="props.nodes[index] = $event"
    />
  </svg>
</template>
