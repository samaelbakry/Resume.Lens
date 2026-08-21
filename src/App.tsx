import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/hero/Hero";
import MainLayout from "./components/layout/MainLayout";
import { usePuterStore } from "./lib/puter";
import Auth from "./pages/Auth";
import Upload from "./pages/Upload";

const App = () => {
  const {init} = usePuterStore()
  useEffect(() => {
    init()
  }, [init])
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Hero /> },
        { path: "/home", element: <Hero /> },
        {path:"/upload" , element:<Upload/>}
      ],
    },
    {path:"auth" , element:<Auth/>}
  ]);
  return <RouterProvider router={router} />;
    
};

export default App;
