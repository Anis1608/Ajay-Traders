import express from 'express';
import http from 'http';
import cors from 'cors';
import { connectDB } from './db.js';
import weightscaleroutes from './Routes/weightScaleRoutes.js';
import adminAuth from './Routes/adminAuthRoutes.js';
import fromSubmitroute from './Routes/formSubmitRoutes.js';
import dataImportExportRoutes from './Routes/dataImportExportRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/weightscales', weightscaleroutes);
app.use('/api/admin', adminAuth);
app.use('/api', fromSubmitroute);
app.use('/api/data', dataImportExportRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
  connectDB();

  // Keep-alive function to prevent server sleep
  const keepAlive = () => {
    const url = 'https://ajay-traders-backend.onrender.com/api/weightscales/get';
    http.get(url, (res) => {
      console.log(`Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error(`Keep-alive ping error: ${err.message}`);
    });
  };

  // Ping every 5 minutes (300,000 ms)
  setInterval(keepAlive, 5 * 60 * 1000);
});
