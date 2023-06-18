// pages/api/campaign/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { startCampaign } from '../../../services/lead.service'; // importing from lead.service
import dbConnect from '../../../middleware/mongoose.middleware'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  // Start campaign.
  if (req.method === 'POST') {
    try {
      const campaign = req.body.campaignId;
      const newCampaign = await startCampaign(campaign);

      return res.status(201).json(newCampaign);
    } catch (error) {
      console.log("Error trying to start campaign: ", error);
      return res.status(500).json({ error: error.message });
    }
  }

  // If the request method is neither POST nor GET
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
