import './home.scss'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbars/Navbar'
import Footer from './components/Footers/Footer'
import Carousel from './components/Carousels/Carousel'
import ProductList from '@pages/products/ProductList'
export default function Home() {
  return (
    <div className='home_page'>
      <div className='home_page_content'>
        <Navbar/>
        <Carousel/>
        <div className='content_body'>
          <Outlet/>
          <ProductList/>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
