import Image from "next/image";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import "../app/globals.css";
import React from "react";

export default function Settings() {
  const [numberOfEmails, setNumberOfEmails] = React.useState(50);

  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <Sidebar selected={1} />

      <div style={{ marginLeft: "320px" }}>
        <Navbar />
        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          Settings
        </h1>
        <div className="mt-5 text-blue-400 font-bold">
          Email Connected (jacobbildy@gmail.com)
        </div>

        <div className="mt-20">
          Number of Emails to Send Per Day: <b>{numberOfEmails}</b>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={numberOfEmails}
          onChange={(e) => {
            setNumberOfEmails(parseInt(e.target.value));
          }}
          className="range"
        />

        <br></br>

        <button className="bg-blue-500 mt-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </main>
  );
}
