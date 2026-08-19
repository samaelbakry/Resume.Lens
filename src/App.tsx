import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Hero from "./components/hero/Hero";
import Auth from "./pages/Auth";
import { usePuterStore } from "./lib/puter";
import { useEffect } from "react";

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
      ],
    },
    {path:"auth" , element:<Auth/>}
  ]);
  return <RouterProvider router={router} />;
};

export default App;
