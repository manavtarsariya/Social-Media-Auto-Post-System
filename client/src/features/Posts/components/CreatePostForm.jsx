import React, { useState } from 'react'
import { createPost, generateCaption, generateHashtags, } from '../api/post';
import { toast } from 'react-toastify';
import { Loader2, SpaceIcon, Sparkle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

const CreatePostForm = () => {

    const navigate = useNavigate()


    const [temp, setTemp] = useState(false)
    const [temp1, setTemp1] = useState(false)
    const [temp2, setTemp2] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        file: null,
        hashtags: '',
        scheduleTime: '',
        platforms: [],
        aiCaption: ''

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

    const captiongenerator = async () => {

        try {

            const data = {
                title: formData.title,
                content: formData.content
            }

            setTemp1(true);

            const res = await generateCaption(data)

            console.log(res.data.caption)
            setFormData({
                ...formData,
                aiCaption: res.data.caption
            })

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)

        } finally {
            setTemp1(false);
        }

    }

    const hashtagsgenerator = async () => {

        try {
            const data = {
                title: formData.title,
                content: formData.content
            }

            setTemp2(true);

            const res = await generateHashtags(data)

            console.log(res.data.caption)
            setFormData({
                ...formData,
                hashtags: res.data.hashtags
            })


        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message)

        } finally {
            setTemp2(false)
        }

    }

    const platformChangeHandler = (e) => {
        const { value, checked } = e.target;

        let updatedPlatforms = [...formData.platforms];

        if (checked) {
            updatedPlatforms.push(value);
        } else {
            updatedPlatforms = updatedPlatforms.filter((platform) => platform !== value);
        }
        setFormData({
            ...formData,
            platforms: updatedPlatforms
        });
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('hashtags', formData.hashtags);
        data.append('scheduleTime', formData.scheduleTime);
        data.append('platforms', JSON.stringify(formData.platforms));
        data.append('aiCaption', formData.aiCaption);

        if (formData.file) {
            data.append('file', formData.file);
        }

        try {

            setTemp(true);
            const res = await createPost(data);
            console.log(res.data);


            if (res.data.success) {

                toast.success(res?.data?.message);
                navigate('/posts');
            }



        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");

        } finally {
            setTemp(false);
        }


        // console.log("form submitted")
    }

    return (
        <div className=' border-0 height-96 w-2/4 mx-auto rounded-2xl shadow-blue-400 p-7 
        bg-gradient-to-bl from-pink-500/60 to-orange-400/90 shadow-2xl '>

            <form action="" onSubmit={submitHandler} className='mt-4'>

                <h1 className='font-bold text-5xl text-center p-2 mb-10 text-transparent bg-clip-text bg-gradient-to-bl from-yellow-200 to-red-500'>Create Post </h1>

                <div className='mt-4 flex justify-center items-center'>
                    <label htmlFor="title" className='block text-lg font-medium text-white w-1/4'>Title</label>
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
                    <label htmlFor="content" className='block text-lg font-medium text-white w-1/4'>Content</label>
                    <textarea
                        id='content'
                        rows="4"
                        name='content'
                        value={formData.content}
                        onChange={changeHandler}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'></textarea>
                </div>

                <div className='mt-4 flex justify-center items-center'>
                    <label className='block text-lg font-medium text-white w-1/4'>Image</label>
                    <input
                        type='file'
                        accept='image/*'
                        // id='image'
                        name='file'
                        onChange={fileChangeHandler}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
                </div>

                <div className='mt-4 flex justify-center items-center'>
                    <label htmlFor="hashtages" className='block text-lg font-medium text-white w-1/4 '>Hashtags</label>
                    <input
                        id='hashtages'
                        name='hashtags'
                        value={formData.hashtags}
                        onChange={changeHandler}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ml-4' />

                     <div className={`ml-4 ${temp1 && "pointer-events-none" } ${temp1 && "opacity-40" }`}
                        onClick={hashtagsgenerator} 
                        >

                        {
                            temp2 ?
                                <div className='p-3'>
                                    <Loader2 className='animate-spin' />
                                </div> :
                                <div className='p-2 border-1 rounded-full hover:cursor-pointer hover:bg-blue-300' >
                                    <Sparkles color='' fill='blue'></Sparkles>
                                </div>

                        }
                    </div>
                </div>

                <div className='mt-4 flex justify-center items-center'>
                    <label htmlFor="schedule" className='block text-lg font-medium text-white w-1/4'>Schedule Time</label>
                    <input
                        type="datetime-local"
                        id='schedule'
                        name='scheduleTime'
                        value={formData.scheduleTime}
                        onChange={changeHandler}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
                </div>

                <div className='mt-4 flex items-center'>
                    <label htmlFor="platforms" className='block text-lg font-medium text-white w-1/4'>Platforms</label>
                    <div className='flex space-x-5'>
                        <div>
                            <input
                                type="checkbox"
                                id='twitter'
                                name='platforms'
                                value='twitter'
                                onChange={platformChangeHandler}
                                className='mr-2'
                            />
                            <label htmlFor="twitter" className='text-white'>Twitter</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id='linkedin'
                                name='platforms'
                                value='linkedin'
                                onChange={platformChangeHandler}
                                className='mr-2 leading-tight'
                            />
                            <label htmlFor="linkedin" className='text-white'>LinkedIn</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id='facebook'
                                name='platforms'
                                value='facebook'
                                onChange={platformChangeHandler}
                                className='mr-2 leading-tight'
                            />
                            <label htmlFor="facebook" className='text-white'>Facebook</label>
                        </div>
                    </div>


                </div>

                <div className='mt-4 flex justify-center items-center' >
                    <label htmlFor="aiCaption" className='block text-lg font-medium text-white w-1/4'>caption</label>
                    <textarea
                        id='aiCaption'
                        name='aiCaption'
                        value={formData.aiCaption}
                        onChange={changeHandler}
                        className='h-20 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ml-4' />

                    <div className={`ml-4 ${temp2 && "pointer-events-none" } ${temp2 && "opacity-40" }`}
                        onClick={captiongenerator}
                    >

                        {
                            temp1 ?
                                <div className='p-3'>
                                    <Loader2 className='animate-spin' />
                                </div> :
                                <div className='p-2 border-1 rounded-full hover:cursor-pointer hover:bg-blue-300'>
                                    <Sparkles color='' fill='blue'></Sparkles>
                                </div>
                        }
                    </div>
                </div>
                <div>
                    <button type='submit' className={`mt-6  ${(temp1 || temp2) ? "bg-blue-500" : "bg-blue-700" }  text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full flex justify-center items-center hover:cursor-pointer`} disabled={temp1 || temp2}>
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