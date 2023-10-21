// models/verificationToken.js

import mongoose from 'mongoose';

const verificationTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  email: { type: String, required: true },
  expires: { type: Date, required: true }
});

export default mongoose.models.VerificationToken || mongoose.model("VerificationToken", verificationTokenSchema);