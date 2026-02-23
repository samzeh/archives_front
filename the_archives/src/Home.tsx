
import './Home.css'
import SearchBarButton from './components/SearchBarButton'
import ProfileButton from './components/ProfileButton'
import Force3DGraph from './components/Force3DGraph'



function Home() {


  return (
    <>
      <h1>Welcome to The Archives</h1>
      <Force3DGraph />

      <div className = "footer-bar">
        <ProfileButton />
        <SearchBarButton />
      </div>

    </>
  )
}

export default Home
