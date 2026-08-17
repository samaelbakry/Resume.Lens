import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function MainLayout() {
  return (
   <div className="min-h-screen bg-black font-sans antialiased text-white selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
