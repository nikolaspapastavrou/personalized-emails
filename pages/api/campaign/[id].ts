// pages/api/campaign/[id].ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as LeadService from '../../../services/lead.service';
import dbConnect from '../../../middleware/mongoose.middleware';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const id = req.query.id as string;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const campaign = await LeadService.getCampaignById(id);
        if (!campaign) return res.status(404).json({ error: 'Campaign not found.' });
        return res.status(200).json({ campaign });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    
    case 'PUT':
      try {
        const campaign = await LeadService.updateCampaignById(id, req.body);
        if (!campaign) return res.status(404).json({ error: 'Campaign not found.' });
        return res.status(200).json({ campaign });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    
    case 'DELETE':
      try {
        const deletedCampaign = await LeadService.deleteCampaignById(id);
        if (!deletedCampaign) return res.status(404).json({ error: 'Campaign not found.' });
        return res.status(200).json({ message: 'Campaign deleted.' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
