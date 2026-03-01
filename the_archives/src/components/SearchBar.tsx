import React from 'react'
import '../styles/footer.css'
import { BsSearch } from "react-icons/bs";


export default function SearchBar() {
  return (
    <div className="search-bar">
      <BsSearch style={{ color: '#847058', flexShrink: 0 }} />
      <input className="search-input" placeholder="Search for book title..." />
    </div>
  )
}

