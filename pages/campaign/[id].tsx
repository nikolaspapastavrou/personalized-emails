import Image from "next/image";
import Navbar from "../../components/navigation/Navbar";
import Sidebar from "../../components/navigation/Sidebar";
import { CampaignI } from "../../models/campaign"; // assuming this path is correct
import { LeadI, Status } from "../../models/lead"; // assuming this path is correct
import "../../app/globals.css";

interface CampaignProps {
  campaign: CampaignI;
}

export default function Campaign({ campaign }: CampaignProps) {
  // It's been opened if, the status is Read, Replied, Closed.
  const numSent = campaign.leads.filter(
    (lead) =>
      lead.status === "Read" ||
      lead.status === "Replied" ||
      lead.status === "Closed" ||
      lead.status === "No Longer Responding" ||
      lead.status === "Sent"
  ).length;

  // It's been opened if, the status is Read, Replied, Closed.
  const numOpened = campaign.leads.filter(
    (lead) =>
      lead.status === "Read" ||
      lead.status === "Replied" ||
      lead.status === "Closed"
  ).length;

  // It's been replied if, the status is Replied, Closed.
  const numReplied = campaign.leads.filter(
    (lead) => lead.status === "Replied" || lead.status === "Closed"
  ).length;

  // It's been closed if, the status is Closed.
  const numClosed = campaign.leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const stats = [
    {
      name: "Sent",
      value: campaign.leads.filter((lead) => lead.status).length,
    },
    {
      name: "Open Rate",
      value: Math.floor((numOpened / numSent) * 100),
      unit: "%",
    },
    {
      name: "Reply Rate",
      value: Math.floor((numReplied / numSent) * 100),
      unit: "%",
    },
    {
      name: "Close rate",
      value: Math.floor((numClosed / numSent) * 100),
      unit: "%",
    },
  ];

  return (
    <main className=" bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Sarabun&display=swap"
        rel="stylesheet"
      />
      <Sidebar selected={0} />

      <div>
        <Navbar />

        <div className=" sm:ml-[270px] m-10">
          <h1 className="text-2xl font-bold  text-slate-800 mt-10">
            Campaign {campaign._id}
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
      {
        name: "John Doe",
        emailAddress: "john.doe@example.com",
        tags: ["potential", "urgent"],
        status: "Sent",
        conversation: [
          {
            senderName: "Jane Smith",
            recipientEmail: "business@example.com",
            recipientName: "Business",
            senderEmail: "jane.smith@example.com",
            subject: "Product order",
            text: "I would like to order 100 units of your product.",
            date: new Date("2023-02-01T00:00:00Z").toISOString(),
          },
        ],
      },
      {
        name: "Jane Smith",
        emailAddress: "jane.smith@example.com",
        tags: ["follow-up", "VIP"],
        status: "Read",
        conversation: [
          {
            senderName: "Jane Smith",
            recipientEmail: "business@example.com",
            recipientName: "Business",
            senderEmail: "jane.smith@example.com",
            subject: "Product order",
            text: "I would like to order 100 units of your product.",
            date: new Date("2023-02-01T00:00:00Z").toISOString(),
          },
        ],
      },
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
