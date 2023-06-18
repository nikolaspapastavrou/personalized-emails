import type { VercelRequest, VercelResponse } from '@vercel/node';
import { scrape_contents_2 } from '../..//utils/promptUtils'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('check');
  
  if (req.method === 'GET') {
    res.status(200).end('hi');
  } else {
    console.log('Starting scraping terrastor!');
    await scrape_contents_2('https://www.terrastor.co');
    res.status(200).end('hello9!');
  }
}
