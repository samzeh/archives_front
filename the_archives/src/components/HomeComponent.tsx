import React from 'react'
import '../styles/login.css'
import LoginComponent from './LoginComponent.tsx'
import SignupComponent from './SignupComponent.tsx'
import DefaultHomeComponents from './DefaultHomeComponents.tsx'
import ForgotPassword from './ForgotPassword.tsx'
import { useState } from 'react'

export default function HomeComponent() {
  const [selectedOption, setSelectedOption] = useState<"login" | "signup" | "guest" | null>(null)

  const handleWelcomeText = () => {
    setSelectedOption(null)
  }

  return (
    <div className = "home-box">
      <h1 className="welcome-text" onClick={handleWelcomeText}>the archives</h1>

      {selectedOption === null && <DefaultHomeComponents setSelectedOption={setSelectedOption} />}
      {selectedOption === "login" && <LoginComponent setSelectedOption={setSelectedOption} />}
      {selectedOption === "signup" && <SignupComponent />}
      {selectedOption === "forgot_password" && <ForgotPassword setSelectedOption={setSelectedOption} />}
    </div>
  )
}
