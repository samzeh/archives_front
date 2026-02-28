import React from 'react'
import '../styles/detailpage.css'
import StarRatings from './StarRatings'

export default function DetailCard() {
  return (
    <>
    <div className="detail-card-container">
      <div className="detail-card">
        <div className="detail-card-right">
          <h1 className="book-title">Perks of Being a Wallflower</h1>
          <StarRatings rating={4} />
        </div>
        <img className="detail-card-left" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1341952742i/15745753.jpg" />
        <p className="bottom-text">click to see more</p>
      </div>
    </div>
    
    </>
  )
}

