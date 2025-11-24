import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus } from "lucide-react";
import ProductList from "@/adminComponents/ProductList";
import ProductForm from "@/adminComponents/ProductForm";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("goldfield");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentBrand, setCurrentBrand] = useState("Goldfield");
  const [productCounts, setProductCounts] = useState({
    goldfield: 0,
    jeevandeep: 0,
  });
  const [refreshKey, setRefreshKey] = useState(0);

  if (!localStorage.getItem("token")) {
    navigate("/login");
  }

  const handleLogout = () => {
    // localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const openAddForm = (brand: string) => {
    setCurrentBrand(brand);
    setEditingProduct(null);
    setIsFormOpen(true);
    setActiveTab(brand.toLowerCase().replace(" ", ""));
  };

  const updateProductCounts = (brand: string, count: number) => {
    const key = brand.toLowerCase().replace(" ", "");
    setProductCounts((prev) => ({
      ...prev,
      [key]: count,
    }));
  };

  const handleFormSubmitSuccess = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Product Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => navigate("/admin/data-management")}
                variant="outline"
                size="sm"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                <span className="hidden md:inline">Data Management</span>
                <span className="md:hidden">Data</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-royal-blue-600 text-royal-blue-600 hover:bg-royal-blue-600 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="font-bold text-3xl text-gray-900 mb-2">
            Product Management
          </h2>
          <p className="text-gray-600">
            Manage your Goldfield and Jeevan Deep products
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow text-center min-w-[120px]">
              <h3 className="font-medium text-gray-500">Goldfield</h3>
              <p className="text-2xl font-bold text-royal-blue-600">
                {productCounts.goldfield}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center min-w-[120px]">
              <h3 className="font-medium text-gray-500">Jeevan Deep</h3>
              <p className="text-2xl font-bold text-bright-red-600">
                {productCounts.jeevandeep}
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger
              value="goldfield"
              className="font-medium data-[state=active]:bg-royal-blue-600 data-[state=active]:text-white"
            >
              Goldfield ({productCounts.goldfield})
            </TabsTrigger>
            <TabsTrigger
              value="jeevandeep"
              className="font-medium data-[state=active]:bg-bright-red-600 data-[state=active]:text-white"
            >
              Jeevan Deep ({productCounts.jeevandeep})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="goldfield">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl text-royal-blue-800">
                Goldfield Products
              </h3>
              <Button
                onClick={() => openAddForm("Goldfield")}
                className="bg-royal-blue-600 hover:bg-royal-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            <ProductList
              key={`goldfield-${refreshKey}`}
              brand="Goldfield"
              onEdit={(product) => {
                setEditingProduct(product);
                setIsFormOpen(true);
              }}
              onCountUpdate={(count) => updateProductCounts("Goldfield", count)}
            />
          </TabsContent>

          <TabsContent value="jeevandeep">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-xl text-bright-red-800">
                Jeevan Deep Products
              </h3>
              <Button
                onClick={() => openAddForm("Jeevan Deep")}
                className="bg-bright-red-600 hover:bg-bright-red-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            <ProductList
              key={`jeevandeep-${refreshKey}`}
              brand="Jeevan Deep"
              onEdit={(product) => {
                setEditingProduct(product);
                setIsFormOpen(true);
              }}
              onCountUpdate={(count) => updateProductCounts("Jeevan Deep", count)}
            />
          </TabsContent>
        </Tabs>

        {isFormOpen && (
          <ProductForm
            product={editingProduct}
            brand={currentBrand}
            onSubmit={handleFormSubmitSuccess}
            onClose={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
