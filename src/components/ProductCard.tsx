import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string;
  stock: number;
  featured: boolean;
  rating?: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const phone = "1234567890"; // Replace with actual WhatsApp number
    const message = `Hola! Quiero el producto: ${product.name} - $${product.price} (${window.location.origin}/productos/${product.slug})`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden border-0 shadow-card hover:shadow-hover transition-smooth cursor-pointer gradient-card">
      <Link to={`/productos/${product.slug}`}>
        <div className="relative overflow-hidden">
          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="default" className="gradient-primary text-white">
                Nuevo
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive">
                -{discountPercentage}%
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                Sin Stock
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-background/80 hover:bg-background transition-smooth"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to favorites logic
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-secondary/20">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-smooth group-hover:scale-110"
            />
          </div>

          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
            <Button
              variant="hero"
              size="sm"
              onClick={handleWhatsAppOrder}
              disabled={product.stock === 0}
              className="transform translate-y-4 group-hover:translate-y-0 transition-bounce"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.stock > 0 ? "Comprar por WhatsApp" : "Sin Stock"}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Brand */}
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.rating})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {product.stock > 0 
                ? `${product.stock} disponible${product.stock !== 1 ? 's' : ''}`
                : 'Sin stock'
              }
            </span>
            <span className="text-coral">{product.category}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;