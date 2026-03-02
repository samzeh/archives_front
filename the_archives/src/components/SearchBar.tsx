import React from 'react'
import '../styles/footer.css'
import { BsSearch } from "react-icons/bs";
import { useState} from 'react';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';

const searchBooks = async(search_query: string) => {
  const response = await fetch(`/api/books/search?q=${encodeURIComponent(search_query)}`)
  return response.json()
}

export default function SearchBar() {
  const [query, setQuery] = useState('')

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search_results", query],
    queryFn: () => searchBooks(query),
    enabled: query.length > 0,
    refetchOnWindowFocus: false,
  })
  

  return (
    <div className="search-bar-wrapper">
      {query && searchResults?.books && (
        <SearchResults results={searchResults.books} />
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

