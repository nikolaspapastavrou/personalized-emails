// models/Campaign.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { LeadI } from './lead';

export interface CampaignI extends Document {
  _id: string;
  name: string;
  leads: Partial<LeadI>[];
  maxDailyEmailsToSend: number;
  isActive: boolean;
  productDescription: string;
  emailTemplate: string;
  serviceURL: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

const CampaignSchema: Schema = new Schema({
  name: { type: String, required: true },
  leads: { type: [Schema.Types.ObjectId], ref: 'Lead', required: false },
  maxDailyEmailsToSend: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
  productDescription: { type: String, required: true },
  emailTemplate: { type: String, required: true },
  serviceURL: { type: String, required: true },
},
  {
    timestamps: true,
  });


  // Populate 'conversation' field every time a Lead is queried
  CampaignSchema.pre<LeadI>('find', function() {
  this.populate('leads');
});
CampaignSchema.pre<LeadI>('findOne', function() {
  this.populate('leads');
});

export default mongoose.models.Campaign || mongoose.model<CampaignI>('Campaign', CampaignSchema);
