import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
        }
    
        const admin = await Admin.findOne({ email });
        if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
        }
    
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
