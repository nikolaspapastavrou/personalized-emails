import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

import * as promptUtils from '../../utils/promptUtils';

export const config = {
  runtime: 'edge',
};

const handler = async (req, res) => {
  const { leadCompanyOperatorName, leadCompanyName, sourceProductDescription, leadCompanyUrl, sourceEmailTemplate } = (await req.json()) as {
    leadCompanyOperatorName?: string;
    leadCompanyName?: string
    sourceProductDescription?: string
    leadCompanyUrl?: string
    sourceEmailTemplate?: string
  };

  console.log(leadCompanyOperatorName);
  console.log(leadCompanyName);
  console.log(sourceProductDescription);
  console.log(leadCompanyUrl);
  console.log(sourceEmailTemplate);

  // Get company info from url
  console.log('Getting company info');
  const companyInfo = await promptUtils.get_contents(leadCompanyUrl || '');
  
  // Create prompts
  console.log('Constructing prompts');
  const subjectLinePrompt = await promptUtils.get_subject_line_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, companyInfo, sourceEmailTemplate);
  console.log('Got subject line');
  console.log(subjectLinePrompt);
  const emailBodyPrompt = await promptUtils.get_email_body_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, companyInfo, sourceEmailTemplate);
  console.log('Got email body');
  console.log(emailBodyPrompt);

  // Create Langchain chains from prompts
  console.log('Creating langchain chains from prompts');
  const chat = new ChatOpenAI({ temperature: 0 });

  // get completions from Langchain chains
  console.log('Creating langchain chains from prompts');
  const emailSubjectLine = await chat.call([
    new HumanChatMessage(
      subjectLinePrompt
    ),
  ]);
  const emailTextBody = await chat.call([
    new HumanChatMessage(
      emailBodyPrompt
    ),
  ]);

  // Return response
  console.log('Returning response');
  res.status(200).json({ emailSubject: emailSubjectLine, emailBody: emailTextBody});
};
  
  export default handler;
