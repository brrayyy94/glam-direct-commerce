import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { mockProducts, categories } from "@/data/mockProducts";
import heroImage from "@/assets/hero-makeup.jpg";

const Home = () => {
  const featuredProducts = mockProducts.filter(product => product.featured);
  const newProducts = mockProducts.filter(product => product.isNew);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 animate-float">
            <Sparkles className="h-4 w-4 mr-2" />
            Nueva Colección 2024
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Descubre tu
            <span className="block bg-gradient-to-r from-primary-glow to-coral bg-clip-text text-transparent">
              Belleza Única
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Productos de maquillaje premium para realzar tu belleza natural. 
            Calidad profesional al alcance de todos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="hero">
              <Link to="/productos">
                Explorar Productos
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground">
              <Link to="/nosotros">
                Conocer Más
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
              <p className="text-muted-foreground">
                Productos de la más alta calidad, testados dermatológicamente
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cruelty Free</h3>
              <p className="text-muted-foreground">
                Comprometidos con el bienestar animal, sin testeo en animales
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Total</h3>
              <p className="text-muted-foreground">
                Satisfacción garantizada en todos nuestros productos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explora por Categorías
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas para crear tu look perfecto
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/productos?categoria=${category.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-muted p-6 text-center transition-smooth hover:shadow-hover hover:scale-105"
              >
                <div className="relative z-10">
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    Ver productos
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/20">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Productos Destacados
              </h2>
              <p className="text-lg text-muted-foreground">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/productos">
                Ver Todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuevos Lanzamientos
              </h2>
              <p className="text-lg text-muted-foreground">
                Las últimas novedades en maquillaje
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary via-coral to-champagne">
        <div className="container px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Lista para brillar?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Contáctanos por WhatsApp y recibe asesoría personalizada para encontrar 
            los productos perfectos para ti
          </p>
          <Button 
            variant="whatsapp" 
            size="hero"
            onClick={() => {
              const phone = "1234567890";
              const message = "Hola! Me interesa conocer más sobre sus productos de maquillaje.";
              const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");
            }}
          >
            Contactar por WhatsApp
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;