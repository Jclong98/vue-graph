<script lang="ts" setup>
import {
  defineNode,
  defineLink,
  defineGraphConfig,
  defineGraph,
  GraphController,
} from 'd3-graph-controller'
import 'd3-graph-controller/default.css'
import type { GraphNode, GraphLink } from 'd3-graph-controller'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

export type CustomType = 'primary' | 'secondary'
export interface CustomNode extends GraphNode<CustomType> {
  radius: number
}
export interface CustomLink extends GraphLink<CustomType, CustomNode> {
  length: number
}
const config = defineGraphConfig<CustomType, CustomNode, CustomLink>({
  nodeRadius: (node: CustomNode) => node.radius,
  simulation: {
    forces: {
      centering: {
        strength: (node: CustomNode) => (node.type === 'primary' ? 0.5 : 0.1),
      },
      link: {
        length: (link: CustomLink) => link.length,
      },
    },
  },
})

const a = defineNode<CustomType, CustomNode>({
  id: 'a',
  type: 'primary',
  isFocused: false,
  color: 'green',
  label: {
    color: 'black',
    fontSize: '1rem',
    text: 'A',
  },
  radius: 64,
})

const b = defineNode<CustomType, CustomNode>({
  id: 'b',
  type: 'secondary',
  isFocused: false,
  color: 'blue',
  label: {
    color: 'black',
    fontSize: '1rem',
    text: 'B',
  },
  radius: 32,
})

const aToB = defineLink<CustomType, CustomNode, CustomNode, CustomLink>({
  source: a,
  target: b,
  color: 'red',
  label: {
    color: 'black',
    fontSize: '1rem',
    text: '128',
  },
  length: 128,
})

const graph = defineGraph<CustomType, CustomNode, CustomLink>({
  nodes: [a, b],
  links: [aToB],
})

const container = useTemplateRef('container')

onMounted(() => {
  if (!container.value) return

  let controller: GraphController<CustomType, CustomNode, CustomLink> | null = null
  controller = new GraphController(container.value, graph, config)

  onUnmounted(() => {
    controller?.shutdown()
  })
})
</script>

<template>
  <div class="flex flex-col">
    <div id="graph" ref="container"></div>
  </div>
</template>

<style scoped>
#graph {
  width: 100%;
  height: 100%;
}
</style>
