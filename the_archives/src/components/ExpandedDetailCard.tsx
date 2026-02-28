import React from 'react'
import '../styles/expandeddetailpage.css'
import StarRatings from './StarRatings'
import ActionButton from './ActionButton'



export default function ExpandedDetailCard() {
  return (
    <>
      <div className="expanded-detail-card">
        <div className="info-section">
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
      </div>
    </>
  )
}

