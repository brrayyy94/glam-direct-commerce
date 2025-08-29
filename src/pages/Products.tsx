import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  brand?: string;
  description?: string;
  stock?: number;
  featured?: boolean;
  images?: string[];
  categories?: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("buscar") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoria") || "");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("marca") || "");
  const [priceRange, setPriceRange] = useState(searchParams.get("precio") || "");
  const [sortBy, setSortBy] = useState("name");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .order('created_at', { ascending: false });

      if (productsError) throw productsError;

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;

      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique brands from products
  const brands = useMemo(() => {
    return [...new Set(products.map(p => p.brand).filter(Boolean))];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.categories?.name && product.categories.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.categories?.slug === selectedCategory
      );
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product =>
        product.brand === selectedBrand
      );
    }

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const updateSearchParams = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange("");
    setSortBy("name");
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    selectedBrand,
    priceRange
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Buscar</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateSearchParams("buscar", e.target.value);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Categoría</label>
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            updateSearchParams("categoria", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Marca</label>
        <Select
          value={selectedBrand}
          onValueChange={(value) => {
            setSelectedBrand(value);
            updateSearchParams("marca", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas las marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas las marcas</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Rango de precio</label>
        <Select
          value={priceRange}
          onValueChange={(value) => {
            setPriceRange(value);
            updateSearchParams("precio", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todos los precios" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos los precios</SelectItem>
            <SelectItem value="0-1500">Hasta $1,500</SelectItem>
            <SelectItem value="1500-3000">$1,500 - $3,000</SelectItem>
            <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
            <SelectItem value="5000">Más de $5,000</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Limpiar filtros ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-secondary/20">
        <div className="container px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Catálogo de Productos
          </h1>
          <p className="text-lg text-muted-foreground">
            Descubre nuestra completa gama de productos de maquillaje
          </p>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-2xl shadow-card border">
              <h3 className="text-lg font-semibold mb-4">Filtros</h3>
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Controls */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filtros
                    {activeFiltersCount > 0 && (
                      <Badge variant="default" className="ml-2 h-5 w-5 p-0 text-xs">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort and Results Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <p className="text-muted-foreground">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="featured">Destacados Primero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Búsqueda: "{searchQuery}"
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setSearchQuery("");
                        updateSearchParams("buscar", "");
                      }}
                    />
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Categoría: {categories.find(c => c.slug === selectedCategory)?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setSelectedCategory("");
                        updateSearchParams("categoria", "");
                      }}
                    />
                  </Badge>
                )}
                {selectedBrand && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Marca: {selectedBrand}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setSelectedBrand("");
                        updateSearchParams("marca", "");
                      }}
                    />
                  </Badge>
                )}
                {priceRange && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Precio: {priceRange === "5000" ? "Más de $5,000" : `$${priceRange.replace("-", " - $")}`}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => {
                        setPriceRange("");
                        updateSearchParams("precio", "");
                      }}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Products Grid */}
            {products.length === 0 ? (
              <Card className="text-center py-12">
                <CardHeader>
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <CardTitle>No hay productos disponibles</CardTitle>
                  <CardDescription>
                    Aún no hay productos en el catálogo
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      ...product,
                      image: product.images?.[0] || '/placeholder.svg',
                      category: product.categories?.name || 'Sin categoría',
                      brand: product.brand || 'Sin marca',
                      stock: product.stock || 0,
                      featured: product.featured || false,
                      originalPrice: undefined,
                      rating: undefined,
                      isNew: false
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                  <Search className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron productos</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar tus filtros de búsqueda
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;