import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
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

export async function get_contents(websiteURL: string) {

    console.info(websiteURL);
  
    const pageContents = await processHTML(websiteURL);

    return pageContents;
  };
