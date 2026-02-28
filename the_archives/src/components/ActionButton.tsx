import React from 'react'
import '../styles/buttons.css'

export default function ActionButton(props: { title: string, bgColor?: string, textColor?: string }) {
  return (
    <div className="action-button" style={{ backgroundColor: props.bgColor, color: props.textColor }}>
      {props.title}
    </div>
  )
}

