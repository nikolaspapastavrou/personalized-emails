import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

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

export async function get_subject_line_prompt(name, company, productDescription, emailTemplate, url) {
    const pageContents = await get_contents(url);

    const subjectLinePrompt = `Information scraped from ${company} website:
${pageContents}

Product to sell:
${productDescription}

Email Template:
${emailTemplate}

Write a short, captivating, and convincing email to send to ${name} working at ${company} to sell the product described above. Only write the email body text. Do not add a subject line. Do not add quotation marks around the text. Limit the response to 75 words.`;
    res.status(200).end(subjectLinePrompt);
  };

export async function get_initial_email_body_prompt(name, company, productDescription, emailTemplate, url) {
    const pageContents = await get_contents(url);

    const subjectLinePrompt = `Information scraped from ${company} website:
${pageContents}

Product to sell:
${productDescription}

Email Template:
${emailTemplate}

Write a short, captivating, and convincing email to send to ${name} working at ${company} to sell the product described above. Only write the email body text. Do not add a subject line. Do not add quotation marks around the text. Limit the response to 75 words.`;
    res.status(200).end(subjectLinePrompt);
  };

export async function getCompletion(prompt) {
    const payload: OpenAIStreamPayload = {
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            max_tokens: 1000,
            stream: true,
            n: 1,
      };
    
    const stream = await OpenAIStream(payload);

    return stream;
};
