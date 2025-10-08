import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { findpost } from '@/features/Posts/api/post'
import UpdatePostForm from '@/features/Posts/components/UpdatePostForm'
import { setEditpost } from '@/redux/postSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'

const UpdatePost = () => {

    const {id} = useParams()

    // const [post, setpost] = useState(null)
    const dispatch = useDispatch()


    useEffect(() => {
        async function getpostdetail(){
            try {

                const res = await findpost(id);
                // console.log(res.data.postdetails)

                dispatch(setEditpost(res.data.postdetails))
                
            } catch (error) {
                toast.error(error.response.data.message)
                return;
            }
        }
        getpostdetail()

    }, [dispatch, id])


    return (
        <div className='bg-gray-900 '>
            <Navbar />

            <div className='text-white p-20 mt-10'>
                {/* <CreatePostForm /> */}
                <UpdatePostForm />
            </div>

            <Footer />
        </div>
    )
}

export default UpdatePost