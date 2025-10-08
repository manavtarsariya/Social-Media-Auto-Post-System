import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import UpdatePostForm from '@/features/Posts/components/UpdatePostForm'
import React from 'react'

const UpdatePost = () => {
  return (
      <div className='bg-gray-900 '>
        <Navbar />

      <div className='text-white p-20 mt-10'>
        {/* <CreatePostForm /> */}
        <UpdatePostForm/>
      </div>
      
      <Footer />
    </div>
  )
}

export default UpdatePost