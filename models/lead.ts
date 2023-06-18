// models/Lead.ts
import mongoose, { Document, Schema } from 'mongoose';

export type Status = "Sent" | "Read" | "Replied" | "Bounced" | "Closed" | "No Longer Responding";

export interface LeadI extends Document {
  name: string;
  companyName: string;
  emailAddress: string;
  tags: string[];
  status: Status;
  website: string;
  conversation: mongoose.Types.ObjectId[]; // For referencing Email documents
}

// Update your LeadSchema definition
const LeadSchema: Schema<LeadI> = new Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  tags: { type: [String], required: false },
  website: { type: String, required: false, default: "https://www.example.com" },
  status: { type: String, required: true, default: "Sent"},
}, {
  toJSON: { virtuals: true },  // Add virtuals to toJSON output
  toObject: { virtuals: true } // Add virtuals to toObject output
});

// Add a virtual field `conversation` that's an array of EmailI documents
LeadSchema.virtual('conversation', {
  ref: 'Email', // The model to use
  localField: '_id', // Find emails where `localField`
  foreignField: 'lead' // is equal to `foreignField`
});

// Populate 'conversation' field every time a Lead is queried
LeadSchema.pre<LeadI>('find', function() {
  this.populate('conversation');
});
LeadSchema.pre<LeadI>('findOne', function() {
  this.populate('conversation');
});

export default mongoose.models.Lead || mongoose.model<LeadI>('Lead', LeadSchema);

