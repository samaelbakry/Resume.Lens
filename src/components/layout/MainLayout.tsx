import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export default function MainLayout() {
  return (
   <div className="min-h-screen bg-slate-50 font-sans antialiased selection:bg-blue-500 selection:text-white flex flex-col justify-between">
      <Navbar />

      <main className="grow ">
        <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 pb-20 pt-26 text-slate-900">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-75 w-225 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[120px]" />
            <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.8) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
        <Outlet />
      </section>
      </main>

      <Footer />
    </div>
  )
}
