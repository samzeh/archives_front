
import './Home.css'
import SearchBarButton from './components/SearchBarButton'
import ProfileButton from './components/ProfileButton'
import Force3DGraph from './components/Force3DGraph'
import DetailCard from './components/DetailCard'
import ExpandedDetailCard from './components/ExpandedDetailCard'



function Home() {


  return (
    <>
      {/* <Force3DGraph /> */}
      <DetailCard />
      <ExpandedDetailCard />

      <div className = "footer-bar">
        {/* <ProfileButton /> */}
        {/* <SearchBarButton /> */}
      </div>

    </>
  )
}

export default Home
