// This is a webhook that is triggered by the Make integration. 
// We will check to see who is emailing us, and compare that to our list of outbound emails to see if we find an existing conversation.
// If we don't find an existing conversation, we should ignore the message. 
// If we find an existing conversation, we should update the conversation state with the new message.
// We should determine if we should respond or if we should escalate to a human.
// If we should respond, we should send a response email.
// If we should escalate to a human, we should send a slack message to the appropriate channel.

// pages/api/webhooks/email-received.ts
import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import dbConnect from '../../../middleware/mongoose.middleware';
import * as LeadService from '../../../services/lead.service';
// import type Emaill from "../../../models/lead";
import * as EmailService from '../../../services/email.service';
import { EmailI } from "../../../models/email";
import { getReply } from "../get_first_email";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO - protect this route so people can't hack us and get us to send emails to people we don't want to send emails to.
// We need to set up a secret key that we can use to verify that the request is coming from our own Make integration.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const incomingEmail: EmailI = req.body;
      if (incomingEmail.senderEmail == "isaiah@warmemailleads.com") {
        // If no corresponding lead was found, ignore the message
        return res.status(200).end();
      }

      console.log(`🔥 Received email from ${incomingEmail.senderEmail}`);
      // Insert code to identify the lead by the incoming email here
      const lead = await LeadService.getLeadByEmail(incomingEmail.senderEmail);

      if (!lead) {
        // If no corresponding lead was found, ignore the message
        console.log(`😭 No lead found for email ${incomingEmail.senderEmail}`);
        await EmailService.SendEmail(incomingEmail.senderEmail, incomingEmail.subject, "You are not a lead? Who are you, and why are you emailing me?");
        return res.status(200).end();
      }

      // Update the conversation state with the new message
      console.log("Creating email", incomingEmail);
      await LeadService.createEmail({ 
        lead: lead._id,
        senderEmail: incomingEmail.senderEmail,
        senderName: incomingEmail.senderName,
        recipientEmail: incomingEmail.recipientEmail,
        recipientName: incomingEmail.recipientName,
        subject: incomingEmail.subject,
        text: incomingEmail.text,
      });
      // lead.conversation.push(incomingEmail);
      // await LeadService.updateLeadById(lead._id, { conversation: lead.conversation });

      // Determine if we should respond or if we should escalate to a human
      // Insert your decision logic here

      const shouldRespond = true; // TODO: Replace with your decision logic
      const shouldEscalate = false; // TODO: Replace with your decision logic

      const campaign = await LeadService.getCampaignForLead(lead._id);
      if (!campaign) {
        console.log(`😭 No campaign found for lead ${lead.emailAddress}`);
        return res.status(200).end();
      }

      if (shouldRespond) {
        // Generate a reply email using the getReply function
        console.log("GetReply",
          campaign.productDescription,
          lead.website,
          lead.companyName,
          lead.name,
          lead.conversation.map((email) => email.text),
          campaign.serviceURL,
        );
        const replyTemplate = await getReply(
          campaign.productDescription,
          lead.website,
          lead.companyName,
          lead.name,
          lead.conversation.map((email) => email.text),
          campaign.serviceURL
        );

        // Send the reply email
        console.log(`📧 Responding to ${incomingEmail.senderEmail}`);
        await LeadService.updateLeadById(lead._id, { status: "Replied" });
        await EmailService.SendEmail(incomingEmail.senderEmail, incomingEmail.subject, replyTemplate.emailBody);
      } else if (shouldEscalate) {
        // If we should escalate to a human, send a slack message to the appropriate channel
        // Insert your slack notification logic here
      }

      return res.status(200).end();

    } catch (error) {
      console.log("Error in email-received webhook", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).end('Method Not Allowed');
  }
}
