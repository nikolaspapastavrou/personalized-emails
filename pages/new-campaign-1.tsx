import Image from "next/image";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../app/globals.css";

export default function Home() {
  return (
    <main className=" bg-white">
      <Sidebar />

      <div style={{ marginLeft: "320px" }}>
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
            <div className="w-60 h-16 bg-gray-300 flex justify-center items-center mr-4 shadow-sm">
              <p className="w-60 h-7 text-xl font-semibold ml-3">
                Add new leads (csv)
              </p>
            </div>

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
    </main>
  );
}
