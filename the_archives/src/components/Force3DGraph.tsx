import { useRef, useEffect } from 'react'
import ForceGraph3D from '3d-force-graph'

interface ForceGraph3DInstance {
  _destructor?: () => void
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

    let graph: ForceGraph3DInstance | null = null;


    if (containerRef.current) {
      graph = new ForceGraph3D(containerRef.current)
        .backgroundColor('#000010')
        .graphData(graphData)
        .nodeColor(n => n.id === 0 ? 'orange' : 'skyblue')
        .nodeLabel('label')
        .nodeRelSize(8)
        .linkColor(() => 'white')
        .onNodeClick(node => {
          // Aim at node from outside it
          const distance = 100;
          const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

          const newPos = node.x || node.y || node.z
            ? { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
            : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

          graph?.cameraPosition(
            newPos, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
          );
        });

        
    }

    return () => {
      graph?._destructor?.();
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}