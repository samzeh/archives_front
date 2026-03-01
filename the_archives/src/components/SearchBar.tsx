import React from 'react'
import '../styles/footer.css'
import { BsSearch } from "react-icons/bs";
import { useState} from 'react';
import SearchResults from './SearchResults';


export default function SearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="search-bar-wrapper">
      {query && (
        <SearchResults />
      )}
      <div className="search-bar">
        <BsSearch style={{ color: '#847058', flexShrink: 0 }} />
        <input 
          className="search-input" 
          placeholder="Search for book title..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  )
}

