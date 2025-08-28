import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/data/mockProducts";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { slug } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const product = mockProducts.find(p => p.slug === slug);
  const relatedProducts = mockProducts
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Button asChild>
            <Link to="/productos">Volver al catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const phone = "1234567890"; // Replace with actual WhatsApp number
    const message = `Hola! Quiero el producto: ${product.name} - $${product.price} (${window.location.href})`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Mira este producto: ${product.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/productos" className="hover:text-primary transition-colors">
              Productos
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/productos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al catálogo
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/20 shadow-card">
              <img
                src={product.images?.[selectedImageIndex] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-primary"
                        : "border-transparent hover:border-muted"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isNew && (
                <Badge variant="default" className="gradient-primary text-white">
                  Nuevo
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive">
                  -{discountPercentage}% OFF
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary">
                  Sin Stock
                </Badge>
              )}
            </div>

            {/* Brand */}
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {product.brand}
              </p>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating!)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} / 5.0
                </span>
              </div>
            )}

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  ¡Ahorras ${product.originalPrice! - product.price}!
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {product.stock > 0 
                  ? `${product.stock} disponible${product.stock !== 1 ? 's' : ''}`
                  : 'Sin stock'
                }
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="hero"
                size="lg"
                onClick={handleWhatsAppOrder}
                disabled={product.stock === 0}
                className="w-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock > 0 ? "Comprar por WhatsApp" : "Sin Stock"}
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="h-5 w-5" />
                  Favoritos
                </Button>
                <Button variant="outline" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                  Compartir
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Beneficios</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm">Testado dermatológicamente</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm">Entrega coordinada por WhatsApp</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-sm">Garantía de satisfacción</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;