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
                <div className="relative border-2 border-dashed border-gray-400 rounded-lg  w-96 mt-5 mb-5  h-40 flex justify-center items-center">
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
                      <span className="text-gray-500">CSV files here or</span>
                      <span className="text-blue-500">Browse</span>
                    </div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">
                  (Max file size: 5MB)
                </span>
              </div>

              <div className="flex items-center p-6 space-x-2 border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="staticModal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <div className="w-7 h-7 bg-gray-300 rounded-full mr-3" />
            <p className="mr-4 h-7 text-sm font-medium mt-1">Progress: 1/3</p>

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
          style={{ width: "962.68px", height: "259.14px" }}
        >
          <div className="flex flex-row">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex justify-center items-center">
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

            <div className="w-80 h-16 bg-gray-300 flex justify-center items-center  shadow-sm">
              <p className="w-72 h-7 text-xl font-semibold text-gray-400">
                Select from Existing Leads
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-gray-300 bg-opacity-50 flex justify-center items-center shadow-sm mt-40"
          style={{ width: "968.24px", height: "125.40px" }}
        >
          <div className="flex flex-row">
            <p className="mr-4 text-xl font-medium text-gray-400">2</p>
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
            <p className="mr-4 text-xl font-medium text-gray-400">3</p>
            <p className=" text-xl font-medium text-gray-400">Schedule</p>
          </div>
        </div>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
    </main>
  );
}
