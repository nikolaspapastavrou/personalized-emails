import mongoose, { Document, Schema } from 'mongoose';

export interface EmailI {
  lead: mongoose.Types.ObjectId | string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  text: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for EmailI.
const EmailSchema = new Schema<EmailI>({
  lead: { type: Schema.Types.ObjectId, ref: 'Lead' },
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.models.Email || mongoose.model<EmailI>('Email', EmailSchema);


