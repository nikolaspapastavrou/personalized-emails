import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { get_contents } from './get_website_contents';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const handler = async (req: VercelRequest, res: VercelResponse) => {

    console.log('check 1');
    
    const { name, company, productDescription, emailTemplate, url } = JSON.parse(req.body);

    console.log('check 2');
    const pageContents = await get_contents(url);

    console.log(Object.keys(pageContents));

    console.log('check 3');
    const subjectLinePrompt = `Information scraped from ${company} website:
${pageContents}

Product to sell:
${productDescription}

Email Template:
${emailTemplate}

Write a one sentence, subject line for an email to send to ${name} at ${company} for an email that is selling ${name} the product described above. Do not start with "Subject" and avoid using quotation marks.`;
    res.status(200).end(subjectLinePrompt);
  };
  
  export default handler;