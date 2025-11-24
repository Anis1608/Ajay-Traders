import express from 'express';
import { fromSubmit } from '../Controller/formSubmitController.js';
const fromSubmitroute = express.Router();
fromSubmitroute.post('/contact', fromSubmit);
export default fromSubmitroute;
