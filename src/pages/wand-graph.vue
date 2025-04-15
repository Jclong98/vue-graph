<script lang="ts" setup>
import { colors } from '../../uno.config'
import JGraph from '@/components/JGraph/JGraph.vue'
import { createEdge, createNode } from '@/components/JGraph'
import type { Edge, Graph, Node } from '@/components/JGraph'
import { reactive, ref } from 'vue'
import JInput from '@/components/JInput.vue'

const nodes: Node[] = [
  createNode({ id: '_start', x: 50, y: 250, label: 'Start', color: 'green' }),
  createNode({ id: '1', x: 100, y: 250, label: 'Spark Bolt', color: 'blue' }),
  createNode({ id: '2', x: 200, y: 250, label: 'Spark Bolt with Trigger', color: 'yellow' }),
  createNode({ id: '3', x: 250, y: 150 }),
  createNode({ id: '4', x: 300, y: 250, color: 'cyan', label: 'Double Spell' }),
  createNode({ id: '5', x: 500, y: 100, color: 'blue', label: 'Spark Bolt' }),
  createNode({ id: '6', x: 500, y: 400, color: 'blue', label: 'Spark Bolt' }),
  createNode({ id: '7', x: 600, y: 250 }),
]

function nodeById(id: string): Node {
  const node = nodes.find((node) => node.id === id)
  if (!node) throw new Error(`Node with id ${id} not found`)
  return node
}

const edges: Edge[] = [
  // main line edges
  createEdge({ source: nodeById('_start'), target: nodeById('1'), width: 2 }),
  createEdge({ source: nodeById('1'), target: nodeById('2'), width: 2 }),
  createEdge({ source: nodeById('2'), target: nodeById('4'), width: 2 }),
  createEdge({ source: nodeById('4'), target: nodeById('7'), width: 2 }),

  // splitter/payload edges
  createEdge({ source: nodeById('2'), target: nodeById('3'), color: 'green' }),
  createEdge({ source: nodeById('4'), target: nodeById('5'), color: 'green' }),
  createEdge({ source: nodeById('4'), target: nodeById('6'), color: 'green' }),
]

const graph = reactive<Graph>({ nodes, edges })

const id1 = ref('')
const id2 = ref('')
const color = ref('gray')
const width = ref(2)
function addEdge() {
  const source = nodeById(id1.value)
  const target = nodeById(id2.value)
  graph.edges.push(createEdge({ source, target, color: color.value, width: width.value }))
  id1.value = ''
  id2.value = ''
}

const nodeId = ref('')
const nodeLabel = ref('')

function addNode() {
  const id = nodeId.value
  const label = nodeLabel.value
  graph.nodes.push(createNode({ id, label, color: 'gray', x: 600, y: 300 }))
  nodeId.value = ''
  nodeLabel.value = ''
}
</script>

<template>
  <div class="h-full w-full flex-col flex">
    <!-- edge input -->
    <div class="flex gap-2 p-2">
      <JInput placeholder="id" v-model="id1" class="w-16" />
      <i class="i-iconoir-arrow-right self-center"></i>
      <JInput placeholder="id" v-model="id2" class="w-16" />

      <!-- color select -->
      <select v-model="color" class="border px-4 py-1 rounded border-black/50">
        <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
      </select>

      <!-- width -->
      <JInput placeholder="width" v-model.number="width" class="w-16" />

      <button class="btn" @click="addEdge">add edge</button>
    </div>

    <!-- new node -->
    <div class="flex gap-2 p-2">
      <JInput placeholder="id" v-model="nodeId" class="w-16" />
      <i class="i-iconoir-plus self-center"></i>
      <JInput placeholder="label" v-model="nodeLabel" />
      <button class="btn" @click="addNode">add node</button>
    </div>

    <JGraph v-model="graph" class="flex-1" />
  </div>
</template>
