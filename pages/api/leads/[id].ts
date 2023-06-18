// pages/api/leads/[id].ts
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
        const lead = await LeadService.getLeadById(id);
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        return res.status(200).json({ lead });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    
    case 'PUT':
      try {
        const lead = await LeadService.updateLeadById(id, req.body);
        if (!lead) return res.status(404).json({ error: 'Lead not found.' });
        return res.status(200).json({ lead });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    
    case 'DELETE':
      try {
        const deletedLead = await LeadService.deleteLeadById(id);
        if (!deletedLead) return res.status(404).json({ error: 'Lead not found.' });
        return res.status(200).json({ message: 'Lead deleted.' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
