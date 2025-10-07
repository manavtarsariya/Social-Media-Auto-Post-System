import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'
import { Button } from './components/ui/button'
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Createpostpage from "./pages/Createpostpage";
import AllPosts from "./pages/AllPosts";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import FinaleLayout from "./pages/FinaleLayout";


function App() {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {

    console.log(isLogin)
  })

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <FinaleLayout isLogin={isLogin} setIsLogin={setIsLogin}>
          <Home />
        </FinaleLayout>,
    },
    {
      path: "/createpost",
      element:
        <FinaleLayout isLogin={isLogin} setIsLogin={setIsLogin}>
          <Createpostpage />
        </FinaleLayout>
      ,
    },
    {
      path: "/posts",
      element:
        <FinaleLayout isLogin={isLogin} setIsLogin={setIsLogin}>
          <AllPosts />
        </FinaleLayout>
      ,
    },
    {
      path: "/login",
      element:
        <FinaleLayout isLogin={isLogin} setIsLogin={setIsLogin}>
          <Login setIsLogin={setIsLogin} />
        </FinaleLayout>,
    },
    {
      path: "/signup",
      element:
        <FinaleLayout isLogin={isLogin} setIsLogin={setIsLogin}>
          <SignUp />
        </FinaleLayout>,
    }
  ]);

  return (
    <>
      <div>
        
        <RouterProvider router={router} />
        {/* <Navbar/> */}


      </div>
    </>
  )
}

export default App
