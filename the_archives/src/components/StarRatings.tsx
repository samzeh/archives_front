import React from 'react'
import StarIcon from '../assets/star.svg?react';
import '../styles/ratings.css'


export default function StarRatings(props: { rating: number }) {

  const stars = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="star-rating-box">
      {stars.map((star) => {
        if (star < props.rating) {
          return <StarIcon className="star" key={star} style={{ color: '#FFD900' }} />
        } else {
          return <StarIcon className="star" key={star} style={{ color: '#959595' }} />
        }
      })}
    </div>
  )
}

