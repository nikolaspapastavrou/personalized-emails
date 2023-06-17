import Image from "next/image";
import Sidebar from "../components/sidebar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className=" bg-white">
      <Sidebar />

      <div style={{ marginLeft: "320px" }}>
        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          Get Started
        </h1>
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center mt-10 hover:bg-gray-100 transition duration-100"
          style={{ width: "300px", height: "200px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-10 h-10 mt-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <h2 className="text-gray-800 text-lg font-medium mt-3">
            Create Campaign
          </h2>
        </div>

        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          Ongoing Projects
        </h1>

        <div
          className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg p-0 flex flex-col items-center justify-center mt-10"
          style={{ width: "300px", height: "200px" }}
        >
          <div
            className="bg-white rounded-b-lg shadow-lg p-6 flex flex-col items-center justify-center mt-auto"
            style={{ width: "300px", height: "100px" }}
          >
            <h2 className="text-lg ">Campaign 1</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
