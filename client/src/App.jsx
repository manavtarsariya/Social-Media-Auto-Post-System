import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './App.css'
import { Button } from './components/ui/button'
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Createpostpage from "./pages/Createpostpage";

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
  }
]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
        {/* hi i am manav
        <Button>Button</Button> */}
        
      </div>
    </>
  )
}

export default App
