import React, { useState } from 'react'
import '../styles/login.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function SignupComponent() {
  const [ showPassword, setShowPassword] = useState(false)
  return (
    <div className="login-box">
      <input type="text" placeholder="Email" className="login-input" />
      <input type="text" placeholder="Username" className="login-input" />
      <div className="password-wrapper">
        <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="login-input" />
        <button className="password-toggle">
          {showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(false)} /> : <AiOutlineEye onClick={() => setShowPassword(true)} />}
        </button>
      </div>
      <button className="login-button">Signup</button>
    </div>
  )
}

