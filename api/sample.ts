import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log('check');
  
  if (req.method === 'GET') {
    res.status(200).end('hi');
  } else {
    res.status(200).end('hello');
  }
}
