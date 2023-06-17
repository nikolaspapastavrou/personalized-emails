import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";
import { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
    runtime: "edge",
  };

const handler = async (req: VercelRequest): Promise<Response>=> {
    const { prompt } = JSON.parse(req.body);

    console.info(prompt);

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 3000,
        stream: true,
        n: 1,
      };
    
      const stream = await OpenAIStream(payload);
      // return stream response (SSE)
      return new Response(
        stream
      );
  };
  
  export default handler;
