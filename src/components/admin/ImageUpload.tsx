import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  maxImages = 5
}) => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File) => {
    if (!file) return null;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona solo archivos de imagen');
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB');
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.error(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      
      const validUrls = uploadedUrls.filter(url => url !== null) as string[];
      
      if (validUrls.length > 0) {
        onImagesChange([...images, ...validUrls]);
        toast.success(`${validUrls.length} imagen(es) subida(s) correctamente`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Error al subir las imágenes');
    } finally {
      setUploading(false);
    }

    // Reset input
    e.target.value = '';
  };

  const removeImage = async (index: number, imageUrl: string) => {
    try {
      // Extract filename from URL
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('product-images')
          .remove([fileName]);
      }
    } catch (error) {
      console.error('Error deleting image from storage:', error);
    }

    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success('Imagen eliminada');
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="images">Imágenes del Producto</Label>
        <p className="text-sm text-muted-foreground mb-2">
          Sube hasta {maxImages} imágenes (máx. 5MB cada una)
        </p>
        
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
          <Input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={uploading || images.length >= maxImages}
            className="hidden"
          />
          
          <Label 
            htmlFor="images" 
            className={`cursor-pointer inline-flex flex-col items-center gap-2 ${
              uploading || images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm font-medium">
              {uploading ? 'Subiendo...' : 'Seleccionar imágenes'}
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG, WEBP hasta 5MB
            </span>
          </Label>
        </div>
      </div>

      {images.length > 0 && (
        <div>
          <Label>Imágenes subidas ({images.length}/{maxImages})</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {images.map((imageUrl, index) => (
              <Card key={index} className="relative p-2">
                <div className="aspect-square relative rounded overflow-hidden bg-muted">
                  <img
                    src={imageUrl}
                    alt={`Producto ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeImage(index, imageUrl)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {index === 0 && (
                  <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            La primera imagen será la imagen principal del producto
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;