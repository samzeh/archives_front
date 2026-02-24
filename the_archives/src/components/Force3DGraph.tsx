import React, { useRef, useEffect } from 'react'
import ForceGraph3D from '3d-force-graph'
import { useQuery } from '@tanstack/react-query'


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

const liked_book_id = 68;

const fetchGraphData = async(liked_book_id: number) => {
  const response = await fetch(`/recommendation-graph/${liked_book_id}`, {
    method: "GET",
    headers: {
    "Content-Type": "application/json",
  } 
  })
  const data = await response.json()
  console.log("raw data from fetch:", data)
  return data
  
}

export default function Force3DGraph() {

  const {data: graphDataInfo, isLoading, error, status } = useQuery({
    queryKey: ["liked_books"],
    queryFn: () => fetchGraphData(liked_book_id)
  })

  console.log("status:", status, "error:", error, "data:", graphDataInfo)


  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log("useEffect fired, graphDataInfo:", graphDataInfo)
    console.log("containerRef:", containerRef.current)

    if (!containerRef.current || !graphDataInfo?.nodes || !graphDataInfo?.links) {
      console.log("bailing early — one of these is falsy:", {
        container: !!containerRef.current,
        nodes: !!graphDataInfo?.nodes,
        links: !!graphDataInfo?.links
      })
      return;
    }
    const nodes_list = graphDataInfo.nodes
    const links_list = graphDataInfo.links
    console.log(nodes_list)

    const graphData = {
      nodes: nodes_list,
      links: links_list
    }

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
      graph.nodeColor((node: NodeObject) => {
        if (highlightNodes.has(node)) {
          if (node === hoverNode) {
            if (node.id === 0) {
              return 'rgb(255,0,247,1)'; 
            } else {
              return 'rgb(255,0,0,1)';
            }
          } else {
            return 'rgba(255,160,0,0.8)'; 
          }
        } else {
          if (node.id === 0) {
            return 'rgb(255, 0, 247)';
          } else {
            return 'rgba(0,255,255,0.6)';
          }
        }
      }
      )
      graph.linkWidth((link: LinkObject) =>
        highlightLinks.has(link) ? 4 : 1
      )
      graph.linkDirectionalParticles((link: LinkObject) => 
        highlightLinks.has(link) ? 4 : 0
      )
      graph.linkColor(link => '#ffffff')
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
  }, [graphDataInfo])

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {isLoading && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
          Loading graph...
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}