<script lang="ts" setup>
import JGraph from '@/components/JGraph/JGraph.vue'
import { createEdge, createNode } from '@/components/JGraph'
import type { Edge, Graph, Node } from '@/components/JGraph'
import { ref } from 'vue'

const nodes: Node[] = [
  createNode({ id: '1', x: 100, y: 250, label: 'Spark Bolt', color: 'blue' }),
  createNode({ id: '2', x: 200, y: 250, label: 'Spark Bolt with Trigger', color: 'yellow' }),
  createNode({ id: '2.1', x: 250, y: 150 }),
  createNode({ id: '2.1', x: 300, y: 250, color: 'cyan', label: 'Double Spell' }),
  createNode({ id: '2.1', x: 500, y: 100, color: 'blue', label: 'Spark Bolt' }),
  createNode({ id: '2.1', x: 500, y: 400, color: 'blue', label: 'Spark Bolt' }),
  createNode({ id: '2.1', x: 600, y: 250 }),
]

const edges: Edge[] = [
  createEdge({ source: nodes[0], target: nodes[1], width: 2 }),
  createEdge({ source: nodes[1], target: nodes[2], color: 'green', label: 'payload' }),
  createEdge({ source: nodes[1], target: nodes[3], width: 2 }),
  createEdge({ source: nodes[3], target: nodes[4], color: 'green' }),
  createEdge({ source: nodes[3], target: nodes[5], color: 'green' }),
  createEdge({ source: nodes[3], target: nodes[6], width: 2 }),
]

const graph = ref<Graph>({ nodes, edges })
</script>

<template>
  <div>
    <JGraph v-model="graph" class="h-full w-full" />
  </div>
</template>
