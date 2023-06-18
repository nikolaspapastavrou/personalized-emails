import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

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
  const pTextsJoined = pTexts.join(" ");

  return pTextsJoined;
}

export async function get_contents(websiteURL: string, keywords: string) {

  const namespace = new URL(websiteURL).hostname || '';

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || '',
  });
  const pineconeIndex = client.Index (process.env.PINECONE_INDEX || '');

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { namespace, pineconeIndex },
  );


  const pageContents = await vectorStore.similaritySearch(keywords, 2);

  return pageContents;
};

export async function scrape_contents_2(websiteURL: string) {
  console.log('Initializing client!');

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || '',
  });

  console.log('Retrieving index!');
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX || '');

  console.log('Connected with vectorstore!');

  const relevantKeywords = ['about', 'information', 'mission', 'details', 'values', 'products', 'strategy'];
  let pagesToVisit = [websiteURL];
  let pagesVisited = 0;
  let pageContents = "";

  console.log('Starting loop!');

  while (pagesVisited < 3 && pagesToVisit.length > 0) {
    let currentPage = pagesToVisit.shift();
    if (!currentPage) {
      continue;
    }

    console.info(currentPage);

    const url = new URL(currentPage);
    const namespace = url.hostname;

    try {
      const response = await fetch(currentPage);
      const body = await response.text();

      // Load the HTML into Cheerio
      const $ = cheerio.load(body);

      // Get the text of all relevant elements:
      const pTexts = $('p, h1, h2, h3, h4, h5, h6').map((_, elem) => $(elem).text()).get();
      pageContents += " " + pTexts.join(" ");
      pageContents = pageContents.replace(/[^a-z0-9.,!?]/gi, ' ').replace(/\s\s+/g, ' ');
      console.info(pageContents);

      const splitter = new CharacterTextSplitter({
        separator: " ",
        chunkSize: 500,
      });

      const documents = await splitter.createDocuments([pageContents]);
      const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { namespace, pineconeIndex },
      );
      await vectorStore.addDocuments(documents);

      // Find new pages to visit:
      $("a[href]").each(function() {
        let href = $(this).attr('href') || '';
        // Handling relative URLs:
        href = new URL(href || '', currentPage).href;
        const isRelevant = relevantKeywords.some(keyword => href.endsWith(keyword));

        if (isRelevant && !pagesToVisit.includes(href)) {
          pagesToVisit.push(href);
        }
      });

      pagesVisited++;
    } catch (error) {
      console.error(error.message);
      console.error(`Failed to fetch ${currentPage}`);
    }
  }
};

export async function get_subject_line_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, leadCompanyInfo, sourceEmailTemplate) {

    const subjectLinePrompt = `Information scraped from ${leadCompanyName} retrieved:
${leadCompanyInfo}

Product to sell:
${sourceProductDescription}

Email Template:
${sourceEmailTemplate}

Write the subject line for an email that will be sent to send to ${leadCompanyOperatorName} working at ${leadCompanyName} to sell the product described above. Only write the subject line text. Do not add the prefix Subject: at the beggining. Do not add quotation marks around the text.`;
    return subjectLinePrompt
  };

export async function get_email_body_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, leadCompanyInfo, sourceEmailTemplate) {

  const emailBodyPrompt = `Information retrieved from ${leadCompanyName} website:
${leadCompanyInfo}

Product to sell:
${sourceProductDescription}

Email Template:
${sourceEmailTemplate}

Write a short, captivating, and convincing email to send to ${leadCompanyOperatorName} working at ${leadCompanyName} to sell the product described above. Only write the email body text. Do not add a subject line. Do not add quotation marks around the text. Limit the response to 75 words.`;
  return emailBodyPrompt;
  };
