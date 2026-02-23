import { useRef, useEffect } from 'react'
import ForceGraph3D from '3d-force-graph'

interface ForceGraph3DInstance {
  _destructor?: () => void
}

interface NodeObject {
  id: number
  label: string
  neighbors?: NodeObject[]
  links?: LinkObject[]
  x: number
  y: number
  z: number
}

interface LinkObject {
  source: number
  target: number
}



export default function Force3DGraph() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const graphData = {
    nodes: Array.from({ length: 10 }, (_, i) => ({ id: i, label: `Node ${i}` })),
    links: [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 1, target: 2 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
      { source: 5, target: 3 }
    ]
  }

  useEffect(() => {

    if (!containerRef.current) return;

    graphData.links.forEach(link => {
      const a: NodeObject = graphData.nodes[link.source];
      const b: NodeObject = graphData.nodes[link.target];
      if (!a.neighbors) a.neighbors = []; // check to see if node object has neighbors array, if not create one
      if (!b.neighbors) b.neighbors = [];
      a.neighbors.push(b); // add neighbors
      b.neighbors.push(a);

      if (!a.links) a.links = []; // check to see if node object has linnks array, if not create them
      if (!b.links) b.links = [];
      a.links.push(link); // push the link object (ex. { "source": 0, "target": 1 }) into the links array of the node object
      b.links.push(link);
    });

    const graph: ForceGraph3DInstance = new ForceGraph3D(containerRef.current)
      .backgroundColor('#000000')
      .graphData(graphData)
      .nodeRelSize(8)
      .nodeLabel('label')
      .linkDirectionalParticleWidth(4)
      .nodeColor((node: NodeObject) => node.id === 0? 'rgb(255, 0, 247)' : 'rgba(0,255,255,0.6)')

    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode: NodeObject | null = null;
    let selectedNode: NodeObject | null = null;


    function updateHighlight() {
      graph.nodeColor((node: NodeObject) => 
        highlightNodes.has(node) 
          ? node === hoverNode 
            ? 'rgb(255,0,0,1)' 
            : 'rgba(255,160,0,0.8)' 
          :node.id === 0
          ? 'rgb(255, 0, 247)'
          : 'rgba(0,255,255,0.6)'
      )
      graph.linkWidth((link: LinkObject) =>
        highlightLinks.has(link) ? 4 : 1
      )
      graph.linkDirectionalParticles((link: LinkObject) => 
        highlightLinks.has(link) ? 4 : 0
      )
      graph.linkColor((link: LinkObject) => '#ffffff')
    }

    function highlightNode(node: NodeObject | null) {
      highlightNodes.clear();
      highlightLinks.clear();

      if (node) {
        highlightNodes.add(node);
        node.neighbors?.forEach(neighbor => highlightNodes.add(neighbor));
        node.links?.forEach(link => highlightLinks.add(link));
      }

      hoverNode = node;
      updateHighlight();
    }

    graph.onNodeHover((node: NodeObject | null) => {
      if (!selectedNode) {
        highlightNode(node);
      }
    })

    graph.onLinkHover((link: LinkObject | null) => {
      if (!selectedNode) {
        highlightNodes.clear()
        highlightLinks.clear()
        if (link) {
          highlightLinks.add(link)
          highlightNodes.add(link.source)
          highlightNodes.add(link.target)
        }
        updateHighlight()
      }
    })

    graph.onNodeClick((node: NodeObject) => {
      selectedNode = node

      const distance = 100
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)
      const newPos = {
        x: node.x * distRatio,
        y: node.y * distRatio,
        z: node.z * distRatio
      }
      const lookAt = { x: node.x, y: node.y, z: node.z }

      graph.cameraPosition(newPos, lookAt, 3000)
      highlightNode(node)
    })

    graph.onBackgroundClick(() => {
      selectedNode = null
      highlightNode(null)
    })

    return () => {
      graph?._destructor?.();
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}