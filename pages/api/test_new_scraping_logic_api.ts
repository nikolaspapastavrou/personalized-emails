import type { VercelRequest, VercelResponse } from '@vercel/node';
import { scrape_contents_2 } from '../..//utils/promptUtils'

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";


export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('check');
  
  if (req.method === 'GET') {
    res.status(200).end('hi');
  } else {
    console.log('Starting scraping terrastor!');
    // await scrape_contents_2('https://www.terrastor.co');
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
  
  
    let pageContents = await vectorStore.similaritySearch('company, products, values', 2);
  
    // await delay(5000);
    // @ts-ignore
    pageContents = pageContents.map((doc) => {doc.pageContent});
  
    console.log(pageContents);

    res.status(200).end('hello9!');
  }
}
