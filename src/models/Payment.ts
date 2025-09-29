import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["one-time"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

// Calculate expiresAt based on plan
paymentSchema.pre("save", function (next) {
  if (this.plan === "one-time") {
    // One-time purchase never expires
    this.expiresAt = new Date("2100-12-31");
  }
  next();
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
