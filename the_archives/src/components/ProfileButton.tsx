import React from 'react'
import '../styles/buttons.css'
import { BsFillPersonFill } from "react-icons/bs";

export default function ProfileButton() {
  return (
    <>
    <div className="profile-button">
      <BsFillPersonFill style={{ height: '2em', width: '2em' }} />    
    </div>
    </>
  )
}

