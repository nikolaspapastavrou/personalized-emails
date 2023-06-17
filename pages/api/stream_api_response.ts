import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

export const config = {
    runtime: "edge",
  };

const handler = async (req: Request): Promise<Response>=> {
    const { prompt } = (await req.json()) as {
        prompt?: string;
    };

    console.info(prompt);

    const payload: OpenAIStreamPayload = {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt || ''}],
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 8000,
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
