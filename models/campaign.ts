// models/Campaign.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { LeadI } from './lead';

export interface CampaignI extends Document {
  name: string;
  leads: Partial<LeadI>[];
  maxDailyEmailsToSend: number;
  isActive: boolean;
  productDescription: string;
  emailTemplate: string;
  serviceURL: string;
}

const CampaignSchema: Schema = new Schema({
  name: { type: String, required: true },
  leads: { type: [Schema.Types.ObjectId], ref: 'Lead', required: false },
  maxDailyEmailsToSend: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
  productDescription: { type: String, required: true },
  emailTemplate: { type: String, required: true },
  serviceURL: { type: String, required: true },
});

export default mongoose.models.Campaign || mongoose.model<CampaignI>('Campaign', CampaignSchema);
