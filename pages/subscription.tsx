import Image from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../app/globals.css";

export default function Home() {
  return (
    <main className=" bg-white">
      <Sidebar selected={3} />

      <div style={{ marginLeft: "320px" }}>
        <Navbar />
        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          My Subscription
        </h1>
        <div className="mt-5 text-blue-400 font-bold">Manage Subscription</div>
      </div>
    </main>
  );
}
