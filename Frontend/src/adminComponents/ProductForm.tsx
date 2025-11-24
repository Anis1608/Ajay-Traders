// src/adminComponents/ProductForm.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Plus, UploadCloud } from 'lucide-react';
import axios from 'axios';

interface ProductFormProps {
  product?: any;
  brand: string;
  onSubmit: () => void;
  onClose: () => void;
}

interface FormData {
  modelname: string;
  photo: string[];
  brand: string;
  mrp: number;
  sellingPrice: number;
  warranty: string;
  description: string;
  features: string[];
}

const ProductForm = ({ product, brand, onSubmit, onClose }: ProductFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    modelname: '',
    photo: [],
    brand: brand,
    mrp: 0,
    sellingPrice: 0,
    warranty: '', // warranty as string
    description: '',
    features: [''],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (product) {
      setFormData({
        modelname: product.modelname,
        photo: product.photo,
        brand: product.brand,
        mrp: product.mrp,
        sellingPrice: product.sellingPrice,
        warranty: product.warranty?.toString() || '',
        description: product.description,
        features: product.features.length > 0 ? product.features : [''],
      });
    } else {
      setFormData(prev => ({ ...prev, brand }));
    }
  }, [product, brand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      features: formData.features.filter(feature => feature.trim() !== ''),
    };

    try {
      if (product?._id) {
        await axios.put(`${API_BASE_URL}/api/weightscales/update/${product._id}`, cleanedData);
      } else {
        await axios.post(`${API_BASE_URL}/api/weightscales/add`, cleanedData);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = [];
      const totalFiles = files.length;
      
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'blockvote');
        
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/yg123/image/upload',
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              );
              setUploadProgress(percentCompleted);
            }
          }
        );
        
        uploadedUrls.push(response.data.secure_url);
      }

      setFormData(prev => ({
        ...prev,
        photo: [...prev.photo, ...uploadedUrls]
      }));
      
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photo: prev.photo.filter((_, i) => i !== index)
    }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeatureField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins text-xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription>
            {product ? 'Update product information' : 'Enter product details'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="modelname">Model Name *</Label>
              <Input
                id="modelname"
                value={formData.modelname}
                onChange={(e) => setFormData(prev => ({ ...prev, modelname: e.target.value }))}
                placeholder="Enter model name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Select 
                value={formData.brand} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, brand: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Goldfield">Goldfield</SelectItem>
                  <SelectItem value="Jeevan Deep">Jeevan Deep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mrp">MRP (₹) *</Label>
              <Input
                id="mrp"
                type="number"
                value={formData.mrp}
                onChange={(e) => setFormData(prev => ({ ...prev, mrp: e.target.value === '' ? 0 : Number(e.target.value) }))}
                placeholder="0"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={formData.sellingPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: e.target.value === '' ? 0 : Number(e.target.value) }))}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="warranty">Warranty *</Label>
            <Input
              id="warranty"
              type="text"
              value={formData.warranty}
              onChange={(e) => setFormData(prev => ({ ...prev, warranty: e.target.value }))}
              placeholder="e.g. 1 Year, 6 Months, etc."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Product Images</Label>
            <div className="flex items-center gap-4">
              <Label 
                htmlFor="image-upload"
                className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Images</span>
              </Label>
              <Input 
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              {isUploading && (
                <div className="flex-1">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Uploading {uploadProgress}%
                  </p>
                </div>
              )}
            </div>

            {formData.photo.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {formData.photo.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`Product preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Product Features</Label>
              <Button type="button" onClick={addFeatureField} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex space-x-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter product feature"
                  className="flex-1"
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isUploading}
            >
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
