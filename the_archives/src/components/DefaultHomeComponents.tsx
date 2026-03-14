import React from 'react'
import '../styles/login.css'
import { useState } from 'react'


interface DefaultHomeComponentsProps {
  setSelectedOption: React.Dispatch<React.SetStateAction<"login" | "signup" | "guest" | null>>
}
export default function DefaultHomeComponents({ setSelectedOption }: DefaultHomeComponentsProps)  {
  
  const handleLoginClick = () => {
    setSelectedOption("login")
  }

  const handleSignUpClick = () => {
    setSelectedOption("signup")
  }

  const handleGuestClick = () => {
    setSelectedOption("guest")
  }

  return (
    <div className="action-links">
      <p onClick={handleLoginClick}>login</p>
      <p onClick={handleSignUpClick}>sign up</p>
      <p onClick={handleGuestClick}>guest</p>
    </div>      
  )
}

