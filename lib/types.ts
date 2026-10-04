export type NewsCategory = 
  | "Politik"
  | "Ekonomi"
  | "Olahraga"
  | "Wisata Grobogan"
  | "Seputar Purwodadi";

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: NewsCategory;
  author: string;
  publishedAt: string; // ISO date string or formatted date
  imageUrl: string;
  viewsCount: number;
  isTrending: boolean;
  isHeadline?: boolean;
  tags?: string[];
  readTime?: string;
  imageCaption?: string;
}

export interface CategoryInfo {
  name: NewsCategory;
  slug: string;
  description: string;
  badgeColor: string;
  iconName: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: "Politik",
    slug: "politik",
    description: "Kabar kebijakan pemerintahan, legislatif daerah, dan dinamika politik di Kabupaten Grobogan.",
    badgeColor: "bg-red-100 text-red-800 border-red-200",
    iconName: "Landmark",
  },
  {
    name: "Ekonomi",
    slug: "ekonomi",
    description: "Informasi geliat pasar, UMKM, pertanian lumbung pangan, dan investasi industri Grobogan.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    iconName: "TrendingUp",
  },
  {
    name: "Olahraga",
    slug: "olahraga",
    description: "Kiprah Persipur Purwodadi, ajang olahraga daerah, dan prestasi atlet Kabupaten Grobogan.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    iconName: "Trophy",
  },
  {
    name: "Wisata Grobogan",
    slug: "wisata-grobogan",
    description: "Eksplorasi destinasi unik: Bledug Kuwu, Api Abadi Mrapen, Kedung Ombo, hingga pesona alam Grobogan.",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    iconName: "Compass",
  },
  {
    name: "Seputar Purwodadi",
    slug: "seputar-purwodadi",
    description: "Denyut kehidupan kota Purwodadi, Simpang Lima, fasilitas publik, komunitas, dan informasi terkini warga.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    iconName: "MapPin",
  },
];
