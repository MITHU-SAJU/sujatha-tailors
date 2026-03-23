import { useState, useEffect } from 'react'

// Components
import Loader from './components/Loader/Loader'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import WhyUs from './components/WhyUs/WhyUs'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import FloatingButtons from './components/FloatingButtons/FloatingButtons'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <WhyUs />

            <Contact />
          </main>
          <Footer />
          <FloatingButtons />
        </>
      )}
    </>
  )
}

export default App
