import express from 'express';
import { getWeightScales, addWeightScale , deleteWeightScale , updateWeightScale } from '../Controller/weightScaleController.js';

const weightscaleroutes = express.Router();

weightscaleroutes.post('/add', addWeightScale);
weightscaleroutes.get('/get',  getWeightScales);
weightscaleroutes.delete('/delete/:id', deleteWeightScale);
weightscaleroutes.put('/update/:id', updateWeightScale);


export default weightscaleroutes;