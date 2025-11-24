import mongoose from "mongoose";

const weightScaleSchema = new mongoose.Schema({
  modelname: {
    type: String,
    required: true,
  },
  photo:{
    type: [String],
    required: true,
  } , 
  brand: {
    type: String,
    default: "Goldfield",
  },
  battery: {
    type: String,
    enum: ["No Battery", "Rechargeable Battery", "Non-Rechargeable Battery"],
  },
  mrp: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
  },
  warranty: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features:{
    type: [String],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const WeightScale = mongoose.model("WeightScale", weightScaleSchema);
export default WeightScale;
