import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

import * as promptUtils from '../../utils/promptUtils';

export const config = {
    runtime: "edge",
};

const handler = async (req, res) => {
  console.log(req);
  console.log(Object.keys(req));
  
  const { form } = req;

  // Get variables
  console.log('Getting variables');
  const leadCompanyOperatorName = form.leadCompanyOperatorName;
  const leadCompanyName = form.leadCompanyName;
  const sourceProductDescription = form.sourceProductDescription;
  const leadCompanyUrl = form.leadCompanyUrl;
  const sourceEmailTemplate = form.sourceEmailTemplate;

  // Get company info from url
  console.log('Getting company info');
  const companyInfo = await promptUtils.get_contents(leadCompanyUrl);
  
  // Create prompts
  console.log('Constructing prompts');
  const subjectLinePrompt = await promptUtils.get_subject_line_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, companyInfo, sourceEmailTemplate);
  const emailBodyPrompt = await promptUtils.get_email_body_prompt(leadCompanyOperatorName, leadCompanyName, sourceProductDescription, companyInfo, sourceEmailTemplate);

  // Create Langchain chains from prompts
  console.log('Creating langchain chains from prompts');
  const chat = new ChatOpenAI({ temperature: 0, modelName: 'gpt4'});
  const subjectLineChatPrompt = ChatPromptTemplate.fromPromptMessages(
    [HumanMessagePromptTemplate.fromTemplate(subjectLinePrompt),
    ]);
  const emailBodyChatPrompt = ChatPromptTemplate.fromPromptMessages(
    [HumanMessagePromptTemplate.fromTemplate(emailBodyPrompt),
    ]);
  const subjectLineCChain = new LLMChain({
      prompt: subjectLineChatPrompt,
      llm: chat,
  });
  const textBodyChain = new LLMChain({
    prompt: emailBodyChatPrompt,
    llm: chat,
  });

  // get completions from Langchain chains
  console.log('Creating langchain chains from prompts');
  const emailSubjectLine = await subjectLineCChain.call({});
  const emailTextBody = await textBodyChain.call({});

  // Return response
  console.log('Returning response');
  res.status(200).json({ emailSubject: emailSubjectLine, emailBody: emailTextBody});
};
  
  export default handler;
