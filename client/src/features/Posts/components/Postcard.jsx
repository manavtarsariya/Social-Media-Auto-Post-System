import { Calendar, Clock, Sparkles } from 'lucide-react';



const statusColors = {
    Scheduled: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    Published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    Draft: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
    Failed: 'bg-red-500/20 text-red-400 border-red-500/40',
};


const Postcard = ({ post }) => {


    {
        return (
            <div className="w-full  max-w-md bg-[#1a1d24] rounded-2xl overflow-hidden shadow-2xl border border-slate-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-blue-500/10">

                <div className="p-5 flex items-center justify-between border-b border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/30">
                            {post?.username?.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-slate-100 font-semibold text-sm leading-tight">{post?.username}</h3>
                            <p className="text-slate-500 text-xs mt-0.5">ID: {post?.userId}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs text-white font-semibold border ${statusColors[post.status]} backdrop-blur-sm`}>
                        {post.status}
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
                    {/* <div className="absolute inset-0  bg-gradient-to-t from-[#1a1d24] via-transparent to-transparent"></div> */}
                </div>

                <div className="p-5 space-y-4">

                    <h2 className="text-slate-100 font-bold text-lg leading-snug line-clamp-2">
                        {post?.title}
                    </h2>


                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                        {post?.content}
                    </p>


                    <div className="flex flex-wrap gap-2">
                        {post?.hashtags?.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-slate-800/70 text-blue-400 text-xs font-medium rounded-full border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>



                    <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/20 rounded-xl p-3 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-slate-300 text-xs leading-relaxed italic">
                            {post?.aiCaption}
                        </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/50 space-y-2">

                        <div className="flex items-center gap-2 text-slate-300">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium">{post?.scheduleTime}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs">{post?.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Postcard;