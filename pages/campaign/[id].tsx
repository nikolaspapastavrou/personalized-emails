import Image from "next/image";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { CampaignI } from "../../models/campaign"; // assuming this path is correct
import { LeadI, Status } from "../../models/lead"; // assuming this path is correct
import "../../app/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EmailI } from "../../models/email";

interface CampaignProps {
  campaign: CampaignI;
}

//TODO: make this server side rendered (use campaign instead of selectedCampaign)
export default function Campaign({ campaign }: CampaignProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCampaign, setSelectedCampaign] = useState<
    CampaignI | undefined
  >();

  //get param from url
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetch all campaigns from the API: /api/campaign
    fetch("/api/campaign/" + id)
      .then((res) => res.json())
      .then((data) => {
        setSelectedCampaign(data.campaign);
        console.log(data);
      });
  }, []);

  if (!selectedCampaign) {
    return <div>Loading...</div>;
  }

  // It's been opened if, the status is Read, Replied, Closed.
  const numSent = selectedCampaign.leads.filter(
    (lead) =>
      lead.status === "Read" ||
      lead.status === "Replied" ||
      lead.status === "Closed" ||
      lead.status === "No Longer Responding" ||
      lead.status === "Sent"
  ).length;

  // It's been opened if, the status is Read, Replied, Closed.
  const numOpened = selectedCampaign.leads.filter(
    (lead) =>
      lead.status === "Read" ||
      lead.status === "Replied" ||
      lead.status === "Closed"
  ).length;

  const numRead = selectedCampaign.leads.filter(
    (lead) => lead.status === "Read"
  ).length;

  const numSentStatus = selectedCampaign.leads.filter(
    (lead) => lead.status === "Sent"
  ).length;

  // It's been replied if, the status is Replied, Closed.
  const numReplied = selectedCampaign.leads.filter(
    (lead) => lead.status === "Replied" || lead.status === "Closed"
  ).length;

  // It's been closed if, the status is Closed.
  const numClosed = selectedCampaign.leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const stats = [
    {
      name: "Sent",
      value: selectedCampaign.leads.filter((lead) => lead.status).length,
    },
    {
      name: "Open Rate",
      value: isNaN(Math.floor((numOpened / numSent) * 100))
        ? 0
        : Math.floor((numOpened / numSent) * 100),
      unit: "%",
    },
    {
      name: "Reply Rate",
      value: isNaN(Math.floor((numReplied / numSent) * 100))
        ? 0
        : Math.floor((numReplied / numSent) * 100),
      unit: "%",
    },
    {
      name: "Close rate",
      value: isNaN(Math.floor((numClosed / numSent) * 100))
        ? 0
        : Math.floor((numClosed / numSent) * 100),
      unit: "%",
    },
  ];

  const sent = selectedCampaign.leads.filter((lead) => lead.status === "Sent");
  const read = selectedCampaign.leads.filter((lead) => lead.status === "Read");
  const replied = selectedCampaign.leads.filter(
    (lead) => lead.status === "Replied"
  );
  const closed = selectedCampaign.leads.filter(
    (lead) => lead.status === "Closed"
  );
  const notInterested = selectedCampaign.leads.filter(
    (lead) => lead.status === "No Longer Responding"
  );

  function selectedLeads() {
    if (selectedTab === 0) {
      return closed;
    } else if (selectedTab === 1) {
      return replied;
    } else if (selectedTab === 2) {
      return read;
    } else if (selectedTab === 3) {
      return sent;
    } else {
      return notInterested;
    }
  }

  function generateGmailLink(email: string): string {
    const encodedEmail = encodeURIComponent(email);
    const searchQuery = `${encodedEmail} in:anywhere`;
    const gmailLink = `https://mail.google.com/mail/u/0/#search/${searchQuery}`;

    return gmailLink;
  }

  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <Sidebar selected={0} />

      <div>
        <Navbar />

        <div className=" sm:ml-[280px] m-10">
          <h1 className="text-2xl font-bold  text-slate-800 mt-10">
            {selectedCampaign.name}
          </h1>
          <h2 className="text-lg font-semibold  text-slate-800 mt-3">
            Engagement
          </h2>
          <p className="text-sm font-light text-slate-500">Updated daily</p>

          {/* Engagement Stats */}
          <div className="bg-gray-100 rounded-xl mt-5">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-pxsm:grid-cols-2 lg:grid-cols-4 rounded-2xl">
                {stats.map((stat, index) => (
                  <div
                    key={stat.name}
                    className={
                      "bg-gray-100 px-4 py-6 sm:px-6 lg:px-8 rounded-xl"
                    }
                  >
                    <p className="text-sm font-medium leading-6 text-black">
                      {stat.name}
                    </p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-black">
                        {stat.value}
                      </span>
                      {stat.unit ? (
                        <span className="text-sm text-gray-400">
                          {stat.unit}
                        </span>
                      ) : null}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leads Status Table | Sent 🧊 | Read 😶 | No Longer Responding 😴 | Responded 💬 | Closed 🥰 | */}
          {/* Tab bar that toggles the table view below. Emoji's in the tab bar are in a circle with different light pastel color, and the text beside them */}

          <div
            className="inline-flex  mt-8 items-center justify-start space-between"
            style={{ height: "32px" }}
          >
            <div
              className="flex space-x-2 items-center justify-start w-[12rem]"
              onClick={() => setSelectedTab(0)}
            >
              <div className="flex items-center justify-center w-8 h-full px-2 py-1 bg-red-100 rounded-full">
                <p className="text-base leading-normal text-gray-900">🥰 </p>
              </div>
              <p
                className={
                  selectedTab === 0
                    ? "text-base leading-normal text-black"
                    : "text-base leading-normal text-gray-400"
                }
              >
                Closed{" "}
                <span
                  style={{ color: selectedTab === 0 ? "#3D7FE7" : undefined }}
                >
                  {numClosed}
                </span>
              </p>
            </div>
            <div
              className="flex space-x-2 items-center justify-start w-[12rem]"
              onClick={() => setSelectedTab(1)}
            >
              <div className="flex items-center justify-center w-8 h-full px-2 py-1 bg-yellow-100 rounded-full">
                <p className="text-base leading-normal text-gray-900">💬 </p>
              </div>
              <p
                className={
                  selectedTab === 1
                    ? "text-base leading-normal text-black"
                    : "text-base leading-normal text-gray-400"
                }
              >
                Responded{" "}
                <span
                  style={{ color: selectedTab === 1 ? "#3D7FE7" : undefined }}
                >
                  {numReplied}
                </span>
              </p>
            </div>
            <div
              className="flex space-x-2 items-center justify-start w-[12rem]"
              onClick={() => setSelectedTab(2)}
            >
              <div className="flex items-center justify-center w-8 h-full px-2 py-1 bg-gray-100 rounded-full">
                <p className="text-base leading-normal text-gray-900">😶 </p>
              </div>
              <p
                className={
                  selectedTab === 2
                    ? "text-base leading-normal text-black"
                    : "text-base leading-normal text-gray-400"
                }
              >
                Read{" "}
                <span
                  style={{ color: selectedTab === 2 ? "#3D7FE7" : undefined }}
                >
                  {numRead}
                </span>
              </p>
            </div>
            <div
              className="flex space-x-2 items-center justify-start w-[12rem]"
              onClick={() => setSelectedTab(3)}
            >
              <div className="flex items-center justify-center w-8 h-full px-2 py-1 bg-gray-200 rounded-full">
                <p className="text-base leading-normal text-gray-900">🧊 </p>
              </div>
              <p
                className={
                  selectedTab === 3
                    ? "text-base leading-normal text-black"
                    : "text-base leading-normal text-gray-400"
                }
              >
                Sent{" "}
                <span
                  style={{ color: selectedTab === 3 ? "#3D7FE7" : undefined }}
                >
                  {numSentStatus}
                </span>
              </p>
            </div>
            <div
              className="flex space-x-2 items-center justify-start "
              onClick={() => setSelectedTab(4)}
            >
              <div className="flex items-center justify-center w-8 h-full px-2 py-1 bg-gray-200 rounded-full">
                <p className="text-base leading-normal text-gray-900">😴 </p>
              </div>
              <p
                className={
                  selectedTab === 4
                    ? "text-base leading-normal text-black"
                    : "text-base leading-normal text-gray-400"
                }
              >
                No Longer Responding{" "}
                <span
                  style={{ color: selectedTab === 4 ? "#3D7FE7" : undefined }}
                >
                  {0}
                  {/* TODO: implement this logic */}
                </span>
              </p>
            </div>
          </div>
          <div
            style={{
              marginLeft: (selectedTab * 12).toString() + "rem",
            }}
            className="w-28 h-0.5 mt-2 bg-gray-300 rounded-full mb-4"
          />

          {/* Table */}
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
                {selectedLeads().map((lead) => {
                  const lastEmail: EmailI | null = lead.conversation
                    ? (lead.conversation[
                        lead.conversation.length - 1
                      ] as EmailI)
                    : null;

                  return (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {lead.name}
                      </th>
                      <td className="px-6 py-4">{lead.emailAddress}</td>
                      <td className="px-6 py-4">
                        {lastEmail ? lastEmail.subject : ""}
                      </td>
                      <td className="px-6 py-4">
                        {lastEmail?.text}
                        <br></br>
                        <button
                          className=" text-blue-600"
                          onClick={() => {
                            //open in gmail using gmail function
                            window.open(
                              generateGmailLink(lead.emailAddress || ""),
                              "_blank"
                            ); //to open new page in new
                          }}
                        >
                          Open in Gmail
                        </button>
                      </td>
                      <td className="px-6 py-4">06/17/2023</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Here's where you would normally fetch the campaign from your API or database.
  // For now we're just going to use a mock campaign.
  //
  // const res = await fetch(`http://localhost:3000/api/campaign/${id}`);
  // const campaign = await res.json();

  const campaign: Partial<CampaignI> = {
    _id: id,
    leads: [
      // {
      //   name: "John Doe",
      //   emailAddress: "john.doe@example.com",
      //   tags: ["potential", "urgent"],
      //   status: "Sent",
      //   conversation: [
      //     {
      //       senderName: "Jane Smith",
      //       recipientEmail: "business@example.com",
      //       recipientName: "Business",
      //       senderEmail: "jane.smith@example.com",
      //       subject: "Product order",
      //       text: "I would like to order 100 units of your product.",
      //       date: new Date("2023-02-01T00:00:00Z").toISOString(),
      //     },
      //   ],
      // },
      // {
      //   name: "Jane Smith",
      //   emailAddress: "jane.smith@example.com",
      //   tags: ["follow-up", "VIP"],
      //   status: "Read",
      //   conversation: [
      //     {
      //       senderName: "Jane Smith",
      //       recipientEmail: "business@example.com",
      //       recipientName: "Business",
      //       senderEmail: "jane.smith@example.com",
      //       subject: "Product order",
      //       text: "I would like to order 100 units of your product.",
      //       date: new Date("2023-02-01T00:00:00Z").toISOString(),
      //     },
      //   ],
      // },
    ],
    maxDailyEmailsToSend: 200,
    isActive: true,
    productDescription: "Mock Product",
    emailTemplate: "Mock Email Template",
    serviceURL: "Mock Service URL",
  };

  if (!campaign) {
    // return { campaign: null };
    // 404 page?
    console.log("Campaign not found");
  }

  campaign.leads = campaign.leads || [];

  const sent = campaign.leads.filter((lead) => lead.status === "Sent").length;
  const read = campaign.leads.filter((lead) => lead.status === "Read").length;
  const replied = campaign.leads.filter(
    (lead) => lead.status === "Replied"
  ).length;
  const closed = campaign.leads.filter(
    (lead) => lead.status === "Closed"
  ).length;
  const notInterested = campaign.leads.filter(
    (lead) => lead.status === "No Longer Responding"
  ).length;

  return { props: { campaign, sent, read, replied, closed, notInterested } };
}
