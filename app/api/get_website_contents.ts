import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import type { VercelRequest, VercelResponse } from '@vercel/node';

async function getHTML(url: string) {
    try {
        const response = await fetch(url);
        const body = await response.text();

        return body;
    } catch (error) {
        console.error(`Failed to fetch ${url}`);
        throw error;
    }
}

async function processHTML(url: string) {
    const html = await getHTML(url);

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Now you can use jQuery-like syntax to traverse/modify the DOM
    // For instance, to get the text of all <p> elements:
    const pTexts = $('p, h1, h2, h3, h4, h5, h6').map((_, elem) => $(elem).text()).get();

    console.log(pTexts);

    return pTexts;
}

const handler = async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }

    if (req.method !== 'POST') {
        res.status(400).end("Request should be POST");
    }

    const { url } = JSON.parse(req.body);

    console.info(url);
  
    const pageContents = await processHTML(url);

    res.end(pageContents.join(' '));
  };
  
  export default handler;
