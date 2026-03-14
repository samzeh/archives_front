import { useState, useEffect } from 'react'
import Force3DGraph from '../components/Force3DGraph.tsx'
import HomeComponent from '../components/HomeComponent.tsx'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn } from '../firebase/firestoreFunctions.ts'
import '../styles/login.css'

const Home = () => {
  const navigate = useNavigate()
  const [graphLoaded, setGraphLoaded] = useState(false)
  const [ checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    isLoggedIn()
      .then((loggedIn) => {
        if (loggedIn) {
          navigate('/recommendation-graph')
        } else {
          setCheckingAuth(false)
        }
      })
  }, [navigate])

  if (checkingAuth) return <p>Loading...</p>
  
  return (
    <div>
      <Force3DGraph
        cardVisible={false}
        onNodeClick={() => {}}
        onDismiss={() => {}}
        liked_book_id={1}
        onGraphDataReady={() => {}}
        onLoaded={() => setGraphLoaded(true)}
      />
      {graphLoaded && 
        <HomeComponent />
      }
      
    </div>
  )
}

export default Home
