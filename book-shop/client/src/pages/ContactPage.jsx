import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ContactPage = () => {
  return (
    <>
     <Navbar/>
     <div className="max-w-screen-2xl min-h-screen container mx-auto md:px-20 px-4 pt-28 items-center justify-center text-center">
        contact us
     </div>
     <Footer/>
    </>
  )
}

export default ContactPage