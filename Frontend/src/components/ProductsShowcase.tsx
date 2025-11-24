import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, ChevronLeft, ChevronRight, Bold } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from "axios";

const ProductCard = ({ product, category }: { product: any, category: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = product.photo || [];

  // Auto slide images continuously (not just on hover)
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={product.modelname}
              className="w-full h-full object-contain transition-all duration-500"
               style={{ height: '300px' }} 
            />
            
            {/* Navigation arrows (only show on hover) */}
            {images.length > 1 && isHovered && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-all z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-all z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image Available
          </div>
        )}
        
        <Badge className={`absolute top-2 left-2 z-10 ${category === 'Gold Feild' ? 'bg-primary' : 'bg-secondary'}`}>
          {category}
        </Badge>
        
        {/* Image indicators (always visible when multiple images) */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, index) => (
              <button 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-grow p-4 flex flex-col">
        <CardHeader className="p-0 pb-2">
          <CardTitle className="text-lg">{product.modelname}</CardTitle>
          <CardDescription className="flex flex-col pt-1">
            <span className="text-lg font-bold text-primary">₹{product.sellingPrice}</span>
            {product.mrp && product.mrp !== product.sellingPrice && (
              <span className="text-sm line-through text-gray-500">₹{product.mrp}</span>
            )}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0 flex-grow flex flex-col">
          {product.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
          )}

       <h4 className="font-semibold text-sm mb-1">Features:</h4>
          
          {product.features?.length > 0 && (
            <ul className="space-y-1 mb-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">• {feature}</li>
              ))}
            </ul>
          )}
           <div className="p-1 mb-3 text-sm bg-gradient-yellow-50 rounded text-gradient-yellow-800">
                      🛡️ {product.warranty} Warranty
                    </div>
          
          <Button size="sm" className="w-full gradient-primary text-white mt-auto">
            <Phone className="w-4 h-4 mr-1" />
            <a href="tel:+919889974041">  Call for Details  </a>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

const ProductsShowcase = () => {
  const [goldFeild, setGoldFeild] = useState<any[]>([]);
  const [jeevanDeep, setJeevanDeep] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [goldRes, jeevanRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/weightscales/get?brand=Goldfield`),
          axios.get(`${API_BASE_URL}/api/weightscales/get?brand=Jeevan%20Deep`)
        ]);

        setGoldFeild(goldRes.data.slice(0, 3));
        setJeevanDeep(jeevanRes.data.slice(0, 3));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow h-[400px]"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our{" "}
            <span className="text-white gradient-primary bg-clip-text text-transparent px-3 py-1 rounded-xl inline-block">
              Product Range
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of weighing scales and flour mills, 
            designed to meet all your business and domestic needs.
          </p>
        </div>

        {/* Gold Feild Section */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">⚖️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Gold Feild - Electronic Weighing Scales</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goldFeild.map((product, index) => (
              <div 
                key={product._id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} category="Gold Feild" />
              </div>
            ))}
          </div>
        </div>

        {/* Jeevan Deep Section */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold">🌾</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Jeevan Deep - Flour Mills & Water Purifiers</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jeevanDeep.map((product, index) => (
              <div 
                key={product._id} 
                className="animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} category="Jeevan Deep" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="gradient-primary text-white hover:scale-105 transition-transform">
            <Link to="/products" className="flex items-center justify-center w-full h-full">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;