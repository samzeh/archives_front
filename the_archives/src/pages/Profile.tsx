import React from 'react'
import { GoHomeFill } from "react-icons/go"
import BookCarousel from '../components/BookCarousel'
import '../styles/profile.css'



export default function Profile() {
  return (
    <>
      <div className="header">
        <h1>Sam's Library</h1>
        <div className="header-icons">
          <img src='../assets/mock_pfp.png' alt="Profile" className="profile-button" />
          <GoHomeFill />
        </div>
      </div>

      <div className="section-box">
        <h1 className="section-title">Read:</h1>
        <BookCarousel />
      </div>

      <div className="section-box">
        <h1 className="section-title">To Be Read:</h1>
        <BookCarousel />
      </div>
      
    </>
  )
}

