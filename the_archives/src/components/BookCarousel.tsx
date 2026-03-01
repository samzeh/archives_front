import React from 'react'
import '../styles/profile.css'

export default function BookCarousel(props: {books: {id: number, cover: string}[]}) {
  return (
    <div className="book-carousel">
      {props.books.map(book => (
        <img key={book.id} src={book.cover} alt={`Book ${book.id}`} className="book-cover" />
      ))}
    </div>
  )
}
