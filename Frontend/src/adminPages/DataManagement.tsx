import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Upload,
  Database,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Loader2,
  TrendingUp,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Stats {
  totalProducts: number;
  goldfieldCount: number;
  jeevanDeepCount: number;
  lastUpdated: string;
}

const DataManagement = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/data/stats`);
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setMessage(null);

      const response = await axios.get(`${API_BASE_URL}/api/data/export`, {
        responseType: "blob",
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `products_export_${new Date().getTime()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage({
        type: "success",
        text: "Data exported successfully! File downloaded.",
      });
    } catch (error: any) {
      console.error("Error exporting data:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to export data",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        setSelectedFile(file);
        setMessage(null);
      } else {
        setMessage({
          type: "error",
          text: "Please select a valid Excel file (.xlsx or .xls)",
        });
        setSelectedFile(null);
      }
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setMessage({
        type: "error",
        text: "Please select a file first",
      });
      return;
    }

    // Confirmation dialog
    const confirmed = window.confirm(
      "⚠️ WARNING: This will DELETE all existing products and replace them with data from the Excel file. Are you sure you want to continue?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsImporting(true);
      setMessage(null);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${API_BASE_URL}/api/data/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: response.data.message,
        });
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById(
          "file-upload"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        // Refresh stats
        fetchStats();
      }
    } catch (error: any) {
      console.error("Error importing data:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to import data",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-royal-blue-600 to-bright-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">AT</span>
              </div>
              <div>
                <h1 className="font-bold text-base sm:text-xl text-royal-blue-800">
                  Ajay Traders
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Data Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => navigate("/admin/dashboard")}
                variant="outline"
                size="sm"
                className="border-royal-blue-600 text-royal-blue-600 hover:bg-royal-blue-600 hover:text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Dashboard</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Data Management
          </h1>
          <p className="text-gray-600">
            Import and export product data between MongoDB and Excel
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-900 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Total Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">
                {stats?.totalProducts || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                GoldField Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {stats?.goldfieldCount || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Jeevan Deep Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">
                {stats?.jeevanDeepCount || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert
            className={`mb-6 ${
              message.type === "success"
                ? "bg-green-50 border-green-200"
                : message.type === "error"
                ? "bg-red-50 border-red-200"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={
                message.type === "success" ? "text-green-800" : "text-red-800"
              }
            >
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Export Section */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Data to Excel
            </CardTitle>
            <CardDescription className="text-blue-100">
              Download all products from MongoDB as an Excel file
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">
                  This will export all products including:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Model names, brands, and prices</li>
                  <li>• Features and descriptions</li>
                  <li>• Photo URLs and warranty information</li>
                </ul>
              </div>
              <Button
                onClick={handleExport}
                disabled={isExporting || stats?.totalProducts === 0}
                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[160px]"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export to Excel
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Import Section */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import Data from Excel
            </CardTitle>
            <CardDescription className="text-orange-100">
              Upload an Excel file to replace all existing products in MongoDB
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Warning */}
              <Alert className="bg-orange-50 border-orange-200">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Warning:</strong> Importing will DELETE all existing
                  products and replace them with data from the Excel file. This
                  action cannot be undone!
                </AlertDescription>
              </Alert>

              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <FileSpreadsheet className="w-12 h-12 text-gray-400 mb-3" />
                  <span className="text-sm font-medium text-gray-700 mb-1">
                    Click to select Excel file
                  </span>
                  <span className="text-xs text-gray-500">
                    Supports .xlsx and .xls files
                  </span>
                </label>
              </div>

              {/* Selected File */}
              {selectedFile && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => setSelectedFile(null)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}

              {/* Import Button */}
              <Button
                onClick={handleImport}
                disabled={!selectedFile || isImporting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                size="lg"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Import and Replace All Data
                  </>
                )}
              </Button>

              {/* Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm">
                  Excel File Format Requirements:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1 ml-4">
                  <li>• Column headers: Model Name, Brand, MRP, Selling Price, Warranty, Description, Features, Photos</li>
                  <li>• Features should be separated by semicolons (;)</li>
                  <li>• Photo URLs should be separated by semicolons (;)</li>
                  <li>• Use the exported Excel file as a template</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataManagement;
