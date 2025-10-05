import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo-2.png"

export default function Navbar() {


  return (
    <nav className=" bg-white fixed shadow-xl w-full top-0 left-0 z-50 inline rounded-b-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="" height={45} width={45} className="rounded-full mr-2 " />
            <h2 className="text-3xl font-bold text-blue-600">AutoPostAI</h2>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6 text-gray-700 mr-10">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/createpost" className=" hover:text-blue-600">Create Post</Link>
            <Link to="/posts" className=" hover:text-blue-600">Posts</Link>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            
            <Button variant={"outline"} className={`text-black cursor-not-allowed`}>LogIn</Button>
            <Button variant={"outline"} className={`text-black cursor-not-allowed`}>SignUp</Button>

          </div>
        </div>
      </div>
    </nav>
  );
}
