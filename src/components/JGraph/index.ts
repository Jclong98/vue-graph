export type Node = {
  id: string
  label?: string
  x: number
  y: number
  radius: number
  isBeingDragged: boolean
  color: string
}

export type Edge = {
  label?: string
  source: Node
  target: Node
  length: number
  color: string
  width: number
}

export type Graph = {
  nodes: Node[]
  edges: Edge[]
}

export function createNode(node: Partial<Node> & Pick<Node, 'id' | 'x' | 'y'>): Node {
  return {
    radius: 30,
    isBeingDragged: false,
    color: 'gray',
    ...node,
  }
}

export function createEdge(edge: Partial<Edge> & Pick<Edge, 'source' | 'target'>): Edge {
  return {
    length: 150,
    color: 'gray',
    width: 1,
    ...edge,
  }
}
