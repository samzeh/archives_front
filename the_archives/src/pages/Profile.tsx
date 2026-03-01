import React from 'react'
import { GoHomeFill } from "react-icons/go"
import BookCarousel from '../components/BookCarousel'
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


export default function Profile() {
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
        <BookCarousel books={mockData} />
      </div>

      <div className="section-box">
        <h1 className="section-title">To Be Read:</h1>
        <BookCarousel books={mockData}/>
      </div>
      
    </>
  )
}

