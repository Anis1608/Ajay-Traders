import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Product {
  _id: string;
  modelname: string;
  photo: string[];
  brand: string;
  mrp: number;
  warranty: string;
  sellingPrice: number;
  features: string[];
  description: string;
}

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    resetTimer();
  };
  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    resetTimer();
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (images.length > 1) {
      timerRef.current = setTimeout(() => {
        goToNext();
      }, 5000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span>No Image Available</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 overflow-hidden group">
      {/* Main Image */}
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        className="w-full h-full object-contain mx-auto" // Changed to object-contain and mx-auto
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-black w-4" : "bg-black/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
const Products = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [goldFeildProducts, setGoldFeildProducts] = useState<Product[]>([]);
  const [jeevanDeepProducts, setJeevanDeepProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [goldfieldRes, jeevandeepRes] = await Promise.all([
        axios.get<Product[]>(
          `${API_BASE_URL}/api/weightscales/get?brand=Goldfield`
        ),
        axios.get<Product[]>(
          `${API_BASE_URL}/api/weightscales/get?brand=Jeevan%20Deep`
        ),
      ]);

      setGoldFeildProducts(
        Array.isArray(goldfieldRes?.data) ? goldfieldRes.data : []
      );
      setJeevanDeepProducts(
        Array.isArray(jeevandeepRes?.data) ? jeevandeepRes.data : []
      );
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error fetching products:", err);
      setGoldFeildProducts([]);
      setJeevanDeepProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscountPercentage = (mrp: number, sellingPrice: number) => {
    if (mrp <= 0 || sellingPrice >= mrp) return 0;
    return Math.round(((mrp - sellingPrice) / mrp) * 100);
  };

  // Filter products based on search query
  const filterProducts = (products: Product[]) => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter((product) => {
      const modelMatch = product.modelname.toLowerCase().includes(query);
      const descMatch = product.description.toLowerCase().includes(query);
      const featureMatch = product.features.some((feature) =>
        feature.toLowerCase().includes(query)
      );
      const brandMatch = product.brand.toLowerCase().includes(query);
      
      return modelMatch || descMatch || featureMatch || brandMatch;
    });
  };

  const filteredGoldFeildProducts = filterProducts(goldFeildProducts);
  const filteredJeevanDeepProducts = filterProducts(jeevanDeepProducts);

  const ProductCard = ({
    product,
    category,
  }: {
    product: Product;
    category: string;
  }) => (
    <motion.div
      variants={itemVariants}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative overflow-hidden">
          <ImageSlider images={product.photo || []} />

          <Badge
            className={`absolute top-2 left-2 ${
              category === "GoldField" ? "bg-primary" : "bg-secondary"
            }`}
          >
            {category}
          </Badge>
          {product.mrp > product.sellingPrice && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {calculateDiscountPercentage(product.mrp, product.sellingPrice)}%
              OFF
            </Badge>
          )}
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {product.modelname}
          </CardTitle>
          <CardDescription className="space-x-2">
            <span className="text-2xl font-bold text-primary pd-0">
              {formatPrice(product.sellingPrice)}
            </span>
            {product.mrp > product.sellingPrice && (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <h4 className="font-semibold text-sm mb-1">Features:</h4>
          <ul className="space-y-1 mb-3">
            {product.features?.map((feature: string, index: number) => (
              <li
                key={index}
                className="text-sm text-gray-600 flex items-center"
              >
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="p-1 mb-3 text-sm bg-gradient-yellow-50 rounded text-gradient-yellow-800">
            🛡️ {product.warranty} Warranty
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 gradient-primary text-white hover:scale-105 transition-transform"
            >
              <Phone className="w-4 h-4 mr-1" />
              <a href={`tel:+919889974041`}>Call for Details</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
            <Button onClick={fetchProducts}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-primary to-secondary py-20 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 0.9 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover our comprehensive range of high-quality weighing scales and
            flour mills.
          </motion.p>
        </div>
      </motion.section>

      {/* Search Section */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, brand, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-gray-700 placeholder-gray-400 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="mt-3 text-sm text-gray-600 text-center">
                Found {filteredGoldFeildProducts.length + filteredJeevanDeepProducts.length} product(s) matching "{searchQuery}"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Tabs defaultValue="all" className="w-full">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                viewport={{ once: true, margin: "-100px" }}
                animate={isMounted ? "visible" : "hidden"}
              >
                <TabsList className="grid w-full grid-cols-3 mb-12">
                  <TabsTrigger value="all">All Products</TabsTrigger>
                  <TabsTrigger value="goldfeild">GoldField Scales</TabsTrigger>
                  <TabsTrigger value="jeevandeep">Jeevan Deep</TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="all" className="space-y-16">
                {/* Gold Feild Products */}
                {filteredGoldFeildProducts.length > 0 && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isMounted ? "visible" : "hidden"}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <motion.div
                      variants={fadeInUp}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="flex items-center mb-8">
                        <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-xl">
                            ⚖️
                          </span>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">
                            GoldField - Electronic Weighing Scales
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Precision weighing solutions for all your business
                            needs
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredGoldFeildProducts.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          category="GoldField"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Jeevan Deep Products */}
                {filteredJeevanDeepProducts.length > 0 && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isMounted ? "visible" : "hidden"}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <motion.div
                      variants={fadeInUp}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <div className="flex items-center mb-8">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-xl">
                            🌾
                          </span>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">
                            Jeevan Deep - Flour Mills
                          </h2>
                          <p className="text-gray-600 mt-1">
                            Quality appliances for your kitchen
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredJeevanDeepProducts.map((product) => (
                        <ProductCard
                          key={product._id}
                          product={product}
                          category="Jeevan Deep"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="goldfeild">
                {filteredGoldFeildProducts.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isMounted ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {filteredGoldFeildProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        category="GoldField"
                      />
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery ? `No GoldField products match "${searchQuery}"` : "No GoldField products found"}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="jeevandeep">
                {filteredJeevanDeepProducts.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isMounted ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {filteredJeevanDeepProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        category="Jeevan Deep"
                      />
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      {searchQuery ? `No Jeevan Deep products match "${searchQuery}"` : "No Jeevan Deep products found"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={isMounted ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            Need Help Choosing?
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            Our experts are here to help you find the perfect product for your
            needs
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ delay: 1.1 }}
          >
            <Button
              size="lg"
              className="gradient-primary text-white hover:scale-105 transition-transform"
            >
              <a href="tel:+919889974041">Call: 9889974041</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              <a
                href="https://wa.me/919889974041"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Chat
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Products;
