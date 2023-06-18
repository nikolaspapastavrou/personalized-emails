import Image from "next/image";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import "../app/globals.css";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import uploaded from "../public/uploaded.png";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function NewCampaign2() {
  // Add new type that has email, name, and url
  type Lead = {
    email: string;
    name: string;
    url: string;
  };

  const [uploadedLeads, setUploadedLeads] = useState<Lead[]>([]);

  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <Sidebar selected={0} />

      <div style={{ marginLeft: "320px" }}>
        {/* Upload Leads Popup */}

        <div className=" pt-5 pb-4">
          <div className="flex flex-row">
            <img
              className="w-7 h-7 bg-white rounded-full mr-3"
              src="progress.png"
            />
            <p className="mr-4 h-7 text-sm font-medium mt-1">Progress: 2/4</p>

            <div className="w-14 h-7 bg-gray-300 rounded-full p-2 justify-center items-center flex">
              <p className="w-8 h-4 text-xs font-medium text-gray-500">Draft</p>
            </div>

            {/* justify to the right */}
            <div className="flex-grow" />
            <div className="inline-flex items-start justify-start px-4 py-2.5 border rounded-lg border-gray-400 mr-4">
              <p className="text-xs font-medium text-gray-400">Finish Later</p>
            </div>
          </div>
          <div className="border-b-2 border-gray-200 mt-4" />
        </div>
        <h1 className="text-xl font-semibold  text-slate-800 mt-10">
          Campaign Name
        </h1>
        <div
          className="bg-white border border-gray-200 p-8 mt-4"
          style={{ width: "962.68px" }}
        >
          <div className="flex flex-row">
            <img
              src={"uploaded.png"}
              className="w-10 h-10 flex justify-center items-center"
            />

            <p className="w-72 h-20 mt-2 mr-4 ml-4 text-xl font-medium">
              Select Leads
            </p>
            <div className="flex-grow" />

            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              type="button"
              onClick={() => {
                // go to new campaign 1 page
                window.location.href = "/new-campaign-1";
              }}
            >
              Edit
            </button>
          </div>
        </div>

        <div
          className="bg-white  border border-gray-200 bg-opacity-50 flex justify-center items-center shadow-sm mt-5 flex-col"
          style={{ width: "962.68px" }}
        >
          <div className="flex flex-row p-4">
            <p className="mr-4 text-xl font-medium text-black">2</p>
            <p className="text-xl font-medium text-black">Sales Information</p>
          </div>

          <div className="mb-6 mt-5  w-10/12">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <textarea
              id="product-description"
              rows={4}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6 mt-5  w-10/12">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Service Link
            </label>
            <input
              type="text"
              id="service-link"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6 mt-5  w-10/12">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email Templates
            </label>
            <textarea
              rows={6}
              id="email-templates"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div
          className="bg-gray-300 bg-opacity-50 flex justify-center items-center shadow-sm mt-20"
          style={{ width: "968.24px", height: "125.40px" }}
        >
          <div className="flex flex-row">
            <p className="mr-4 text-xl font-medium text-gray-400">3</p>
            <p className="text-xl font-medium text-gray-400">
              Email Generation
            </p>
          </div>
        </div>

        <div
          className="bg-gray-300 bg-opacity-50 mt-5 flex justify-center items-center shadow-sm"
          style={{ width: "968.24px", height: "125.40px" }}
        >
          <div className="flex flex-row">
            <p className="mr-4 text-xl font-medium text-gray-400">4</p>
            <p className=" text-xl font-medium text-gray-400">Schedule</p>
          </div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </main>
  );
}
