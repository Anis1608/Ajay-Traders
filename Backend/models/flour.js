import mongoose from "mongoose";

const flourSchema = new mongoose.Schema({
    photo:{
        type: [String],
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    brand: {
        type: String,
        default: "Jeevan Deep",
    },
    mrp: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    moterCapacity: {
        type: String,
        required: true,
        enum: ["1 HP", "2 HP", "3 HP", "5 HP"],
        default: "1 HP",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    });

const Flour = mongoose.model("FlourMill", flourSchema);
export default Flour;