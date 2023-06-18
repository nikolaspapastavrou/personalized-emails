// services/email.service.ts
import { Resend } from "resend";
import { FirstEmailTemplate } from '../components/EmailTemplate';
const resend = new Resend(process.env.RESEND_API_KEY);

// Validate email address.
export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Given an email address and a first name, send an email, if successful return the Resend response ID.
export async function SendEmail(to: string, subject: string, message: string): Promise<void> {
  // Input validation
  if (!validateEmail(to)) throw new Error('Invalid email address');
  if (!subject) throw new Error('Invalid subject');
  if (!message) throw new Error('Invalid message');

  try {
    const data = await resend.emails.send({
      from: "isaiah@warmemailleads.com",
      to: to,
      subject: subject,
      text: message,
      // html: message,
      // html: ,
      // react: FirstEmailTemplate({ firstName }),
    });
    console.log(data);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
}

export async function SendFirstEmail(to: string, firstName: string): Promise<string | null> {
  // Input validation
  if (!validateEmail(to)) throw new Error('Invalid email address');
  if (!firstName) throw new Error('Invalid first name');

  try {
    const data = await resend.emails.send({
      from: "isaiah@warmemailleads.com",
      to: to,
      subject: "Warm Email Leads - Personalized Email Outreach",
      // html: ,
      react: FirstEmailTemplate({ firstName }),
    });

    return data.id;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    return null;
  }
}
