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
          Email Connected (isaiah@warmemailleads.com)
        </div>

        <br></br>
        <div className="mb-6 mt-5  w-64">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            type="text"
            id="service-link"
            value={"WarmEmailLeads.com"}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
