import React, { useState, useRef, useEffect } from 'react'
import '../styles/buttons.css'
import { BsSearch } from "react-icons/bs";
import { motion, AnimatePresence } from "motion/react"

export default function SearchBarButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsLocked(false)
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseLeave = () => {
    if (!isLocked && !inputValue) {
      setIsOpen(false)
    }
  }

  return (
    <div style={{ flex: 1 }}>
      <motion.div
        className="search-button"
        animate={{
          width: isOpen || inputValue ? '100%' : 100,
          borderRadius: isOpen || inputValue? 100 : 50,
          justifyContent: isOpen || inputValue? 'flex-start' : 'center',
          paddingLeft: isOpen || inputValue ? 25 : 0,
          paddingRight: isOpen|| inputValue? 25 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30, bounce: 0.6 }}
        style={{ cursor: isOpen ? 'default' : 'pointer' }}
        ref={containerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsLocked(true)}
      >
        <BsSearch style={{ height: '1.5em', width: '1.5em' }}/>
        <AnimatePresence>
          {(isOpen || inputValue) && (
            <motion.input
              key="search-input"
              className="search-expand-input"
              autoFocus
              placeholder="Search the archives..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}