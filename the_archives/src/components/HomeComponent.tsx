import React from 'react'
import '../styles/login.css'
import LoginComponent from './LoginComponent.tsx'
import SignupComponent from './SignupComponent.tsx'
import DefaultHomeComponents from './DefaultHomeComponents.tsx'

export default function HomeComponent() {
  return (
    <div className = "home-box">
      <h1 className="welcome-text"> the archives</h1>
      {/* <LoginComponent /> */}
      <DefaultHomeComponents />
      {/* <SignupComponent /> */}
    </div>
  )
}
