import React from 'react'
import '../styles/footer.css'
import mockPfp from '../assets/mock_pfp.png'

export default function ProfileButton() {
  return (
    <img src={mockPfp} alt="Profile" className="profile-button" />
  )
}

