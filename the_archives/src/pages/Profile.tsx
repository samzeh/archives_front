import React, { useState } from 'react'
import { GoHomeFill } from "react-icons/go"
import BookCarousel from '../components/BookCarousel'
import SideModal from '../components/SideModal'
import '../styles/profile.css'
import mockPfp from '../assets/mock_pfp.png'

const mockData = [
  {
    "id": 1, 
    "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg"
  },
  {
    "id": 2, 
    "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg"
  },
]

type Book = { id: number, cover: string }

export default function Profile() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  
  return (
    <>
      <div className="header">
        <h1>Sam's Library</h1>
        <div className="header-icons">
          <GoHomeFill style={{height: '65px', width: '65px'}} />
          <img src={mockPfp} alt="Profile" className="profile-image" />
        </div>
      </div>

      <div className="section-box">
        <h1 className="section-title">Read:</h1>
        <BookCarousel books={mockData} onBookClick={setSelectedBook} />
      </div>

      <div className="section-box">
        <h1 className="section-title">To Be Read:</h1>
        <BookCarousel books={mockData} onBookClick={setSelectedBook} />
      </div>

      <SideModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </>
  )
}

