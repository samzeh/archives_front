import React from 'react'
import '../styles/profile.css'

type Book = { id: number, cover: string }

export default function BookCarousel(props: { books: Book[], onBookClick?: (book: Book) => void }) {
  return (
    <div className="book-carousel">
      {props.books.map(book => (
        <img
          key={book.id}
          src={book.cover}
          alt={`Book ${book.id}`}
          className="book-cover"
          onClick={() => props.onBookClick?.(book)}
        />
      ))}
    </div>
  )
}
