
import express from 'express';
import { adminLogin, registerAdmin, changePassword } from '../Controller/adminAuthController.js';

const adminAuth = express.Router();

adminAuth.post('/register', registerAdmin);
adminAuth.post('/login' , adminLogin);
adminAuth.post('/change-password', changePassword);


export default adminAuth;