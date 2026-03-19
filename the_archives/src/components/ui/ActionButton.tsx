import React from 'react'
import '../../styles/buttons.css'

export default function ActionButton(props: { title: string, bgColor?: string, textColor?: string, onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <button
      className="action-button"
      style={{ backgroundColor: props.bgColor, color: props.textColor, border: 'none', cursor: 'pointer' }}
      onClick={props.onClick}
      type="button"
    >
      {props.title}
    </button>
  )
}

