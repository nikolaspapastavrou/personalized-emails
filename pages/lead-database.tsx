import Image from "next/image";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import "../app/globals.css";

export default function LeadDatabase() {
  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <Sidebar selected={2} />

      <div style={{ marginLeft: "320px" }}>
        <Navbar />
        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          Lead Database
        </h1>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </main>
  );
}
