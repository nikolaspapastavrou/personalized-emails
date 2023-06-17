import { EmailTemplate } from "../../../components/EmailTemplate";
// import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Given an email address and a first name, send an email, if successfull return the Resend response ID.
async function SendEmail(to: string, firstName: string): Promise<string> {
  const data = await resend.emails.send({
    from: "isaiah@warmemailleads.com",
    to: to,
    subject: "Hello world",
    react: EmailTemplate({ firstName }),
  });
  return data.id;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const id = await SendEmail("isaiahballah@gmail.com", "Isaiah");
      return res.status(200).json({id});
    } catch (error) {
      return res.status(200).json({ error });
    }
  } else {
    res.status(200).end('hello');
  }
}
