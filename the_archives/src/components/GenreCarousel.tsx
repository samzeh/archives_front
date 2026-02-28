import React from 'react'

export default function GenreCarousel(props: {genres: string[]}) {
  return (
    <div className="genre-container">
      {props.genres.map((genre, index) => (
        <div className="genre-pill" key={index}>{genre}</div>
      ))}
    </div>
  )
}

