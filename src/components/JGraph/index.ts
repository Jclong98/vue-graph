export type Node = {
  id: string
  label?: string
  x: number
  y: number
  radius: number
  isBeingDragged: boolean
}

export type Edge = {
  label?: string
  source: Node
  target: Node
  length: number
}

export type Graph = {
  nodes: Node[]
  edges: Edge[]
}

export function createNode(node: Partial<Node> & Pick<Node, 'id' | 'x' | 'y'>): Node {
  return {
    radius: 30,
    isBeingDragged: false,
    ...node,
  }
}

export function createEdge(edge: Partial<Edge> & Pick<Edge, 'source' | 'target'>): Edge {
  return {
    length: 150,
    ...edge,
  }
}
