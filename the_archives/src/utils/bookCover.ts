import defaultCover from '../assets/defaut_cover.png'

const coverCache = new Map<string, string>()
const FALLBACK_URL = defaultCover

export function getBookURL(title: string, author: string): string {
  if (!title || !author) return FALLBACK_URL

  const cacheKey = `${title}-${author}`

  if (coverCache.has(cacheKey)) return coverCache.get(cacheKey)!

  coverCache.set(cacheKey, FALLBACK_URL)
  
  fetchBookCover(title, author, cacheKey)

  return FALLBACK_URL
}

async function fetchBookCover(title: string, author: string, cacheKey: string) {
  try {
    const baseUrl = 'https://bookcover.longitood.com/bookcover'
    const cleanTitle = title.trim()
    const cleanAuthor = author.trim()
    
    const encodedTitle = encodeURIComponent(cleanTitle).replace(/%20/g, '+')
    const encodedAuthor = encodeURIComponent(cleanAuthor).replace(/%20/g, '+')
    const fullUrl = `${baseUrl}?book_title=${encodedTitle}&author_name=${encodedAuthor}`
        
    const response = await fetch(fullUrl)
    const data = await response.json()

    const finalUrl = data?.url ?? FALLBACK_URL

    coverCache.set(cacheKey, finalUrl)

    const images = document.querySelectorAll(`img[data-book-key="${cacheKey}"]`)
    images.forEach(img => {
      if (img instanceof HTMLImageElement) img.src = finalUrl
    })

  } catch {
    coverCache.set(cacheKey, FALLBACK_URL)
  }
}


export function parseInfo(value: unknown): string[] {
    if (Array.isArray(value)) {
      return value.map(item => String(item))
    }

    if (typeof value !== 'string') { return [] }

    try {
      const parsed = JSON.parse(value.replace(/'/g, '"'))

      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item))
      } else {
        return []
      }
    } catch {
      return value
      .replace(/^\[+|\]+$/g, '') //remove surrounding brackets
      .split(',') //split by comma into an array
      .map((item) => item.trim() // trim white space
      .replace(/^['"]|['"]$/g, '')) // remove extra quotes
      .filter(Boolean) // remove empty values
    }
  }