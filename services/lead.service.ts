// services/lead.service.ts
import Campaign, { CampaignI } from "../models/campaign";
import Email, { EmailI } from "../models/email";
import Lead, { LeadI } from "../models/lead";
import { getFirstEmail } from "../pages/api/get_first_email";
import * as EmailService from "./email.service";

// // Validate email address.
export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Lead services
export async function createLead(leadData: LeadI): Promise<LeadI> {
  // Check if email address already exists.

  // if (!validateEmail(leadData.emailAddress)) throw new Error('Invalid email address');
  const existingLead = await Lead.findOne({ emailAddress: leadData.emailAddress });
  // if (existingLead) return existingLead;
  // Delete existing leads and emails for the leads.
  if (existingLead) {
    await deleteLeadById(existingLead._id);
    await deleteEmailsForLead(existingLead._id);
  }

  const lead = new Lead(leadData);
  return lead.save();
}

export async function createLeads(leadsData: LeadI[]): Promise<LeadI[]> {
  const leads = await Promise.all(leadsData.map(async (leadData) => {
    return createLead(leadData);
  }));
  return leads;
}

export async function getLeads(): Promise<LeadI[]> {
  return Lead.find();
}

export async function getLeadById(id: string): Promise<LeadI | null> {
  return Lead.findById(id);
}

export async function updateLeadById(id: string, updateData: Partial<LeadI>): Promise<LeadI | null> {
  return Lead.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteLeadById(id: string): Promise<LeadI | null> {
  return Lead.findByIdAndDelete(id);
}

// Campaign services
export async function createCampaign(campaignData: CampaignI): Promise<CampaignI> {
  const campaign = new Campaign(campaignData);
  return campaign.save();
}

export async function getCampaigns(): Promise<CampaignI[]> {
  return Campaign.find();
}

export async function getCampaignById(id: string): Promise<CampaignI | null> {
  return Campaign.findById(id);
}

export async function updateCampaignById(id: string, updateData: Partial<CampaignI>): Promise<CampaignI | null> {
  return Campaign.findByIdAndUpdate(id, updateData, { new: true });
}

// Add leads to campaign.
export async function addLeadsToCampaign(campaignId: string, leadIds: string[]): Promise<CampaignI | null> {
  // Get campaign.
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) throw new Error(`Campaign ${campaignId} not found`);

  // Add leads to campaign.
  campaign.leads.push(...leadIds);
  await campaign.save();

  return campaign;
}

export async function deleteCampaignById(id: string): Promise<CampaignI | null> {
  return Campaign.findByIdAndDelete(id);
}

export async function startCampaignById(id: string): Promise<CampaignI | null> {
  // Placeholder: Insert logic to start campaign here.
  // For now, just setting the isActive field to true.
  return Campaign.findByIdAndUpdate(id, { isActive: true }, { new: true });
}


export async function getLeadByEmail(email: string): Promise<LeadI | null> {
  return Lead.findOne({ emailAddress: email });
}

// Start Campaign, send first email.
export async function startCampaign(campaignId: string): Promise<CampaignI | null> {
  // Get all leads for this campaign.
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) throw new Error(`Campaign ${campaignId} not found`);

  // Send first email to each lead and update the lead's conversation and state.
  const leads = await Lead.find({ _id: { $in: campaign.leads } });

  const PromiseArray = leads.map(async (lead: LeadI) => {
    const template = await getFirstEmail(lead.name, lead.companyName, campaign.productDescription, lead.website, campaign.emailTemplate);
    await EmailService.SendEmail(lead.emailAddress, template.emailSubject, template.emailBody);
    
    const email: EmailI = {
      lead: lead._id,
      senderName: "Isaiah",
      senderEmail: "isaiah@warmemailleads.com",
      recipientName: lead.name,
      recipientEmail: lead.emailAddress,
      subject: template.emailSubject,
      text: template.emailBody,
    };

    await createEmail(email);

    await Lead.findByIdAndUpdate(lead._id, {
      status: "Sent",
    }, { new: true });
  });

  await Promise.all(PromiseArray);

  campaign.isActive = true;
  await campaign.save();

  return campaign;
}

export async function createEmail(email: EmailI): Promise<EmailI> {
  return await Email.create(email); 
}

export async function getEmails(): Promise<EmailI[]> {
  return Email.find();
}

export async function getEmailsForLead(leadId: string): Promise<EmailI[]> {
  return Email.find({ lead: leadId });
}

// Get Campaign from Lead.
export async function getCampaignForLead(leadId: string): Promise<CampaignI | null> {
  return Campaign.findOne({ leads: leadId });
}

// Delete all emails for a lead.
export async function deleteEmailsForLead(leadId: string): Promise<void> {
  await Email.deleteMany({ lead: leadId });
} 