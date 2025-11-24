
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/adminComponents/Navbar';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveTab(category);
    }
  }, [searchParams]);

  // Mock product data - replace with actual data later
  const weighingScales = [
    {
      id: 1,
      name: "Digital Platform Scale DS-30",
      brand: "Gold Feild",
      mrp: 15000,
      sellingPrice: 12500,
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop"
      ],
      description: "High precision digital platform scale with 30kg capacity. Features stainless steel platform and digital LED display.",
      warranty: "2 years manufacturer warranty",
      features: ["30kg capacity", "Digital LED display", "Stainless steel platform", "Battery backup"]
    },
    {
      id: 2,
      name: "Electronic Trolley Scale TS-100",
      brand: "Gold Feild",
      mrp: 25000,
      sellingPrice: 22000,
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop"
      ],
      description: "Mobile trolley with built-in electronic weighing system. Perfect for markets and warehouses.",
      warranty: "2 years manufacturer warranty",
      features: ["100kg capacity", "Mobile trolley design", "Digital display", "Rechargeable battery"]
    }
  ];

  const flourMills = [
    {
      id: 3,
      name: "Domestic Atta Chakki JD-2HP",
      brand: "Jeevan Deep",
      mrp: 18000,
      sellingPrice: 15500,
      images: [
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop"
      ],
      description: "High-quality domestic flour mill for fresh atta at home. Compact design with powerful motor.",
      warranty: "3 years motor warranty, 1 year parts warranty",
      features: ["2HP motor", "Compact design", "Easy to clean", "Low noise operation"]
    },
    {
      id: 4,
      name: "Water Purifier RO+UV WP-12L",
      brand: "Jeevan Deep",
      mrp: 12000,
      sellingPrice: 9500,
      images: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop"
      ],
      description: "Advanced RO+UV water purifier with 12L storage capacity. Ensures pure and safe drinking water.",
      warranty: "1 year comprehensive warranty + 3 years AMC",
      features: ["RO+UV technology", "12L storage", "Auto shut-off", "TDS controller"]
    }
  ];

  const allProducts = [...weighingScales, ...flourMills];

  const getProductsByCategory = () => {
    switch (activeTab) {
      case 'goldfeild':
        return weighingScales;
      case 'jeevandeep':
        return flourMills;
      default:
        return allProducts;
    }
  };

  const ProductCard = ({ product }: { product: any }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

    return (
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          
          {/* Image Navigation */}
          {product.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <Badge className="absolute top-3 right-3 bg-bright-red-600 hover:bg-bright-red-700 text-white font-semibold">
              {discount}% OFF
            </Badge>
          )}

          {/* Brand Badge */}
          <Badge 
            className={`absolute top-3 left-3 text-white font-semibold ${
              product.brand === 'Gold Feild' 
                ? 'bg-royal-blue-600 hover:bg-royal-blue-700' 
                : 'bg-bright-red-600 hover:bg-bright-red-700'
            }`}
          >
            {product.brand}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="font-poppins text-lg text-royal-blue-800">
            {product.name}
          </CardTitle>
          <CardDescription className="font-inter text-sm">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Pricing */}
          <div className="flex items-center space-x-3">
            <span className="font-poppins font-bold text-2xl text-green-600">
              ₹{product.sellingPrice.toLocaleString()}
            </span>
            <span className="font-inter text-gray-500 line-through">
              ₹{product.mrp.toLocaleString()}
            </span>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <h4 className="font-poppins font-semibold text-sm text-royal-blue-800">Key Features:</h4>
            <ul className="font-inter text-sm text-gray-600 space-y-1">
              {product.features.slice(0, 3).map((feature: string, index: number) => (
                <li key={index}>• {feature}</li>
              ))}
            </ul>
          </div>

          {/* Warranty */}
          <div className="p-3 bg-gradient-yellow-50 border border-gradient-yellow-200 rounded-lg">
            <p className="font-inter text-xs text-gradient-yellow-800">
              🛡️ {product.warranty}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a href="tel:+919889974041">
              <Button 
                variant="outline" 
                className="w-full border-royal-blue-600 text-royal-blue-600 hover:bg-royal-blue-600 hover:text-white transition-colors duration-300"
              >
                📞 Call
              </Button>
            </a>
            <a href="https://wa.me/919889974041" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300">
                💬 WhatsApp
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-royal-blue-600 to-bright-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-poppins font-bold text-4xl lg:text-5xl mb-4">
              Our Products
            </h1>
            <p className="font-inter text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              Discover our premium range of weighing scales and flour mills designed for accuracy, durability, and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-white shadow-lg border-0">
              <TabsTrigger 
                value="all" 
                className="font-inter font-medium data-[state=active]:bg-royal-blue-600 data-[state=active]:text-white"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger 
                value="goldfeild" 
                className="font-inter font-medium data-[state=active]:bg-royal-blue-600 data-[state=active]:text-white"
              >
                Gold Feild
              </TabsTrigger>
              <TabsTrigger 
                value="jeevandeep" 
                className="font-inter font-medium data-[state=active]:bg-bright-red-600 data-[state=active]:text-white"
              >
                Jeevan Deep
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getProductsByCategory().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {getProductsByCategory().length === 0 && (
                <div className="text-center py-16">
                  <h3 className="font-poppins font-semibold text-xl text-gray-600 mb-4">
                    No products found in this category
                  </h3>
                  <p className="font-inter text-gray-500">
                    Check back soon for new products or contact us for specific requirements.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-3xl text-royal-blue-800 mb-4">
            Need Custom Solutions?
          </h2>
          <p className="font-inter text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us for custom weighing solutions or bulk orders. We provide personalized service for all your business needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919889974041">
              <Button 
                size="lg" 
                className="bg-royal-blue-600 hover:bg-royal-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                📞 Call: 9889974041
              </Button>
            </a>
            
            <a href="mailto:ajaytred34@gmail.com">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-royal-blue-600 text-royal-blue-600 hover:bg-royal-blue-600 hover:text-white font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
              >
                ✉️ Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
