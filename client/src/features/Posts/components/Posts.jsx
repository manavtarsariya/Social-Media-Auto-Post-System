import Postcard from './Postcard';

const Posts = ({ filterPosts }) => {
  return (
    <div className='text-3xl font-bold text-center w-full p-10'>
      All Posts
      <hr className="border-t border-gray-400 my-4" />

      <div className='mt-5 p-4 mx-auto rounded-lg shadow-xl grid grid-cols-3 gap-4'>
        {filterPosts.length > 0 ? (
          filterPosts.map((post) => (
            <div key={post._id} className='p-4'>
              <Postcard post={post} />
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
