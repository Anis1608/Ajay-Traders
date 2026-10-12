import express from 'express';
import https from 'https';
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

// Health check endpoint for Kubernetes liveness & readiness probes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'ajay-traders-backend', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
