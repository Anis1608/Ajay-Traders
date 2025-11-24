import XLSX from 'xlsx';
import WeightScale from '../models/weightScale.js';

// Export all products to Excel
export const exportToExcel = async (req, res) => {
  try {
    // Fetch all products from MongoDB
    const products = await WeightScale.find({}).lean();

    if (products.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No products found in database' 
      });
    }

    // Transform data for Excel
    const excelData = products.map(product => ({
      'Model Name': product.modelname || '',
      'Brand': product.brand || '',
      'MRP': product.mrp || 0,
      'Selling Price': product.sellingPrice || 0,
      'Warranty': product.warranty || '',
      'Description': product.description || '',
      'Features': Array.isArray(product.features) ? product.features.join('; ') : '',
      'Photos': Array.isArray(product.photo) ? product.photo.join('; ') : '',
      'Created At': product.timestamp ? new Date(product.timestamp).toLocaleString() : '',
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    worksheet['!cols'] = [
      { wch: 25 }, // Model Name
      { wch: 15 }, // Brand
      { wch: 12 }, // MRP
      { wch: 15 }, // Selling Price
      { wch: 15 }, // Warranty
      { wch: 40 }, // Description
      { wch: 50 }, // Features
      { wch: 50 }, // Photos
      { wch: 20 }, // Created At
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=products_${Date.now()}.xlsx`);

    res.send(excelBuffer);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to export data to Excel',
      error: error.message 
    });
  }
};

// Import products from Excel and replace all existing data
export const importFromExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Read the uploaded Excel file
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Excel file is empty' 
      });
    }

    // Transform Excel data to MongoDB format
    const productsToImport = jsonData.map(row => ({
      modelname: row['Model Name'] || '',
      brand: row['Brand'] || '',
      mrp: parseFloat(row['MRP']) || 0,
      sellingPrice: parseFloat(row['Selling Price']) || 0,
      warranty: row['Warranty'] || '',
      description: row['Description'] || '',
      features: row['Features'] ? row['Features'].split(';').map(f => f.trim()).filter(f => f) : [],
      photo: row['Photos'] ? row['Photos'].split(';').map(p => p.trim()).filter(p => p) : [],
    }));

    // Delete all existing products
    const deleteResult = await WeightScale.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing products`);

    // Insert new products
    const insertedProducts = await WeightScale.insertMany(productsToImport);

    res.status(200).json({ 
      success: true, 
      message: `Successfully imported ${insertedProducts.length} products. Deleted ${deleteResult.deletedCount} old products.`,
      deletedCount: deleteResult.deletedCount,
      importedCount: insertedProducts.length
    });
  } catch (error) {
    console.error('Error importing from Excel:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to import data from Excel',
      error: error.message 
    });
  }
};

// Get import/export statistics
export const getImportExportStats = async (req, res) => {
  try {
    const totalProducts = await WeightScale.countDocuments();
    const goldfieldCount = await WeightScale.countDocuments({ brand: 'Goldfield' });
    const jeevanDeepCount = await WeightScale.countDocuments({ brand: 'Jeevan Deep' });

    res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        goldfieldCount,
        jeevanDeepCount,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get statistics',
      error: error.message 
    });
  }
};
