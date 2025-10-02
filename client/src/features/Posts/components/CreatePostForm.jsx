import React, { useState } from 'react'
import { createPost } from '../api/post';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const CreatePostForm = () => {


    const [temp, setTemp] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        file: null,
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
            file: e.target?.files?.[0]
        });
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('hashtags', formData.hashtags);
        data.append('scheduleTime', formData.scheduleTime);
        data.append('caption', formData.caption);

        if (formData.file) {
            data.append('file', formData.file);
        }

        try {

            setTemp(true);
            const res = await createPost(data);
            console.log(res.data);


            if (res.data.success) {

                toast.success(res.data.message);
            }



        } catch (error) {
            console.log(error);

        } finally {
            setTemp(false);
        }


        // console.log("form submitted")
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
                        required
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
                    <label className='block text-lg font-medium text-gray-700 w-1/4'>Image</label>
                    <input
                        type='file'
                        accept='image/*'
                        // id='image'
                        name='file'
                        onChange={fileChangeHandler}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
                </div>

                <div className='mt-4 flex justify-center items-center'>
                    <label htmlFor="hashtages" className='block text-lg font-medium text-gray-700 w-1/4'>Hashtags</label>
                    <input
                        id='hashtages'
                        name='hashtags'
                        value={formData.hashtags}
                        onChange={changeHandler}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
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
                    <button type='submit' className='mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full flex justify-center items-center' disabled={temp}>
                        {
                            temp ?
                                <>
                                    <Loader2 className='animate-spin' /><span className='ml-3'>Please Wait</span>
                                </> : `Submit`

                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePostForm