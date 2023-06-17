import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.text('hi').status(200);
  } else {
    res.text('hello').status(200);
  }
}
