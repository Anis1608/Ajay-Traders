// src/adminComponents/ProductList.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProductListProps {
  brand: string;
  onEdit: (product: any) => void;
  onCountUpdate?: (count: number) => void;
}

const ProductList = ({ brand, onEdit, onCountUpdate }: ProductListProps) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  // Track current photo index for each product
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState<
    Record<string, number>
  >({});
  // Track auto-slide intervals for each product
  const [intervals, setIntervals] = useState<Record<string, NodeJS.Timeout>>(
    {}
  );
  // Delete confirmation state
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/weightscales/get?brand=${brand}`
      );
      setProducts(response.data);
      // Initialize photo indices
      const indices: Record<string, number> = {};
      response.data.forEach((product: any) => {
        indices[product._id] = 0;
      });
      setCurrentPhotoIndices(indices);
      if (onCountUpdate) {
        onCountUpdate(response.data.length);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      // Clear all intervals on unmount
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [brand]);

  const confirmDelete = (id: string) => {
    setProductToDelete(id);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      await axios.delete(
        `${API_BASE_URL}/api/weightscales/delete/${productToDelete}`
      );
      const updatedProducts = products.filter((p) => p._id !== productToDelete);
      setProducts(updatedProducts);
      // Clear interval for deleted product
      if (intervals[productToDelete]) {
        clearInterval(intervals[productToDelete]);
        const newIntervals = { ...intervals };
        delete newIntervals[productToDelete];
        setIntervals(newIntervals);
      }
      if (onCountUpdate) {
        onCountUpdate(updatedProducts.length);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete product");
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  const goToNextPhoto = useCallback(
    (productId: string) => {
      setCurrentPhotoIndices((prev) => {
        const product = products.find((p: any) => p._id === productId);
        if (!product) return prev;

        const nextIndex = (prev[productId] + 1) % product.photo.length;
        return { ...prev, [productId]: nextIndex };
      });
    },
    [products]
  );

  const goToPrevPhoto = useCallback(
    (productId: string) => {
      setCurrentPhotoIndices((prev) => {
        const product = products.find((p: any) => p._id === productId);
        if (!product) return prev;

        const prevIndex =
          (prev[productId] - 1 + product.photo.length) % product.photo.length;
        return { ...prev, [productId]: prevIndex };
      });
    },
    [products]
  );

  const startAutoSlide = (productId: string) => {
    // Clear any existing interval for this product
    if (intervals[productId]) {
      clearInterval(intervals[productId]);
    }

    const interval = setInterval(() => {
      goToNextPhoto(productId);
    }, 3000); // Change slide every 3 seconds

    setIntervals((prev) => ({ ...prev, [productId]: interval }));
  };

  const stopAutoSlide = (productId: string) => {
    if (intervals[productId]) {
      clearInterval(intervals[productId]);
      const newIntervals = { ...intervals };
      delete newIntervals[productId];
      setIntervals(newIntervals);
    }
  };

  // Start auto-slide when component mounts for products with multiple photos
  useEffect(() => {
    products.forEach((product: any) => {
      if (product.photo?.length > 1) {
        startAutoSlide(product._id);
      }
    });

    return () => {
      // Cleanup on unmount
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <p>{error}</p>
        </div>
        <Button variant="outline" onClick={fetchProducts}>
          Retry
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Eye className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="font-poppins font-semibold text-lg text-gray-600 mb-2">
          No products found
        </h3>
        <p className="text-gray-500">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: any) => {
          const discount = Math.round(
            ((product.mrp - product.sellingPrice) / product.mrp) * 100
          );
          const isExpanded = expandedProduct === product._id;
          const currentPhotoIndex = currentPhotoIndices[product._id] || 0;
          const hasMultiplePhotos = product.photo?.length > 1;

          return (
            <Card
              key={product._id}
              className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onMouseEnter={() =>
                hasMultiplePhotos && stopAutoSlide(product._id)
              }
              onMouseLeave={() =>
                hasMultiplePhotos && startAutoSlide(product._id)
              }
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 group">
                <img
                  src={
                    product.photo[currentPhotoIndex] ||
                    "https://image.pngaaa.com/13/1887013-middle.png"
                  }
                  alt={product.modelname}
                  className="w-full h-full object-contain ransition-all duration-5000 ease-in-out"
                  style={{
                    height: "192px", // Fixed height (12rem = 192px)
                    width: "100%", // Full width of container
                    objectFit: "contain", // Maintain aspect ratio
                  }}
                />

                {hasMultiplePhotos && (
                  <>
                    {/* Navigation arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevPhoto(product._id);
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 hover:bg-black"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Right Navigation Arrow - Solid Black */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextPhoto(product._id);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 hover:bg-black"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Photo Indicators */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                      {product.photo.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentPhotoIndices((prev) => ({
                              ...prev,
                              [product._id]: index,
                            }));
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentPhotoIndex
                              ? "bg-black w-4"
                              : "bg-black/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {discount > 0 && (
                  <Badge className="absolute top-2 right-2 bg-bright-red-600 text-white">
                    {discount}% OFF
                  </Badge>
                )}

                <Badge
                  className={`absolute top-2 left-2 text-white ${
                    product.brand === "Goldfield"
                      ? "bg-royal-blue-600"
                      : "bg-bright-red-600"
                  }`}
                >
                  {product.brand}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="font-poppins text-lg line-clamp-2">
                  {product.modelname}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="font-poppins font-bold text-xl text-green-600">
                    ₹{product.sellingPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-500 line-through text-sm">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>

                {isExpanded && (
                  <div className="space-y-3 pt-2 border-t">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Features:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.features
                          .slice(0, 3)
                          .map((feature: string, index: number) => (
                            <li key={index}>• {feature}</li>
                          ))}
                      </ul>
                    </div>

                    <div className="p-2 bg-gradient-yellow-50 rounded text-xs text-gradient-yellow-800">
                      🛡️ {product.warranty} Warranty
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpand(product._id)}
                    className="flex-1"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    {isExpanded ? "Less" : "More"}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(product)}
                    className="text-royal-blue-600 border-royal-blue-600 hover:bg-royal-blue-600 hover:text-white"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => confirmDelete(product._id)}
                    className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!productToDelete}
        onOpenChange={(open) => {
          if (!open) cancelDelete();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductList;
