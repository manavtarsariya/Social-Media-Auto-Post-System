import Navbar from '@/components/layout/Navbar'
import { getAllPosts } from '@/features/Posts/api/post'
import FilterCard from '@/features/Posts/components/FilterCard'
import Posts from '@/features/Posts/components/Posts'
import React, { useEffect, useState } from 'react'

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]); 
  const [filterPosts, setFilterPosts] = useState([]); 

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getAllPosts();
        const posts = response.data.posts || [];
        setAllPosts(posts);
        setFilterPosts(posts); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const handleFilter = (value) => {
    if (value === "all") {
      setFilterPosts(allPosts);
    } else {
      setFilterPosts(
        allPosts.filter(
          (post) => post.status.toLowerCase() === value.toLowerCase()
        )
      );
    }
  };


  return (
    <div>
      <Navbar />
      <FilterCard onFilter={handleFilter} />
      <Posts filterPosts={filterPosts} setFilterPosts={setFilterPosts} />
    </div>
  )
}

export default AllPosts
