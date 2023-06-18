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

Write a short, captivating, and convincing email to send to ${name} working at ${company} to sell the product described above. Only write the email body text. Do not add a subject line. Do not add quotation marks around the text. Limit the response to 75 words.`;
    res.status(200).end(subjectLinePrompt);
  };
  
  export default handler;
