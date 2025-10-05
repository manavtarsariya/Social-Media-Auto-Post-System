// import { Delete } from 'lucide-react';
// import { toast } from 'sonner';
import Postcard from './Postcard';
import { deletePost } from '../api/post';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Posts = ({ filterPosts, setFilterPosts }) => {


  const DeleteHandler = async (id) => {
    console.log("Delete post with ID:", id);

    setFilterPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

    try {

      const response = await deletePost(id);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }

    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error?.response?.data?.message);

    }

  }



  return (
    <div className='text-3xl font-bold text-center w-full p-10 text-white '>
      All Posts
      <hr className="border-t border-gray-400 my-4" />

      <div className='mt-10 p-4 mx-auto rounded-lg shadow-xl grid grid-cols-3 gap-4 bg-gray-800 '>
        {filterPosts.length > 0 ? (
          filterPosts.map((post) => (
            <div key={post._id} className='p-4'>
              <Postcard post={post} DeleteHandler={DeleteHandler} />
            </div>
          ))
        ) : (
          <p className="col-span-3 text-gray-500">No posts found</p>
        )}
      </div>
    </div>
  )
}

export default Posts
