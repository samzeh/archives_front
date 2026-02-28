
import './Home.css'
import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import DetailCard from './components/DetailCard'
import ExpandedDetailCard from './components/ExpandedDetailCard'

function Home() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <ExpandedDetailCard key="expanded" onCollapse={() => setIsExpanded(false)} />
        ) : (
          <DetailCard key="collapsed" onExpand={() => setIsExpanded(true)} />
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
