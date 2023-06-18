// pages/api/campaign/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createCampaign, getCampaigns, addLeadsToCampaign } from '../../../services/lead.service'; // importing from lead.service
import dbConnect from '../../../middleware/mongoose.middleware'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  // Add list of leads to campaign.
  if (req.method === 'POST') {
    try {
      const leads = req.body.leadIds;
      const campaign = req.body.campaignId;
      const newCampaign = await addLeadsToCampaign(campaign, leads);

      return res.status(201).json(newCampaign);
    } catch (error) {
      console.error("😭 Error adding leads to campaign", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // If the request method is neither POST nor GET
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
