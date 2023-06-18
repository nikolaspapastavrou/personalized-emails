// models/Lead.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface EmailI {
  // Sender
  senderName: string;
  senderEmail: string;

  // Recipient - technically there can be multiple but this is beyond the scope of this hackathon.
  recipientName: string;
  recipientEmail: string;
  
  subject: string;
  text: string;
  date: Date;
}

export interface LeadI extends Document {
  name: string;
  emailAddress: string;
  tags: string[];
  status: string;
  conversation: EmailI[];
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  tags: { type: [String], required: false },
  status: { type: String, required: true },
  conversation: { type: [Schema.Types.ObjectId], ref: 'Email', required: false }
});

export default mongoose.models.Lead || mongoose.model<LeadI>('Lead', LeadSchema);