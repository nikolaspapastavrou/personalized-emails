import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { PineconeClient } from "@pinecone-database/pinecone";
import * as dotenv from "dotenv";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

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

export async function get_subject_line_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, leadCompanyInfo, sourceEmailTemplate) {

    const subjectLinePrompt = `Information scraped from ${leadCompanyName} website:
${leadCompanyInfo}

Product to sell:
${sourceProductDescription}

Email Template:
${sourceEmailTemplate}

Write the subject line for an email that will be sent to send to ${leadCompanyOperatorName} working at ${leadCompanyName} to sell the product described above. Only write the subject line text. Do not add the prefix Subject: at the beggining. Do not add quotation marks around the text.`;
    return subjectLinePrompt
  };

export async function get_email_body_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, leadCompanyInfo, sourceEmailTemplate) {

  const emailBodyPrompt = `Information scraped from ${leadCompanyName} website:
${leadCompanyInfo}

Product to sell:
${sourceProductDescription}

Email Template:
${sourceEmailTemplate}

Write a short, captivating, and convincing email to send to ${leadCompanyOperatorName} working at ${leadCompanyName} to sell the product described above. Only write the email body text. Do not add a subject line. Do not add quotation marks around the text. Limit the response to 75 words.`;
  return emailBodyPrompt;
  };
