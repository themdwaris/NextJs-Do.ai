
import AITools from '@/components/AITools'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import PricePlan from '@/components/PricePlan'
import Testimonial from '@/components/Testimonial'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  return (
    <div className='h-screen'>
      <Toaster/>
      <Navbar/>
      <Hero/>
      <AITools/>
      <Testimonial/>
      <PricePlan/>
      <Footer/>
    </div>
  )
}

export default Home