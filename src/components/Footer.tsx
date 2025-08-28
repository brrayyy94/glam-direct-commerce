import { Link } from "react-router-dom";
import { ShoppingBag, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const handleWhatsAppContact = () => {
    const phone = "1234567890";
    const message = "Hola! Me gustaría obtener más información sobre BellaMaq.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-coral bg-clip-text text-transparent">
                BellaMaq
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu tienda de maquillaje de confianza. Productos de calidad premium 
              para realzar tu belleza natural.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Enlaces Rápidos
            </h3>
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/productos" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Productos
              </Link>
              <Link 
                to="/nosotros" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Nosotros
              </Link>
              <Link 
                to="/contacto" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Categorías
            </h3>
            <nav className="space-y-2">
              <Link 
                to="/productos?categoria=labiales" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Labiales
              </Link>
              <Link 
                to="/productos?categoria=sombras" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sombras
              </Link>
              <Link 
                to="/productos?categoria=base" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Base
              </Link>
              <Link 
                to="/productos?categoria=brochas" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Brochas
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    +52 123 456 7890
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    contacto@bellamaq.com
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Ciudad de México, México
                  </p>
                </div>
              </div>
            </div>
            <Button 
              variant="coral" 
              size="sm" 
              onClick={handleWhatsAppContact}
              className="w-full"
            >
              <Phone className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/politica-privacidad" className="hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
            <Link to="/cookies" className="hover:text-primary transition-colors">
              Política de Cookies
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} BellaMaq. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;