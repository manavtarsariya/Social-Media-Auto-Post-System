import { Button } from '@/components/ui/button';
import { Calendar, Clock, PenBox, Sparkles, Trash2Icon } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Link } from 'react-router';



const statusColors = {
    scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    posted: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    pending: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
    failed: 'bg-red-500/20 text-red-400 border-red-500/40',
};


const Postcard = ({ post, DeleteHandler }) => {

    // const navigate =useNavigate();

    {
        return (
            <div className="w-full h-230  max-w-md bg-[#1a1d24] rounded-2xl overflow-hidden shadow-2xl border border-slate-600/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/10">

                <div className="p-5 flex items-center justify-between border-b border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/30">
                            {post?.username?.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>

                        <div>
                            <h3 className="text-slate-100 font-semibold text-sm text-left">{post?.userId?.username}</h3>
                            {/* <p className="text-slate-500 text-xs mt-0.5">ID: {}</p> */}
                        </div>
                    </div>
                    <span
                        className={`px-2.5 py-1.5 text-[14px] font-medium  rounded-lg border ${statusColors[post?.status]}`}
                    >
                        {post?.status?.charAt(0).toUpperCase() + post?.status?.slice(1)}
                    </span>
                </div>


                <div className="relative w-full h-84 bg-slate-900/50 overflow-hidden">

                    {post?.imageUrl ?
                        <img
                            src={post?.imageUrl}
                            alt={post?.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        /> :
                        <img src={`https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png`}
                            alt="Description"
                            className='w-full h-full object-cover hover:scale-105 transition-transform duration-500' />
                    }
                </div>

                <div className="p-5 space-y-4">

                    <h2 className="text-slate-100 font-bold text-lg leading-snug line-clamp-2">
                        {post?.title}
                    </h2>


                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {post?.content}
                    </p>

                    <div className=''>

                        <div className="flex flex-wrap gap-2 ">
                            {post?.hashtags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-slate-800/70 text-blue-400 text-xs font-medium rounded-full border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>



                    <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-3 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300 text-xs leading-relaxed italic">
                            {post?.aiCaption}
                        </p>
                    </div>

                    <div className='mt-2'>
                        <h3 className="text-slate-100 font-semibold text-sm mb-1 ">Platforms</h3>
                        <div className="flex items-center gap-3 justify-center mt-2">
                            {post?.platforms?.map((platform, index) => (
                                <div key={index} className="px-3 py-1 bg-slate-800/70 text-blue-400 text-xs font-medium rounded-full border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-200">
                                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/50 space-y-2 flex justify-between">

                        <div>


                            <div className="flex items-center gap-2 text-slate-300">
                                <Calendar className="w-4 h-4 text-blue-400 mt-1" />
                                <span className="text-sm mt-1 font-medium">
                                    { post?.scheduleTime ? new Date(post?.scheduleTime).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    }) + " IST" : 
                                    "Not Scheduled"
                                    } 
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500 ">
                                <Clock className="w-4 h-4 mt-1" />
                                <span className="text-sm mt-1">
                                    {new Date(post?.createdAt).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })} IST
                                </span>
                            </div>
                        </div>

                        <div className='text-white text-sm font-semibold px-3 py-1 rounded-full flex gap-2 justify-center items-center'>

                            <AlertDialog>
                                <AlertDialogTrigger className={'border-1 p-2.5 rounded-full hover:bg-red-500/10 hover:cursor-pointer'}>
                                    <Trash2Icon className="w-5 h-5 text-red-500 hover:text-red-600 " />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription className={`text-lg text-gray-300`}>
                                            <span>Post Title is : <span className='font-bold text-emerald-500 '>{post?.title}</span></span>
                                            {`
                                            `}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className={`cursor-pointer`} >Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { DeleteHandler(post._id) }} className={`text-red-500 border-1 cursor-pointer`}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>


                            <Link to={`/updatepost/${post._id}`} className={'border-1 p-2.5 rounded-full hover:bg-blue-500/10 hover:cursor-pointer'} 
                            >
                                <PenBox className="w-5 h-5 text-blue-400 hover:text-blue-500" />
                            </Link>

                        </div>


                    </div>
                </div>
            </div>
        );
    }
}


export default Postcard;