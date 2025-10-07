import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo-2.png"
import { toast } from "react-toastify";
import { logout } from "@/features/Users/api/users";
// import { useState } from "react";


export default function Navbar({ isLogin, setIsLogin }) {

  // const [isLoggedin, setisLogin] = useState(false)


  const navigate = useNavigate()

  const logoutHandler = async () => {

    try {

      const res = await logout()

      if (res.data.success) {
        toast.success(res.data.message)
        // console.lo
        setIsLogin(false)
      }

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)

    }

  }


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

            {
              !isLogin ?
                <>
                  <Button variant={"outline"} className={`text-black`}
                    onClick={() => navigate("/login")}
                  >LogIn</Button>

                  <Button variant={"outline"} className={`text-black `}
                    onClick={() => (navigate("/signup"))}
                  >SignUp</Button>
                </>
                :
                <>
                  <Button variant={"outline"} className={`text-black `}
                    onClick={logoutHandler}
                  >Logout</Button>
                </>
            }

          </div>
        </div>
      </div>
    </nav>
  );
}
