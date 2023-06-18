// pages/api/leads/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as LeadService from '../../../services/lead.service';
import dbConnect from '../../../middleware/mongoose.middleware';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        console.log("🔥 Creating leads", req.body.leads);
        const leads = await LeadService.createLeads(req.body.leads);
        console.log("🔥 Created leads", leads);
        return res.status(201).json({ leads });
      } catch (error) {
        console.error("😭 Error creating leads", error);
        return res.status(400).json({ error: error.message });
      }
      
    case 'GET':
      try {
        const leads = await LeadService.getLeads();
        return res.status(200).json({ leads });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
      
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
