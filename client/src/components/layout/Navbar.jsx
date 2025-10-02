import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white fixed shadow-xl w-full top-0 left-0 z-50 inline rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-3xl font-bold text-blue-600">QueueUp</h2>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/createpost" className="text-gray-700 hover:text-blue-600">Create Post</Link>
            <Link to="/posts" className="text-gray-700 hover:text-blue-600">Posts</Link>
            <Link to="/calendar" className="text-gray-700 hover:text-blue-600">Calendar</Link>
            {/* <Link to="/settings" className="text-gray-700 hover:text-blue-600">Settings</Link> */}
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              + Create
            </button>
            <Link to="/profile" className="text-blue-700 hover:text-blue-600">
              Profile
            </Link>
            <Link to="/logout" className="text-red-500 hover:text-red-400">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
