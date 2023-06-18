// services/lead.service.ts
import Campaign, { CampaignI } from "../models/campaign";
import Lead, { LeadI } from "../models/lead";

// Validate email address.
export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Lead services
export async function createLead(leadData: LeadI): Promise<LeadI> {
  const lead = new Lead(leadData);
  return lead.save();
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

export async function deleteCampaignById(id: string): Promise<CampaignI | null> {
  return Campaign.findByIdAndDelete(id);
}

export async function startCampaignById(id: string): Promise<CampaignI | null> {
  // Placeholder: Insert logic to start campaign here.
  // For now, just setting the isActive field to true.
  return Campaign.findByIdAndUpdate(id, { isActive: true }, { new: true });
}


export async function getLeadByEmail(email: string): Promise<LeadI | null> {
  return Lead.findOne({ email });
}