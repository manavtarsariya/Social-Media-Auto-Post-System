import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {

  const navigate = useNavigate()

  return (
    <nav className=" bg-white fixed shadow-xl w-full top-0 left-0 z-50 inline rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-3xl font-bold text-blue-600">QueueUp</h2>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6 text-gray-700 ml-20">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/createpost" className=" hover:text-blue-600">Create Post</Link>
            <Link to="/posts" className=" hover:text-blue-600">Posts</Link>
            {/* <Link to="/settings" className="text-gray-700 hover:text-blue-600">Settings</Link> */}
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={()=>navigate("/createpost")}
            >
              + Create
            </button>
            
            <Button variant={"outline"}>LogIn</Button>
            <Button variant={"outline"}>SignUp</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
