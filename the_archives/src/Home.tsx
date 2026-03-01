import './Home.css'
import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import DetailCard from './components/detailCard'
import ExpandedDetailCard from './components/ExpandedDetailCard'
import Force3DGraph from './components/Force3DGraph'
import NodeObject from './components/Force3DGraph'

function Home() {
  const [selectedNode, setSelectedNode] = useState<typeof NodeObject>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <>
      <Force3DGraph
        cardVisible={!!selectedNode}
        onNodeClick={(node) => {
          setSelectedNode(null)
          setIsExpanded(false)
          if (timerRef.current) clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => setSelectedNode(node), 1800)
        }}
        onDismiss={() => {
          if (timerRef.current) clearTimeout(timerRef.current)
          setSelectedNode(null)
          setIsExpanded(false)
        }}
      />

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key="card-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', left: 200, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
          >
            {!isExpanded ? (
              <DetailCard key="collapsed" onExpand={() => setIsExpanded(true)} />
            ) : (
              <ExpandedDetailCard key="expanded" onCollapse={() => setIsExpanded(false)} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="footer-bar">
        {/* <ProfileButton /> */}
        {/* <SearchBarButton /> */}
      </div>
    </>
  )
}

export default Home
