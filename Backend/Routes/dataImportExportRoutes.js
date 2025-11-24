import express from 'express';
import multer from 'multer';
import { 
  exportToExcel, 
  importFromExcel, 
  getImportExportStats 
} from '../Controller/dataImportExportController.js';

const router = express.Router();

// Configure multer for file upload (store in memory)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only Excel files
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Only Excel files are allowed!'), false);
    }
  }
});

// Routes
router.get('/export', exportToExcel);
router.post('/import', upload.single('file'), importFromExcel);
router.get('/stats', getImportExportStats);

export default router;
