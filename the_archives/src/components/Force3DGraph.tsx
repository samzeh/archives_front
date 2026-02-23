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

    graphData.links.forEach(link => {
      const a = graphData.nodes[link.source];
      const b = graphData.nodes[link.target];
      !a.neighbors && (a.neighbors = []); // check to see if node object has neighbors array, if not create one
      !b.neighbors && (b.neighbors = []);
      a.neighbors.push(b); // add neighbors
      b.neighbors.push(a);

      !a.links && (a.links = []); // check to see if node object has linnks array, if not create them
      !b.links && (b.links = []);
      a.links.push(link); // push the link object (ex. { "source": 0, "target": 1 }) into the links array of the node object
      b.links.push(link);
    });

    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode = null;


    if (containerRef.current) {
      graph = new ForceGraph3D(containerRef.current)
        .backgroundColor('#000010')
        .graphData(graphData)
        .nodeColor(node => 
          highlightNodes.has(node) 
          ? node === hoverNode 
            ? 'rgb(255,0,0,1)' 
            : 'rgba(255,160,0,0.8)' 
          :node.id === 0
            ? 'rgb(255, 0, 247)'
            : 'rgba(0,255,255,0.6)')
        .linkWidth(link => highlightLinks.has(link) ? 4 : 1)
        .linkDirectionalParticles(link => highlightLinks.has(link) ? 4 : 0)
        .linkDirectionalParticleWidth(4)

        .onNodeHover(node => {
          // no state change
          if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

          highlightNodes.clear();
          highlightLinks.clear();

          if (node) {
            highlightNodes.add(node);
            node.neighbors?.forEach(neighbor => highlightNodes.add(neighbor));
            node.links?.forEach(link => highlightLinks.add(link));
          }

          hoverNode = node || null;

          updateHighlight();
        })
        .onLinkHover(link => {
          highlightNodes.clear();
          highlightLinks.clear();

          if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
          }

          updateHighlight();
        })
        .nodeLabel('label')
        .nodeRelSize(8)
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

        function updateHighlight() {
          graph
            ?.nodeColor(graph.nodeColor())
            ?.linkWidth(graph.linkWidth())
            ?.linkDirectionalParticles(graph.linkDirectionalParticles())
        }

    }

    return () => {
      graph?._destructor?.();
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}