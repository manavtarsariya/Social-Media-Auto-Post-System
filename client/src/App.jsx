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

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/createpost",
    element: <Createpostpage/>,
  },
  {
    path: "/posts",
    element: <AllPosts/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  }
]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      
        
      </div>
    </>
  )
}

export default App
