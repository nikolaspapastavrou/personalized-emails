import Image from "next/image";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import "../../app/globals.css";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import uploaded from "../public/uploaded.png";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function NewCampaign3() {
  const [generatedContent, setGeneratedContent] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // have progress go from 0 to 50 in the span of 5 seconds
    let count = 0;
    const interval = setInterval(() => {
      if (count <= 75) {
        setProgress((prev) => prev + 1);
        count += 1;
      }
    }, 200);
  }, []);

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
              src="../progress.png"
            />
            <p className="mr-4 h-7 text-sm font-medium mt-1">Progress: 3/4</p>

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
          New Campaign
        </h1>
        <div
          className="bg-white border border-gray-200 p-8 mt-4"
          style={{ width: "962.68px" }}
        >
          <div className="flex flex-row">
            <img
              src={"../uploaded.png"}
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
              src={"../uploaded.png"}
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
          className="bg-white  border border-gray-200 bg-opacity-50 shadow-sm mt-5 pl-8"
          style={{ width: "962.68px" }}
        >
          <div className="flex flex-row pt-8">
            <p className="mr-4 text-xl font-medium text-black">3</p>
            <p className="text-xl font-medium text-black">
              Email Content Generation
            </p>
          </div>

          {!generatedContent ? (
            <div>
              <img
                style={{ height: "300px" }}
                src={"../generating.gif"}
                onClick={() => {
                  setGeneratedContent(true); //TODO: remove when API is ready
                }}
              />

              <div className="flex flex-row mt-4 mb-10">
                <img src={"../magic-wand.svg"} />
                <div className="ml-3" style={{ width: "250px" }}>
                  Generating...
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: progress + "%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row mt-4">
                <img src={"../magic-wand.svg"} />
                <div className="ml-3" style={{ width: "250px" }}>
                  Generated <b style={{ color: "#3D7FE7" }}>200 </b> email
                  drafts
                </div>
              </div>

              <div className="relative overflow-x-auto mt-4 mr-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Text
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        John Doe
                      </th>
                      <td className="px-6 py-4">johndoe@gmail.com</td>
                      <td className="px-6 py-4">Greetings from...</td>
                      <td className="px-6 py-4">
                        According to all known laws of physics...
                      </td>
                      <td className="px-6 py-4">06/17/2023</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Jane Doe
                      </th>
                      <td className="px-6 py-4">janedoe@gmail.com</td>
                      <td className="px-6 py-4">Greetings from...</td>
                      <td className="px-6 py-4">
                        According to all known laws of physics...
                      </td>
                      <td className="px-6 py-4">06/17/2023</td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        Joseph M. Ama
                      </th>
                      <td className="px-6 py-4">joemama@gmail.com</td>
                      <td className="px-6 py-4">Greetings from...</td>
                      <td className="px-6 py-4">
                        According to all known laws of physics...
                      </td>
                      <td className="px-6 py-4">06/17/2023</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                className="bg-blue-500 mt-10 mb-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  window.location.href = "/new-campaign-4";
                }}
              >
                Next
              </button>
            </div>
          )}
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
