import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { getAllPosts } from '@/features/Posts/api/post'
import FilterCard from '@/features/Posts/components/FilterCard'
import PostAnalytics from '@/features/Posts/components/PostAnalytics'
import Posts from '@/features/Posts/components/Posts'
import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/getallposts',{withCredentials:true})
        // const response = await fetch('http://localhost:8000/api/posts/getallposts', {
        //   method: 'GET',
        //   // credentials: 'include', // same as withCredentials: true
        // });
        console.log(response.data)
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

  const { pendingPost, scheduledPost, postedPost, failedPost } = useMemo(() => {
    let scheduled = 0, posted = 0, failed = 0, pending = 0;

    filterPosts.forEach((item) => {
      switch (item.status.toLowerCase()) {
        case "scheduled":
          scheduled++;
          break;
        case "posted":
          posted++;
          break;
        case "failed":
          failed++;
          break;
        case "pending":
          pending++;
          break;
        default:
          break;
      }
    });

    return { scheduledPost: scheduled, postedPost: posted, failedPost: failed, pendingPost: pending };
  }, [filterPosts]);

  return (
    <div className='bg-gray-900'>
      <Navbar />
      <FilterCard onFilter={handleFilter} />
      <PostAnalytics count_posted_post={postedPost} count_failed_post={failedPost} count_scheduled_post={scheduledPost} count_pending_post={pendingPost} />
      <Posts filterPosts={filterPosts} setFilterPosts={setFilterPosts} />
      <Footer />
    </div>
  )
}

export default AllPosts
