<script lang="ts" setup>
import JGraph from '@/components/JGraph/JGraph.vue'
import { createEdge, createNode, type Graph } from '@/components/JGraph'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'

import { colors } from '../../uno.config'

const containerElement = useTemplateRef('container')
const { width, height } = useElementSize(containerElement)

const graph = ref<Graph>({ nodes: [], edges: [] })
const nodeCount = ref(20)
const edgeCount = ref(10)
const nodeRadius = 40

function generateEdges() {
  const _edges = Array.from({ length: edgeCount.value }, (_, i) => {
    const source = graph.value.nodes[Math.floor(Math.random() * graph.value.nodes.length)]
    const target = graph.value.nodes[Math.floor(Math.random() * graph.value.nodes.length)]

    return createEdge({
      source,
      target,
      label: `Edge ${i}`,
      length: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
    })
  })

  graph.value.edges = _edges
}

function generateNodes() {
  const _nodes = Array.from({ length: nodeCount.value }, (_, i) => {
    let x = Math.random() * width.value
    let y = Math.random() * height.value

    if (x < nodeRadius) x = nodeRadius
    if (x > width.value - nodeRadius) x = width.value - nodeRadius
    if (y < nodeRadius) y = nodeRadius
    if (y > height.value - nodeRadius) y = height.value - nodeRadius

    console.log({ x, y })

    return createNode({
      id: `node-${i}`,
      label: `Node ${i}`,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: nodeRadius,
    })
  })

  graph.value.nodes = _nodes
  generateEdges()
}

onMounted(() => {
  generateNodes()
  generateEdges()
})
</script>

<template>
  <div ref="container">
    <div class="flex gap-2 p-2">
      <button class="btn" @click="generateNodes">new nodes</button>
      <button class="btn" @click="generateEdges">new edges</button>
    </div>
    <JGraph v-model="graph" class="h-full w-full" />
  </div>
</template>
