import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save, Package } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  price: number;
  brand: string;
  description: string;
  stock: number;
  featured: boolean;
  category_id: string;
  images: string[];
}

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    slug: '',
    price: 0,
    brand: '',
    description: '',
    stock: 0,
    featured: false,
    category_id: '',
    images: []
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error al cargar categorías');
    }
  };

  const fetchProduct = async () => {
    if (!id) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          price: data.price || 0,
          brand: data.brand || '',
          description: data.description || '',
          stock: data.stock || 0,
          featured: data.featured || false,
          category_id: data.category_id || '',
          images: data.images || []
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error al cargar producto');
      navigate('/admin/products');
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('El nombre es requerido');
      return;
    }

    if (formData.price <= 0) {
      toast.error('El precio debe ser mayor a 0');
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        price: formData.price,
        brand: formData.brand.trim() || null,
        description: formData.description.trim() || null,
        stock: formData.stock,
        featured: formData.featured,
        category_id: formData.category_id || null,
        images: formData.images
      };

      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);

        if (error) throw error;
        toast.success('Producto actualizado correctamente');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Producto creado correctamente');
      }

      navigate('/admin/products');
    } catch (error: any) {
      console.error('Error saving product:', error);
      if (error.code === '23505') {
        toast.error('Ya existe un producto con ese nombre o slug');
      } else {
        toast.error('Error al guardar producto');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin/products')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Productos
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? 'Modifica los datos del producto' : 'Agrega un nuevo producto al catálogo'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
            </CardTitle>
            <CardDescription>
              Completa todos los campos para {isEditing ? 'actualizar' : 'crear'} el producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre del Producto *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ej: Labial Líquido Mate"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL amigable)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="labial-liquido-mate"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Precio *</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="Ej: Bella Cosmetics"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Sin categoría</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe las características y beneficios del producto..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Producto destacado</Label>
                </div>

                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                  maxImages={5}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/products')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')} Producto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductForm;