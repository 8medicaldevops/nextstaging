import ReactGA from "react-ga4"
import NavBar from '../components/NavBar'
import '../App.css'
import Hero from '@/components/Hero'
import { useEffect } from "react"

export default function HomePage() {

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/",
      title: "Home",
    })
  }, [])

  return (
    <div>
      <NavBar />
      <Hero />
    </div>
  )
}
