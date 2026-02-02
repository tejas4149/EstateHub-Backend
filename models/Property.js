import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    city: String,
    location: String,
    type: String,
    bhk: Number,
    purpose: { type: String, enum: ["rent", "sale"] },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
