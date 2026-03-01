import React from 'react'

const mockResults = [
  {
    "title": "Percy Jackson",
    "author": "Rick Riordan",
    "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1341952742i/15745753.jpg"
  },
  {
    "title": "Peter Pan",
    "author": "J.M. Barrie",
    "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1341952742i/15745753.jpg"
  },
  {
    "title": "Perks of Being a Wallflower",
    "author": "Stephen Chbosky",
    "cover": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1341952742i/15745753.jpg"
  },

]
export default function SearchResults() {
  return (
    <div className="search-results-box">
      {mockResults.map((result, index)=>{
        return (
          <>
            <div key={index} className="search-result-card">
              <img src={result.cover} alt={`${result.title} cover`} className="search-result-cover" />
              <div className="search-result-info">
                <h1>{result.title}</h1>
                <p>{result.author}</p>
              </div>
            </div>

            {index!==mockResults.length-1 && (
              <hr className="search-result-divider" />
            )}
          </>
        )
      })}
      
    </div>
  )
}