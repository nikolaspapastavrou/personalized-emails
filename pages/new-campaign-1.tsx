import Image from "next/image";
import Navbar from "../components/navigation/Navbar";
import Sidebar from "../components/navigation/Sidebar";
import "../app/globals.css";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useState } from "react";
import uploaded from "../public/uploaded.png";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Status } from "../models/lead";

export default function NewCampaign1() {
  const [uploadedLeads, setUploadedLeads] = useState<SimpleLeadI[]>([]);
  interface SimpleLeadI {
    name: string;
    companyName: string;
    emailAddress: string;
    tags: string[];
    status: Status;
    website: string;
  }

  const createInitialCampaign = async () => {
    const res = await fetch("/api/campaign/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Draft Campaign",
        isActive: false,
        maxDailyEmailsToSend: 50, // TODO: Hardcoding this for now
        productDescription: "Draft",
        emailTemplate: "Draft",
        serviceURL: "Draft",
      }),
    });

    const data = await res.json();

    const res2 = await fetch("/api/leads/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leads: uploadedLeads,
      }),
    });
    const leadsData = await res2.json();
    console.log(leadsData);

    const res3 = await fetch("/api/campaign/add-leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leadIds: leadsData.leads.map((lead: any) => lead._id),
        campaignId: data._id,
      }),
    });

    window.location.href = "/new-campaign-2/" + data._id;
  };

  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <Sidebar selected={0} />

      <div style={{ marginLeft: "320px" }}>
        {/* Upload Leads Popup */}

        <div
          id="staticModal"
          data-modal-backdrop="static"
          tabIndex={-1}
          aria-hidden="true"
          className="backdrop-blur-sm fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4  rounded-t dark:border-white-100">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upload Leads from CSV
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="staticModal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                {uploadedLeads.length > 0 ? (
                  <div className="justify-center items-center text-center flex flex-col">
                    <img
                      src={"uploaded.png"}
                      style={{
                        height: "60px",
                        width: "60px",
                        marginTop: "50px",
                        marginBottom: "50px",
                      }}
                    />
                    Uploaded Succesfully!
                  </div>
                ) : (
                  <Dropzone
                    onDrop={(files) => {
                      const reader = new FileReader();
                      reader.onload = function (e) {
                        if (e.target && e.target.result) {
                          const csv = e.target.result;
                          const lines = csv.toString().split("\n");
                          const emails = lines.map(
                            (line) => line.split(",")[1]
                          );
                          const names = lines.map((line) => line.split(",")[0]);
                          const urls = lines.map((line) => line.split(",")[2]);

                          // convert into a lead object
                          const leads = emails.map((email, i) => ({
                            emailAddress: email,
                            name: names[i],
                            website: urls[i],
                            companyName: urls[i], //TODO: differentiate
                            tags: [""],
                            status: "No Contact" as Status,
                            lastContacted: new Date(),
                          }));

                          setUploadedLeads(leads);
                        }
                      };
                      reader.readAsText(files[0]);
                    }}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={3 * 1024 ** 2}
                    maxFiles={1}
                    accept={[MIME_TYPES.csv]}
                    sx={{
                      // backgroundColor: "blue",
                      // Transparant background
                      backgroundColor: "rgba(0, 0, 0, 0)",

                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                      },
                    }}
                    // {...props}
                  >
                    <div className="relative  rounded-lg  w-96 mt-5 mb-5  h-40 flex justify-center items-center">
                      <div className="absolute">
                        <div className="flex flex-col items-center space-y-1 text-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            className="h-8 mt-2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            ></path>
                          </svg>
                          <span className="font-medium">Drag and drop</span>
                          <span className="text-gray-500">
                            CSV files here or
                          </span>
                          <span className="text-blue-500">Browse</span>
                        </div>
                      </div>
                    </div>
                  </Dropzone>
                )}
                <span className="text-gray-500 text-sm">
                  (Max file size: 5MB)
                </span>
              </div>

              <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {}}
                >
                  Save
                </button>
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-5 pb-4">
          <div className="flex flex-row">
            <img
              className="w-7 h-7 bg-white rounded-full mr-3"
              src="progress.png"
            />
            <p className="mr-4 h-7 text-sm font-medium mt-1">Progress: 1/4</p>

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
            <div className="w-12 h-12 bg-brand rounded-full flex justify-center items-center">
              <p className="text-xl font-medium">1</p>
            </div>

            <p className="w-72 h-20 mt-2 mr-4 ml-4 text-xl font-medium">
              Select Leads
            </p>
          </div>

          <div className="flex flex-row">
            <button
              data-modal-target="staticModal"
              data-modal-toggle="staticModal"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
              type="button"
            >
              Add new leads (csv)
            </button>

            <button
              data-modal-target="staticModal"
              data-modal-toggle="staticModal"
              className="block text-white bg-gray-300 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-3"
              type="button"
            >
              Select from Existing Leads
            </button>
          </div>

          {uploadedLeads.length > 0 && (
            <div className="relative overflow-x-auto mt-10">
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
                      URL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedLeads.map((lead, i) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={i}
                    >
                      {/* a circle that is brand color and has the 🥶 emoji in the center */}

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex flex-row">
                          <div className="flex flex-row">
                            <div className="w-7 h-7 bg-brand rounded-full mr-3 flex justify-center items-center">
                              🥶
                            </div>
                          </div>
                          {lead.name}
                        </div>
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex flex-row">{lead.emailAddress}</div>
                      </th>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="flex flex-row">{lead.website}</div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav
                className="flex items-center justify-between pt-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-10
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {uploadedLeads.length}
                  </span>
                </span>
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <a
                      href="#"
                      className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      1
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      2
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    >
                      3
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      ...
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      {uploadedLeads.length}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>

              <button
                className="bg-blue-500 mt-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={createInitialCampaign}
              >
                Confirm
              </button>
            </div>
          )}
        </div>

        <div
          className="bg-gray-300 bg-opacity-50 flex justify-center items-center shadow-sm mt-20"
          style={{ width: "968.24px", height: "125.40px" }}
        >
          <div className="flex flex-row">
            <p className="mr-4 text-xl font-medium text-gray-400">2</p>
            <p className="text-xl font-medium text-gray-400">
              Sales Information
            </p>
          </div>
        </div>

        <div
          className="bg-gray-300 bg-opacity-50 flex justify-center items-center shadow-sm mt-5"
          style={{ width: "968.24px", height: "125.40px" }}
        >
          <div className="flex flex-row">
            <p className="mr-4 text-xl font-medium text-gray-400">3</p>
            <p className="text-xl font-medium text-gray-400">
              Email Content Generation
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
