# Data Import/Export Feature - User Guide

## Overview
यह feature admin को MongoDB database से products को Excel format में export करने और Excel file से products को import करने की सुविधा देता है।

## Features

### 1. **Export to Excel**
- सभी products को MongoDB से Excel file में download करें
- Excel file में सभी product details शामिल होंगे:
  - Model Name
  - Brand
  - MRP
  - Selling Price
  - Warranty
  - Description
  - Features (semicolon separated)
  - Photo URLs (semicolon separated)
  - Created Date

### 2. **Import from Excel**
- Excel file upload करके सभी products को MongoDB में import करें
- **⚠️ Warning**: Import करने पर सभी existing products DELETE हो जाएंगे और Excel file के data से replace हो जाएंगे

### 3. **Statistics Dashboard**
- Total Products count
- GoldField Products count
- Jeevan Deep Products count

## How to Use

### Export करने के लिए:
1. Admin panel में login करें
2. Dashboard से "Data Management" button पर click करें
3. "Export to Excel" section में "Export to Excel" button पर click करें
4. Excel file automatically download हो जाएगी

### Import करने के लिए:
1. Admin panel में login करें
2. Dashboard से "Data Management" button पर click करें
3. "Import Data from Excel" section में:
   - "Click to select Excel file" पर click करें
   - अपनी Excel file select करें
   - "Import and Replace All Data" button पर click करें
   - Confirmation dialog में "OK" करें

## Excel File Format

Excel file में निम्नलिखित columns होने चाहिए:

| Column Name | Description | Example |
|------------|-------------|---------|
| Model Name | Product का model name | "GF-100" |
| Brand | Product की brand | "Goldfield" या "Jeevan Deep" |
| MRP | Maximum Retail Price | 5000 |
| Selling Price | Actual selling price | 4500 |
| Warranty | Warranty period | "1 Year" |
| Description | Product description | "High precision weighing scale" |
| Features | Features (semicolon separated) | "Digital display; Auto calibration; Battery backup" |
| Photos | Photo URLs (semicolon separated) | "url1.jpg; url2.jpg; url3.jpg" |

### Important Notes:
- Features और Photos को semicolon (;) से separate करें
- Excel file .xlsx या .xls format में होनी चाहिए
- Export की गई file को template के रूप में use कर सकते हैं

## API Endpoints

### Backend Routes:
- **GET** `/api/data/export` - Export all products to Excel
- **POST** `/api/data/import` - Import products from Excel file
- **GET** `/api/data/stats` - Get product statistics

## Technical Details

### Backend Dependencies:
- `xlsx` - Excel file reading/writing
- `multer` - File upload handling

### Frontend Dependencies:
- `axios` - HTTP requests
- React Router - Navigation
- Lucide React - Icons

## Access
- URL: `http://localhost:5173/admin/data-management`
- Login required: Yes
- Admin credentials needed

## Safety Features
- Confirmation dialog before importing
- File type validation (only .xlsx and .xls)
- File size limit: 10MB
- Success/Error messages
- Statistics refresh after import

## Troubleshooting

### Import नहीं हो रहा है:
- Check करें कि Excel file में सभी required columns हैं
- File format .xlsx या .xls है
- File size 10MB से कम है

### Export नहीं हो रहा है:
- Check करें कि database में products हैं
- Backend server running है
- Network connection ठीक है
