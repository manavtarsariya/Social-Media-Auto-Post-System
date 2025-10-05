import CreatePostForm from '@/features/Posts/components/CreatePostForm'
import Navbar from '../components/layout/Navbar'
import React from 'react'
import Footer from '../components/layout/Footer'

const Createpostpage = () => {
  return (
    <div className='bg-gray-900 '>
      <Navbar />

      <div className='text-white p-20 mt-10'>
        <CreatePostForm />
      </div>
      
      <Footer />
    </div>
  )
}

export default Createpostpage