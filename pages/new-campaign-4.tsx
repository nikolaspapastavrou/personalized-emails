import Image from "next/image";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import "../app/globals.css";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import uploaded from "../public/uploaded.png";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function NewCampaign3() {
  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      {/* add favicon - is favicon.ico */}
      <link rel="icon" href="/favicon.ico" />

      <title>Mailflame: New Campaign</title>

      <Sidebar selected={0} />

      <div style={{ marginLeft: "320px" }}>
        {/* Upload Leads Popup */}

        <div className=" pt-5 pb-4">
          <div className="flex flex-row">
            <img
              className="w-7 h-7 bg-white rounded-full mr-3"
              src="progress.png"
            />
            <p className="mr-4 h-7 text-sm font-medium mt-1">Progress: 4/4</p>

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
          className="bg-white border border-gray-200 p-8 mt-4"
          style={{ width: "962.68px" }}
        >
          <div className="flex flex-row">
            <img
              src={"uploaded.png"}
              className="w-10 h-10 flex justify-center items-center"
            />

            <p className="w-72 h-20 mt-2 mr-4 ml-4 text-xl font-medium">
              Sales Information
            </p>
            <div className="flex-grow" />

            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              type="button"
              onClick={() => {
                // go to new campaign 1 page
                window.location.href = "/new-campaign-2";
              }}
            >
              Edit
            </button>
          </div>
        </div>
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
              Email Content Generation
            </p>
            <div className="flex-grow" />

            <button
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              type="button"
              onClick={() => {
                // go to new campaign 1 page
                window.location.href = "/new-campaign-3";
              }}
            >
              Edit
            </button>
          </div>
        </div>

        <div
          className="bg-white  border border-gray-200 bg-opacity-50 shadow-sm mt-5 pl-8 mb-10"
          style={{ width: "962.68px" }}
        >
          <div className="flex flex-row pt-8">
            <p className="mr-4 text-xl font-medium text-black">4</p>
            <p className="text-xl font-medium text-black">Schedule</p>
          </div>

          <div>
            <div className="flex flex-row mt-4">
              <div className="ml-3 mr-3">Daily Limit: 30</div>
              <img src={"info.svg"} data-tooltip-target="tooltip-default" />
              <div
                id="tooltip-default"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                The more emails you send in the day, the more likely you are to
                <br></br>
                end up in the Promotions folder.
                <br></br>Change this amount on the Settings page.
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="ml-3 mr-3 mt-3">
              <b style={{ color: "#3D7FE7" }}>200</b> emails will be sent
              between <b style={{ color: "#3D7FE7" }}>06/17/2023</b> -{" "}
              <b style={{ color: "#3D7FE7" }}>06/23/2023</b> for{" "}
              <b style={{ color: "#3D7FE7" }}>(campaign name)</b>.
            </div>

            <button
              className="bg-blue-500 mt-10 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                window.location.href = "/new-campaign-4";
              }}
            >
              Send
              <span className="inline-flex items-center p-4 justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-white bg-blue-400 rounded-full dark:bg-blue-900 dark:text-blue-300">
                200
              </span>
            </button>

            <button
              className="bg-white  border border-gray-400 ml-4 mt-10 mb-10 hover:bg-gray-200 text-gray-600 font-bold py-2 px-4 rounded"
              onClick={() => {
                window.location.href = "/new-campaign-4";
              }}
            >
              <div className="p-1 ">Save for Later</div>
            </button>
          </div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </main>
  );
}
