import './home.scss'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbars/Navbar'
import Footer from './components/Footers/Footer'
import Carousel from './components/Carousels/Carousel'
export default function Home() {
  return (
    <div className='home_page'>
      <div className='home_page_content'>
        <Navbar/>
        <Carousel/>
        <div className='content_body'>
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
