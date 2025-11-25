import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../models/admin.js';

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id).select('-password'); // Exclude password from the admin object
        if (!req.admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token', error: error.message });
    }
}