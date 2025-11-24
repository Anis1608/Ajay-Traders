import WeightScale from "../models/weightScale.js";


export const addWeightScale = async (req, res) => {
    const { modelname, photo , brand, battery, mrp, sellingPrice, capacity, warranty, description  , features} = req.body;
  try {
    if (!modelname || !photo || !battery || !mrp || !sellingPrice || !capacity || !warranty || !description  ,!features) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const weightScale = new WeightScale({
      modelname,
      photo,
      brand: brand || "Goldfield",
      battery,
      mrp,
      sellingPrice,
      capacity,
      warranty, 
      description,
      features,
      timestamp: new Date(),
    });
    await weightScale.save();
    res.status(201).json({ message: "Weight Scale added successfully", weightScale });
  } catch (error) {
    res.status(400).json({ message: "Error adding Weight Scale", error: error.message });
  }
}


export const getWeightScales = async (req, res) => {
  const { brand } = req.query;
  try {
  const query = brand ? { brand } : {};
  // Sort by timestamp in descending order (newest first)
  const products = await WeightScale.find(query).sort({ timestamp: -1 });
  res.json(products);
  } catch (error) {
    res.status(400).json({ message: "Error fetching Weight Scales", error: error.message });
  }
}

export const deleteWeightScale = async (req, res) => {
  const { id } = req.params;
  try {
    const weightScale = await WeightScale.findByIdAndDelete(id);
    if (!weightScale) {
      return res.status(404).json({ message: "Weight Scale not found" });
    }
    res.status(200).json({ message: "Weight Scale deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting Weight Scale", error: error.message });
  }
}


export const updateWeightScale = async (req, res) => {
  const { id } = req.params;
  const { modelname, photo , brand, battery, mrp, sellingPrice, capacity, warranty, description , features } = req.body;
  try {
    const weightScale = await WeightScale.findByIdAndUpdate(id, {
      modelname,
      photo,
      brand: brand || "Goldfield",
      battery,
      mrp,
      sellingPrice,
      capacity,
      warranty,
      description,
      features,
      timestamp: new Date(),
    }, { new: true });
    
    if (!weightScale) {
      return res.status(404).json({ message: "Weight Scale not found" });
    }
    
    res.status(200).json({ message: "Weight Scale updated successfully", weightScale });
  } catch (error) {
    res.status(400).json({ message: "Error updating Weight Scale", error: error.message });
  }
}