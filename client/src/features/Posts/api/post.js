import axios from "axios";

const API = axios.create({ 
    baseURL: 'http://localhost:8000/api/posts',
    withCredentials: true
});

  
export const createPost = (postData) => API.post('/createpost', postData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});



export const getAllPosts = () => API.get('/getallposts');


export const deletePost = (postId) => API.delete(`/deletepost/${postId}`);

export const generateCaption = (data) => API.post(`/generate-caption`,data,{
    
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export const generateHashtags = (data) => API.post(`/generate-hashtags`,data,{
    
    headers: {
        'Content-Type': 'application/json',
    }
});

export const analyzeSentiment = (data) => API.post(`/analyze-sentiment`,data,{
    
    headers: {
        'Content-Type': 'application/json',
    },
});
