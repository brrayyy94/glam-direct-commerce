import { Heart, Star, Users, Award, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-makeup.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Cruelty Free",
      description: "Comprometidos con el bienestar animal. Ninguno de nuestros productos es testado en animales."
    },
    {
      icon: Star,
      title: "Calidad Premium",
      description: "Seleccionamos cuidadosamente cada producto para garantizar la máxima calidad y durabilidad."
    },
    {
      icon: Shield,
      title: "Productos Seguros",
      description: "Todos nuestros productos están testados dermatológicamente y son seguros para todo tipo de piel."
    },
    {
      icon: Sparkles,
      title: "Innovación",
      description: "Siempre buscamos las últimas tendencias y tecnologías en el mundo del maquillaje."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Clientes Satisfechos" },
    { number: "500+", label: "Productos de Calidad" },
    { number: "50+", label: "Marcas Reconocidas" },
    { number: "5 años", label: "De Experiencia" }
  ];

  const team = [
    {
      name: "María González",
      role: "Fundadora & CEO",
      description: "Maquilladora profesional con más de 10 años de experiencia en la industria de la belleza."
    },
    {
      name: "Ana Rodríguez",
      role: "Directora de Productos",
      description: "Especialista en cosmetología y tendencias de maquillaje, selecciona cada producto de nuestro catálogo."
    },
    {
      name: "Carmen López",
      role: "Atención al Cliente",
      description: "Experta en asesoría de belleza, te ayuda a encontrar los productos perfectos para ti."
    }
  ];

  const handleWhatsAppContact = () => {
    const phone = "1234567890";
    const message = "Hola! Me gustaría conocer más sobre BellaMaq y sus productos.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Nuestra
            <span className="block bg-gradient-to-r from-primary-glow to-coral bg-clip-text text-transparent">
              Historia
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Desde 2019, hemos estado dedicados a realzar la belleza natural de miles de mujeres 
            con productos de maquillaje de la más alta calidad.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Nuestra Misión
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              En BellaMaq creemos que cada mujer tiene una belleza única que merece ser realzada. 
              Nuestra misión es proporcionar productos de maquillaje de alta calidad, accesibles 
              y éticos, junto con la asesoría personalizada que cada cliente necesita para 
              expresar su personalidad a través del maquillaje.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nos comprometemos a ofrecer una experiencia de compra excepcional, con atención 
              personalizada vía WhatsApp y productos cuidadosamente seleccionados por nuestro 
              equipo de expertos en belleza.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-card gradient-card">
                <CardContent className="p-6">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestros Logros
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Números que reflejan nuestro compromiso con la excelencia
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce a las expertas que hacen posible la magia de BellaMaq
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-card gradient-card">
                <CardContent className="p-6">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Políticas y Compromiso
            </h2>
            <p className="text-lg text-muted-foreground">
              Transparencia en todas nuestras operaciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-card gradient-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Garantía de Calidad</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Todos nuestros productos cuentan con garantía de satisfacción. 
                      Si no estás conforme, te ayudamos a encontrar la solución perfecta.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card gradient-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Privacidad y Seguridad</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Protegemos tu información personal y respetamos tu privacidad. 
                      Solo recopilamos datos necesarios para brindarte el mejor servicio.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-coral to-champagne">
        <div className="container px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a encontrar los productos perfectos 
            para realzar tu belleza natural.
          </p>
          <Button 
            variant="whatsapp" 
            size="hero"
            onClick={handleWhatsAppContact}
          >
            Contactar por WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;