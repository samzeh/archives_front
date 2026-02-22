import { useState } from 'react'
import SearchBar from './components/SearchBar'
import './App.css'
import SearchBarButton from './components/SearchBarButton'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to The Archives</h1>
      <SearchBar />
      <SearchBarButton />
    </>
  )
}

export default App
