// pages/api/test/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as EmailService from '../../../services/email.service';

// Test our send email function.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const id = await EmailService.SendEmail("isaiahballah@gmail.com", "Isaiah");
      return res.status(200).json({id});
    } catch (error) {
      return res.status(200).json({ error });
    }
  } else {
    res.status(200).end('hello');
  }
}
