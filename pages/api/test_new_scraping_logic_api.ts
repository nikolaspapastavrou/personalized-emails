import type { VercelRequest, VercelResponse } from '@vercel/node';
import { scrape_contents_2, get_contents } from '../..//utils/promptUtils'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('check');
  
  if (req.method === 'GET') {
    res.status(200).end('hi');
  } else {
    console.log('Starting scraping terrastor!');
    // await scrape_contents_2('https://www.terrastor.co');
    console.log(get_contents('https://www.terrastor.co', 'company, products, mission, values'));
    res.status(200).end('hello9!');
  }
}
