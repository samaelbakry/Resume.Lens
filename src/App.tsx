import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Hero from "./components/hero/Hero";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Hero /> },
        { path: "/home", element: <Hero /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
