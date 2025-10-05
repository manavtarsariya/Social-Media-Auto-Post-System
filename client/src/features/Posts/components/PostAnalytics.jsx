import { CheckCircle, Clock, Hourglass, XCircle } from "lucide-react";
import React from "react";

const PostAnalytics = ({ count_posted_post, count_scheduled_post, count_failed_post, count_pending_post }) => {
  const stats = [
     {
      label: "Pending",
      value: count_pending_post,
      icon: <Hourglass className="text-yellow-400 w-8 h-8" />,
      color: "from-yellow-500/20 to-yellow-500/5",
    },{
      label: "Scheduled",
      value: count_scheduled_post,
      icon: <Clock className="text-blue-400 w-8 h-8" />,
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      label: "Published",
      value: count_posted_post,
      icon: <CheckCircle className="text-green-400 w-8 h-8" />,
      color: "from-green-500/20 to-green-500/5",
    },
    {
      label: "Failed",
      value: count_failed_post,
      icon: <XCircle className="text-red-400 w-8 h-8" />,
      color: "from-red-500/20 to-red-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 p-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between p-6 rounded-xl bg-gradient-to-br ${stat.color} border border-gray-700 shadow-lg hover:shadow-xl hover:scale-105 transition duration-200`}
        >
          <div>
            <p className="text-gray-300 text-sm">{stat.label} Posts</p>
            <h2 className="text-3xl font-bold text-white">{stat.value}</h2>
          </div>
          {stat.icon}
        </div>
      ))}
    </div>
  );
};

export default PostAnalytics;
