import React from 'react'
import '../styles/expandeddetailpage.css'
import StarRatings from './StarRatings'
import ActionButton from './ActionButton'
import { motion } from 'motion/react'
import GenreCarousel from './GenreCarousel'

export default function ExpandedDetailCard(props: { onCollapse: () => void }) {
  return (
    <motion.div className="expanded-detail-card" layoutId="book-card" onClick={props.onCollapse} transition={{ type: 'spring', stiffness: 180, damping: 26 }}>
      <div
        className="info-section"
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
      </div>
      <div><hr /></div>
      <GenreCarousel genres={['Fiction', 'Coming of Age', 'Contemporary', 'Fiction', 'Coming of Age', 'Contemporary']} />
      <div className="description">
        standing on the fringes of life offers a unique perspective. But there comes a time to see what it looks like from the dance floor. This haunting novel about the dilemma of passivity vs. passion marks the stunning debut of a provocative new voice in contemporary fiction: The Perks of Being A WALLFLOWER...         standing on the fringes of life offers a unique perspective. But there comes a time to see what it looks like from the dance floor. This haunting novel about the dilemma of passivity vs. passion marks the stunning debut of a provocative new voice in contemporary fiction: The Perks of Being A WALLFLOWER...
      </div>
    </motion.div>
  )
}
