import express from 'express';
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
  console.log('Server is running on port 3000');
    connectDB();
}
);
