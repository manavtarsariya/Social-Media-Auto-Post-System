import React, { useEffect, useState } from 'react'
import { analyzeSentiment, generateCaption, generateHashtags, updatepost, } from '../api/post';
import { toast } from 'react-toastify';
import { Loader2, MessageSquareQuote, MoveLeft, SpaceIcon, Sparkle, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const UpdatePostForm = () => {


    const navigate = useNavigate()
    const { editpost } = useSelector(store => store.post)
    const postId = editpost._id;


    const [temp, setTemp] = useState(false); // Main form submission loading
    const [temp1, setTemp1] = useState(false); // Caption generation loading
    const [temp2, setTemp2] = useState(false); // Hashtag generation loading
    const [sentimentResult, setSentimentResult] = useState(null);

    const [isLoading, setIsLoading] = useState({
        sentiment: false,
    });

    const [preview, setPreview] = useState("");

    useEffect(() => {
        setPreview(editpost.imageUrl); // ✅ Set existing Cloudinary image
    }, [editpost]);


    const {
        handleSubmit,
        formState: { errors },
        register,
        setValue,
        getValues,
        reset,
        watch,
    } = useForm({
        // Default values for the form fields
        defaultValues: {
            title: editpost.title,
            content: '',
            file: null,
            hashtags: '',
            scheduleTime: '',
            platforms: [],
            aiCaption: '',
        },
    });

    useEffect(() => {
        if (editpost) {
            const scheduleDate = editpost.scheduleTime
                ? new Date(editpost.scheduleTime)
                : null;

            // ✅ Convert UTC date to local time (IST)
            const localDateString = scheduleDate
                ? new Date(scheduleDate.getTime() - scheduleDate.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 16)
                : "";
            reset({
                title: editpost.title || "",
                content: editpost.content || "",
                hashtags: editpost.hashtags || "",
                scheduleTime: localDateString,
                platforms: editpost.platforms || [],
                aiCaption: editpost.aiCaption || "",
            });
        }
    }, [editpost, reset]);



    const captiongenerator = async () => {

        const { title, content } = getValues();

        const fileList = getValues('file');


        if ((!fileList || fileList.length === 0) && (!title.trim() && !content.trim()) && !editpost?.imageUrl) {
            toast.error("Please Provide the image file or title and content for caption generation.");
            return;
        }


        if (fileList && fileList.length !== 0 && fileList[0]) {

            const imageFile = fileList[0];
            const formData = new FormData();
            formData.append('file', imageFile);

            try {
                setTemp1(true);

                const res = await generateCaption(formData);
                // Update the form state using setValue
                setValue("aiCaption", res.data.caption, { shouldValidate: true });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to generate caption");
            } finally {
                setTemp1(false);
            }

        } else if (editpost.imageUrl) {
            try {

                setTemp1(true);

                const res = await fetch("http://localhost:8000/api/posts/existing-image-caption", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({

                        imageUrl: editpost.imageUrl,
                    }),
                });
                const responseData = await res.json();
                setValue("aiCaption", responseData.caption, { shouldValidate: true });

            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to generate caption");
            } finally {
                setTemp1(false);
            }

        } else {

            if (!title.trim() || !content.trim()) {
                toast.error("Please Provide the image file or title and content for caption generation.");
                return;
            }

            const formData = new FormData();
            formData.append('title', title); //
            formData.append('content', content); //


            try {
                setTemp1(true);

                const res = await generateCaption(formData);
                // Update the form state using setValue
                setValue("aiCaption", res.data.caption, { shouldValidate: true });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to generate caption");
            } finally {
                setTemp1(false);
            }

        }

    }

    const hashtagsgenerator = async () => {

        const { title, content } = getValues();

        const fileList = getValues('file');


        if ((!fileList || fileList.length === 0) && (!title.trim() && !content.trim()) && !editpost?.imageUrl) {
            toast.error("Please Provide the image file or title and content for hashtags generation.");
            return;
        }


        if (fileList && fileList.length !== 0 && fileList[0]) {

            const imageFile = fileList[0];
            const formData = new FormData();
            formData.append('file', imageFile);


            try {
                setTemp2(true);
                const res = await generateHashtags(formData);
                setValue("hashtags", res.data.hashtags, { shouldValidate: true });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to generate hashtags");
            } finally {
                setTemp2(false);
            }

        } else if (editpost.imageUrl) {
            try {

                setTemp2(true);
                //  setValue("aiCaption", "", { shouldValidate: true });

                const res = await fetch("http://localhost:8000/api/posts/existing-image-hashtags", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({

                        imageUrl: editpost.imageUrl,
                    }),
                });
                const responseData = await res.json();
                setValue("hashtags", responseData.hashtags, { shouldValidate: true });

            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to generate caption");
            } finally {
                setTemp2(false);
            }

        } else {

            if (!title.trim() || !content.trim()) {
                toast.error("Please Provide the image file or title and content for hashtags generation.");
                return;
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);

            try {
                setTemp2(true);
                const res = await generateHashtags(formData);
                setValue("hashtags", res.data.hashtags, { shouldValidate: true });
            } catch (err) {
                toast.error(err.response?.data?.message || "Failed to generate hashtags");
            } finally {
                setTemp2(false);
            }

        }


    }

    const analyzeToneHandler = async () => {

        const textToAnalyze = getValues("aiCaption") || getValues("content");
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

    const submitHandler = async (data) => {

        let platformsChanged;

        const now = new Date();
        const selected = new Date(data.scheduleTime);
        const preselected = new Date(editpost.scheduleTime);

        const existingPlatforms = editpost.platforms || [];

        const lengthChanged = existingPlatforms.length !== data.platforms.length;

        const existingPlatformsCopy = [...existingPlatforms];
        const contentChanged = existingPlatformsCopy.sort().join(',') !== data.platforms.sort().join(',');
        platformsChanged = lengthChanged || contentChanged;


        if ((selected.getTime() == preselected.getTime()) && platformsChanged && (selected.getTime() <= now.getTime())) {
            toast.error("You have changed the platforms. Please select a new schedule time.");
            return;
        }

        if ((selected.getTime() != preselected.getTime()) && (selected.getTime() <= now.getTime())) {
            toast.error("Schedule time must be at least +1 minute in the future.");
            return;
        }

        if (data.scheduleTime && !data.platforms.length) {
            toast.error("Please select atleast one platform for the scheduled Post.");
            return;
        }

        if (data.platforms.length >= 1 && !data.scheduleTime) {
            toast.error("Please select Scheduled Time for selected platforms.");
            return;
        }



        try {
            const formPayload = new FormData();
            formPayload.append('title', data.title);
            formPayload.append('content', data.content);
            formPayload.append('hashtags', data.hashtags);
            formPayload.append('scheduleTime', data.scheduleTime);
            formPayload.append('platforms', JSON.stringify(data.platforms));
            formPayload.append('aiCaption', data.aiCaption);
            // react-hook-form returns a FileList for file inputs
            if (data.file && data.file.length > 0) {
                formPayload.append('file', data.file[0]);
            }

            setTemp(true);
            const res = await updatepost(postId, formPayload);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/posts');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setTemp(false);
        }
    };

    const sentimentStyles = {
        Positive: 'bg-green-500/20 text-green-400 border-green-500/30',
        Negative: 'bg-red-500/20 text-red-400 border-red-500/30',
        Neutral: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        Mixed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    };


    // const formatLocalDateTime = (date) => {
    //     const pad = (n) => n.toString().padStart(2, "0");

    //     const year = date.getFullYear();
    //     const month = pad(date.getMonth() + 1);
    //     const day = pad(date.getDate());
    //     const hours = pad(date.getHours());
    //     const minutes = pad(date.getMinutes());

    //     return `${year}-${month}-${day}T${hours}:${minutes}`;
    // };


    return (
        <div className=' border-1 border-blue-500 height-96 w-2/4 mx-auto rounded-2xl shadow-blue-400 p-7 
        bg-gradient-to-bl from-pink-500/55 to-orange-400/70 shadow-lg '>

            <form action="" onSubmit={handleSubmit(submitHandler)} className='mt-4'>

                <Link to={"/posts"} className='text-blue-900'><p className='h-5 w-15  bg-blue-200 rounded-full flex justify-center items-center p-3 hover:bg-blue-300'><MoveLeft /></p></Link>

                <h1 className='font-bold text-5xl text-center p-2 mb-5 text-transparent bg-clip-text bg-gradient-to-bl from-yellow-200 to-red-500'>Update Post </h1>
                <hr className='mb-14' />
                <div className={`mt-4 flex justify-center items-center`}>
                    <label htmlFor="title" className='block text-lg font-medium text-white w-1/4'>Title</label>
                    <input
                        type="text"
                        id='title'
                        {...register("title", {
                            required: "Title is required",
                            maxLength: { value: 100, message: "Max 100 characters" },
                            validate: (value) =>
                                value.trim() !== '' || "The title cannot be only spaces"
                        })}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 ' />
                </div>
                {errors.title && <p className="text-red-100 font-medium text-sm text-left ml-28">* {errors.title.message}</p>}

                <div className='mt-4 flex '>
                    <label htmlFor="content" className='block text-lg font-medium text-white w-1/4'>Content</label>
                    <textarea
                        id='content'
                        rows="4"
                        {...register("content", {
                            required: "Content is required",
                            validate: (value) =>
                                value.trim() !== '' || "The content cannot be only spaces"
                        })}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500'></textarea>
                </div>
                {errors.content && <p className="text-red-100 font-medium text-sm text-left ml-28">* {errors.content.message}</p>}
                { }
                <div className='mt-4 flex justify-center items-center'>
                    <label className='block text-lg font-medium text-white w-1/4'>Image</label>
                    {!watch('file')?.[0] && editpost.imageUrl && (
                        <img
                            src={editpost.imageUrl}
                            alt="Preview"
                            className="mt-3 w-45 h-45 object-cover   rounded-lg border "
                        />
                    )}
                    <input
                        type='file'
                        accept='image/*'
                        {...register("file")}
                        disabled={temp1 || temp2 || isLoading.sentiment}
                        className={`mt-1 block  ${preview && !watch('file')?.[0] ? "w-1/2 ml-5" : "w-full"} border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 
                            ${(temp1 || temp2 ) && "opacity-50 cursor-not-allowed text-slate-400"} `} />
                </div>

                <div className='mt-4 flex justify-center items-center'>
                    <label htmlFor="hashtages" className='block text-lg font-medium text-white w-1/4 '>Hashtags</label>
                    <input
                        id='hashtages'
                        // name='hashtags'
                        {...register("hashtags")}
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
                        {...register("scheduleTime")}

                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500' />
                </div>

                <div className='mt-4 flex items-center'>
                    <label htmlFor="platforms" className='block text-lg font-medium text-white w-1/4'>Platforms</label>
                    <div className='flex space-x-5'>
                        <div>
                            <input
                                type="checkbox"
                                id='twitter'
                                // name='platforms'
                                value='twitter'
                                {...register("platforms")}
                                className='mr-2'
                            />
                            <label htmlFor="twitter" className='text-white'>Twitter</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id='linkedin'
                                // name='platforms'
                                value='linkedin'
                                {...register("platforms")}
                                className='mr-2 leading-tight'
                            />
                            <label htmlFor="linkedin" className='text-white'>LinkedIn</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id='facebook'
                                // name='platforms'
                                value='facebook'
                                {...register("platforms")}
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
                        // name='aiCaption'
                        {...register("aiCaption")}
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

export default UpdatePostForm