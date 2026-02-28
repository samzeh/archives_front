import React from 'react'
import '../styles/expandeddetailpage.css'
import StarRatings from './StarRatings'
import ActionButton from './ActionButton'
import { motion } from 'motion/react'

export default function ExpandedDetailCard(props: { onCollapse: () => void }) {
  return (
    <motion.div className="expanded-detail-card" layoutId="book-card" onClick={props.onCollapse} transition={{ type: 'spring', stiffness: 180, damping: 26 }}>
      <motion.div
        className="info-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1341952742i/15745753.jpg" />
        <div className="info-text">
          <h1>Perks of Being a Wallflower</h1>
          <p>Stephen Chbosky</p>
          <StarRatings rating={4} />
          <div className="button-container">
            <ActionButton title="to read" bgColor='#7AC970' textColor='#ffffff'/>
            <ActionButton title="finished" bgColor='#D9D9D9' textColor='#000000' />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
