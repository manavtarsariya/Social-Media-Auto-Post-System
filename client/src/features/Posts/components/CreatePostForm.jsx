import React, { useEffect, useState } from 'react'

const CreatePostForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        hashtags: '',
        scheduleTime: '',
        caption: ''

    });


    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const fileChangeHandler = (e) => {
        setFormData({
            ...formData,
            image: e.target?.files?.[0]
        });
    }


    // useEffect(() => {
    //     console.log(formData);
    // }, [formData]);

    const submitHandler = (e) => {
        e.preventDefault(); 

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('hashtags', formData.hashtags);
        data.append('scheduleTime', formData.scheduleTime);
        data.append('caption', formData.caption);

        if(formData.image) {
            data.append('image', formData.image);
        }

        
        console.log("form submitted")
    }

  return (
    <div className='mt-20 border-1 height-96 w-2/4 mx-auto rounded-lg shadow-lg p-4'>

        <form action="" onSubmit={submitHandler} className='mt-4'>
            
            <h1 className='text-black font-bold text-3xl'>Create Post </h1>

            <div className='mt-4 flex justify-center items-center'>
                <label htmlFor="title" className='block text-lg font-medium text-gray-700 w-1/4'>Title</label>
                <input 
                type="text" 
                id='title' 
                name='title' 
                value={formData.title}  
                onChange={changeHandler}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
            </div>

            <div className='mt-4 flex '>
                <label htmlFor="content" className='block text-lg font-medium text-gray-700 w-1/4'>Content</label>
                <textarea 
                id='content'
                rows="4" 
                name='content'
                value={formData.content}
                onChange={changeHandler}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'></textarea>
            </div>

            <div className='mt-4 flex justify-center items-center'>
                <label htmlFor="image" className='block text-lg font-medium text-gray-700 w-1/4'>Image</label>
                <input 
                type='file' 
                accept='image/*'  
                id='image'
                name='image' 
                onChange={fileChangeHandler}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'/>
            </div>

            <div className='mt-4 flex justify-center items-center'>
                <label htmlFor="hashtages" className='block text-lg font-medium text-gray-700 w-1/4'>Hashtags</label>
                <input 
                id='hashtages' 
                name='hashtags'
                value={formData.hashtags}
                onChange={changeHandler}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'/>
            </div>

            <div className='mt-4 flex'>
                <label htmlFor="schedule" className='block text-lg font-medium text-gray-700 w-1/4'>Schedule Time</label>
                <input 
                type="datetime-local" 
                id='schedule' 
                name='scheduleTime'
                value={formData.scheduleTime}
                onChange={changeHandler}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
            </div>

            <div className='mt-4 flex justify-center items-center'>
                <label htmlFor="caption" className='block text-lg font-medium text-gray-700 w-1/4'>caption</label>
                <input 
                id='caption' 
                name='caption'
                value={formData.caption}
                onChange={changeHandler}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
            </div>
            <div>
                <button type='submit' className='mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default CreatePostForm