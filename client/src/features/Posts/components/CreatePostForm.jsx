import React, { useState } from 'react'
import { analyzeSentiment, createPost, generateCaption, generateHashtags, } from '../api/post';
import { toast } from 'react-toastify';
import { Loader2, MessageSquareQuote, SpaceIcon, Sparkle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

const CreatePostForm = () => {

    const navigate = useNavigate()


    const [temp, setTemp] = useState(false)
    const [temp1, setTemp1] = useState(false)
    const [temp2, setTemp2] = useState(false)

    const [isLoading, setIsLoading] = useState({
        sentiment: false, 
    });

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        file: null,
        hashtags: '',
        scheduleTime: '',
        platforms: [],
        aiCaption: ''

    });

    const [sentimentResult, setSentimentResult] = useState(null);


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

    const analyzeToneHandler = async () => {

        const textToAnalyze = formData.aiCaption || formData.content;

        if (!textToAnalyze) {
            toast.error("Please provide content or caption to analyze.");
            return;
        }

        setIsLoading(prev => ({ ...prev, sentiment: true }));
        setSentimentResult(null);
        try {

            const res = await analyzeSentiment({ textToAnalyze });
            setSentimentResult(res.data);

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to analyze tone.");
        } finally {
            setIsLoading(prev => ({ ...prev, sentiment: false }));
        }
    };

    const sentimentStyles = {
        Positive: 'bg-green-500/20 text-green-400 border-green-500/30',
        Negative: 'bg-red-500/20 text-red-400 border-red-500/30',
        Neutral: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        Mixed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };

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

    }

    return (
        <div className=' border-1 border-blue-500 height-96 w-2/4 mx-auto rounded-2xl shadow-blue-400 p-7 
        bg-gradient-to-bl from-pink-500/55 to-orange-400/70 shadow-lg '>

            <form action="" onSubmit={submitHandler} className='mt-4'>

                <h1 className='font-bold text-5xl text-center p-2 mb-5 text-transparent bg-clip-text bg-gradient-to-bl from-yellow-200 to-red-500'>Create Post </h1>
                <hr className='mb-14' />

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

                    <div className={`ml-4 ${temp1 && "pointer-events-none"} ${temp1 && "opacity-40"}`}
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

                    <div className={`ml-4 ${temp2 && "pointer-events-none"} ${temp2 && "opacity-40"}`}
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

                <div className="flex flex-col gap-3 pt-3">
                    {/* Label */}

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={analyzeToneHandler}
                        disabled={isLoading.sentiment || temp || temp1 || temp2}
                        className="flex mt-2 items-center gap-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/70 hover:cursor-pointer text-blue-400 hover:from-blue-500/20 hover:to-cyan-500/20 hover:text-blue-300 transition-all rounded-lg shadow-sm"
                    >
                        {isLoading.sentiment ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <MessageSquareQuote className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                            {isLoading.sentiment ? "Analyzing..." : "Analyze Tone"}
                        </span>
                    </Button>

                    {/* Tone Result + Button */}
                    <div className="flex items-start justify-between gap-4">
                        {/* Tone Result */}
                        {sentimentResult && !isLoading.sentiment ? (
                            <div className="flex justify-center items-center flex-col  gap-2 flex-1 p-3 rounded-lg border border-slate-700 bg-slate-800/40 shadow-sm">
                                <span
                                    className={`inline-block text-sm font-semibold capitalize px-3 py-1 rounded-full border shadow-sm ${sentimentStyles[sentimentResult?.result?.sentiment]}`}
                                >
                                    {sentimentResult?.result?.sentiment} Tone
                                </span>
                                <p className="text-sm text-gray-200 italic leading-relaxed">
                                    {sentimentResult?.result?.explanation}
                                </p>
                            </div>
                        ) : (
                            <div className="flex-1 text-xs text-gray-300 italic border border-dashed border-slate-200 rounded-lg p-3 text-center">
                                No analysis yet.
                            </div>
                        )}

                        {/* Analyze Button */}

                    </div>
                </div>




                <div>
                    <button
                        type="submit"
                        className={`mt-6 w-full flex justify-center items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 
    ${(temp1 || temp2 || isLoading.sentiment)
                                ? "opacity-50 cursor-not-allowed bg-slate-700 text-slate-400"
                                : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"} 
  `}
                        disabled={temp1 || temp2 || isLoading.sentiment}
                    >
                        {temp ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="ml-2">Please Wait...</span>
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default CreatePostForm