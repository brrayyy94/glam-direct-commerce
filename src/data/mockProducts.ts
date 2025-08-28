import lipsticks from "@/assets/lipsticks.jpg";
import eyeshadowPalette from "@/assets/eyeshadow-palette.jpg";
import makeupBrushes from "@/assets/makeup-brushes.jpg";
import compactPowder from "@/assets/compact-powder.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  category: string;
  description: string;
  stock: number;
  featured: boolean;
  rating?: number;
  isNew?: boolean;
  images?: string[];
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Labial Líquido Mate Duración Extendida",
    slug: "labial-liquido-mate-duracion-extendida",
    price: 2499,
    originalPrice: 3199,
    image: lipsticks,
    brand: "Bella Cosmetics",
    category: "Labiales",
    description: "Labial líquido mate de larga duración con pigmentación intensa. Fórmula cómoda que no reseca los labios. Disponible en tonos nude, coral y berry.",
    stock: 15,
    featured: true,
    rating: 4.8,
    isNew: true,
    images: [lipsticks]
  },
  {
    id: "2",
    name: "Paleta de Sombras Neutrales Profesional",
    slug: "paleta-sombras-neutrales-profesional",
    price: 4999,
    originalPrice: 6499,
    image: eyeshadowPalette,
    brand: "Pro Makeup",
    category: "Sombras",
    description: "Paleta con 12 tonos neutrales perfectos para looks desde naturales hasta dramáticos. Fórmula altamente pigmentada y fácil de difuminar.",
    stock: 8,
    featured: true,
    rating: 4.9,
    images: [eyeshadowPalette]
  },
  {
    id: "3",
    name: "Set de Brochas Profesionales Premium",
    slug: "set-brochas-profesionales-premium",
    price: 3599,
    image: makeupBrushes,
    brand: "Beauty Tools",
    category: "Brochas",
    description: "Set completo de 12 brochas profesionales con cerdas sintéticas de alta calidad. Incluye estuche elegante para transporte.",
    stock: 12,
    featured: false,
    rating: 4.7,
    isNew: true,
    images: [makeupBrushes]
  },
  {
    id: "4",
    name: "Polvo Compacto Cobertura Media",
    slug: "polvo-compacto-cobertura-media",
    price: 1899,
    originalPrice: 2399,
    image: compactPowder,
    brand: "Bella Cosmetics",
    category: "Base",
    description: "Polvo compacto con cobertura media y acabado natural. Fórmula libre de aceites, ideal para todo tipo de piel. Incluye espejo y esponja.",
    stock: 20,
    featured: false,
    rating: 4.5,
    images: [compactPowder]
  },
  {
    id: "5",
    name: "Corrector Líquido Alta Cobertura",
    slug: "corrector-liquido-alta-cobertura",
    price: 1799,
    image: compactPowder,
    brand: "Pro Makeup",
    category: "Base",
    description: "Corrector líquido de alta cobertura para ocultar imperfecciones. Fórmula de larga duración que no se agrieta ni se desvanece.",
    stock: 0,
    featured: false,
    rating: 4.6,
    images: [compactPowder]
  },
  {
    id: "6",
    name: "Rubor en Polvo Tono Natural",
    slug: "rubor-polvo-tono-natural",
    price: 1599,
    image: compactPowder,
    brand: "Bella Cosmetics",
    category: "Rubor",
    description: "Rubor en polvo con tonos naturales que aportan un toque de color saludable a las mejillas. Fácil de aplicar y difuminar.",
    stock: 18,
    featured: false,
    rating: 4.4,
    images: [compactPowder]
  },
  {
    id: "7",
    name: "Delineador de Ojos Waterproof",
    slug: "delineador-ojos-waterproof",
    price: 1299,
    originalPrice: 1699,
    image: lipsticks,
    brand: "Pro Makeup",
    category: "Ojos",
    description: "Delineador de ojos a prueba de agua con punta de fieltro para trazos precisos. Color negro intenso de larga duración.",
    stock: 25,
    featured: false,
    rating: 4.3,
    isNew: true,
    images: [lipsticks]
  },
  {
    id: "8",
    name: "Máscara de Pestañas Volumen Extremo",
    slug: "mascara-pestanas-volumen-extremo",
    price: 2199,
    image: lipsticks,
    brand: "Beauty Tools",
    category: "Ojos",
    description: "Máscara de pestañas que proporciona volumen y longitud extremos. Fórmula resistente al agua y al sudor.",
    stock: 14,
    featured: true,
    rating: 4.7,
    images: [lipsticks]
  }
];

export const categories = [
  { id: "labiales", name: "Labiales", slug: "labiales" },
  { id: "sombras", name: "Sombras", slug: "sombras" },
  { id: "base", name: "Base", slug: "base" },
  { id: "brochas", name: "Brochas", slug: "brochas" },
  { id: "ojos", name: "Ojos", slug: "ojos" },
  { id: "rubor", name: "Rubor", slug: "rubor" }
];

export const brands = [
  "Bella Cosmetics",
  "Pro Makeup", 
  "Beauty Tools"
];