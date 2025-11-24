import express from 'express';
import { adminLogin, registerAdmin } from '../Controller/adminAuthController.js';
// import {authMiddleware} from '../middleware/authMiddleware.js';

const adminAuth = express.Router();

adminAuth.post('/register', registerAdmin);
adminAuth.post('/login' , adminLogin);


export default adminAuth;