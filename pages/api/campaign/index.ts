// pages/api/campaign/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createCampaign, getCampaigns } from '../../../services/lead.service'; // importing from lead.service
import dbConnect from '../../../middleware/mongoose.middleware'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  // Create New Campaign
  if (req.method === 'POST') {
    try {
      const campaignData = req.body; // Assuming you're sending campaign data in the body
      const newCampaign = await createCampaign(campaignData);

      return res.status(201).json(newCampaign);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Get All Campaigns
  if (req.method === 'GET') {
    try {
      const campaigns = await getCampaigns();

      return res.status(200).json(campaigns);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // If the request method is neither POST nor GET
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
