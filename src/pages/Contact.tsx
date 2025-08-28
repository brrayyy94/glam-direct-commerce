import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  const handleWhatsAppContact = () => {
    const phone = "1234567890";
    const message = "Hola! Me gustaría obtener más información sobre sus productos.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleEmail = () => {
    const email = "contacto@bellamaq.com";
    const subject = "Consulta sobre productos";
    const body = "Hola! Me gustaría obtener más información sobre sus productos de maquillaje.";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "La forma más rápida de contactarnos",
      detail: "+52 123 456 7890",
      action: handleWhatsAppContact,
      buttonText: "Chatear ahora",
      primary: true
    },
    {
      icon: Mail,
      title: "Email",
      description: "Para consultas detalladas",
      detail: "contacto@bellamaq.com",
      action: handleEmail,
      buttonText: "Enviar email",
      primary: false
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Línea directa de atención",
      detail: "+52 123 456 7890",
      action: () => window.open("tel:+521234567890"),
      buttonText: "Llamar",
      primary: false
    }
  ];

  const faqs = [
    {
      question: "¿Cómo realizo un pedido?",
      answer: "Simplemente contacta con nosotros vía WhatsApp con el producto que deseas. Te enviaremos toda la información sobre disponibilidad, precio y formas de entrega."
    },
    {
      question: "¿Hacen entregas a domicilio?",
      answer: "Sí, coordinamos entregas a domicilio en el área metropolitana. Los detalles de entrega se coordinan directamente por WhatsApp."
    },
    {
      question: "¿Los productos tienen garantía?",
      answer: "Todos nuestros productos cuentan con garantía de calidad. Si no estás satisfecha con tu compra, te ayudamos a encontrar una solución."
    },
    {
      question: "¿Puedo ver los productos antes de comprar?",
      answer: "Puedes solicitar fotos adicionales o videos de los productos vía WhatsApp. También ofrecemos asesoría personalizada para ayudarte a elegir."
    },
    {
      question: "¿Qué formas de pago aceptan?",
      answer: "Aceptamos transferencias bancarias, depósitos y pago contra entrega en efectivo (según la zona)."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-coral/10 to-champagne/10">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contacta con Nosotros
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estamos aquí para ayudarte a encontrar los productos perfectos para ti. 
            Contáctanos por cualquiera de nuestros canales y recibe asesoría personalizada.
          </p>
        </div>
      </section>

      <div className="container px-4 py-16">
        {/* Contact Methods */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Canales de Contacto
            </h2>
            <p className="text-lg text-muted-foreground">
              Elige la forma que más te convenga para contactarnos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className={`text-center border-0 shadow-card transition-smooth hover:shadow-hover hover:scale-105 ${
                  method.primary ? 'gradient-primary text-white' : 'gradient-card'
                }`}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft ${
                    method.primary ? 'bg-white/20' : 'gradient-primary'
                  }`}>
                    <method.icon className={`h-8 w-8 ${
                      method.primary ? 'text-white' : 'text-white'
                    }`} />
                  </div>
                  <CardTitle className={method.primary ? 'text-white' : 'text-foreground'}>
                    {method.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className={`text-sm ${
                    method.primary ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {method.description}
                  </p>
                  <p className={`font-semibold ${
                    method.primary ? 'text-white' : 'text-foreground'
                  }`}>
                    {method.detail}
                  </p>
                  <Button
                    onClick={method.action}
                    variant={method.primary ? "secondary" : "default"}
                    className="w-full"
                  >
                    {method.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Hours & Location */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-card gradient-card">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-2 shadow-soft">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Horarios de Atención</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lunes - Viernes</span>
                  <span className="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sábados</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domingos</span>
                  <span className="font-medium">10:00 AM - 3:00 PM</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  * Respuestas en WhatsApp en horario extendido
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card gradient-card">
              <CardHeader>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-2 shadow-soft">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Área de Cobertura</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium mb-2">Entregas a domicilio:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Ciudad de México</li>
                    <li>• Estado de México</li>
                    <li>• Área Metropolitana</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="font-medium mb-2">Envíos nacionales:</p>
                  <p className="text-sm text-muted-foreground">
                    A toda la República Mexicana vía paquetería
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Resolvemos las dudas más comunes de nuestros clientes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-card gradient-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-primary">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              ¿No encontraste la respuesta que buscabas?
            </p>
            <Button variant="hero" onClick={handleWhatsAppContact}>
              <MessageCircle className="h-5 w-5" />
              Pregúntanos por WhatsApp
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;