import Image from "next/image";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import "../app/globals.css";

export default function Home() {
  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/favicon.ico" />

      <title>Mailflame: Campaigns</title>

      <Sidebar selected={0} />

      <div style={{ marginLeft: "320px" }}>
        <Navbar />
        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          Get Started
        </h1>
        <div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center mt-10 hover:bg-gray-100 transition duration-100"
          style={{ width: "300px", height: "200px" }}
          onClick={() => {
            window.location.href = "/new-campaign-1";
          }}
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

        <a
          href="/campaign/1"
          className="bg-gradient-to-b rounded-lg shadow-lg p-0 flex flex-col items-center justify-center mt-10"
          style={{ width: "300px", height: "200px" }}
        >
          <img src={"campaign-cover.png"} className="rounded-t-lg" />
          <div
            className="bg-white rounded-b-lg shadow-lg p-6 flex flex-col items-center justify-center mt-auto"
            style={{ width: "300px", height: "100px" }}
          >
            <h2 className="text-lg ">Campaign 1</h2>
          </div>
        </a>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </main>
  );
}
