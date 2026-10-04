"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { 
  Landmark, 
  TrendingUp, 
  Trophy, 
  Compass, 
  MapPin, 
  ChevronRight,
  SlidersHorizontal,
  Flame
} from "lucide-react";
import { useNews } from "@/lib/NewsContext";
import { CATEGORIES, NewsCategory } from "@/lib/types";
import NewsCard from "@/components/NewsCard";
import TrendingNews from "@/components/TrendingNews";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { news, getTrendingNews } = useNews();
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  // Find category info
  const categoryInfo = CATEGORIES.find((c) => c.slug === slug);
  const categoryName = categoryInfo ? categoryInfo.name : (slug.replace(/-/g, " ") as NewsCategory);

  // Filter news
  const filteredNews = news.filter(
    (n) => n.category.toLowerCase().replace(/\s+/g, "-") === slug || n.category === categoryName
  );

  // Sort
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const trendingNews = getTrendingNews();

  const categoryIcons: Record<string, React.ReactNode> = {
    "politik": <Landmark className="w-8 h-8 text-amber-400" />,
    "ekonomi": <TrendingUp className="w-8 h-8 text-amber-400" />,
    "olahraga": <Trophy className="w-8 h-8 text-amber-400" />,
    "wisata-grobogan": <Compass className="w-8 h-8 text-amber-400" />,
    "seputar-purwodadi": <MapPin className="w-8 h-8 text-amber-400" />,
  };

  return (
    <div className="py-2">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-1.5 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-400">Kategori</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-900 font-bold capitalize">
          {categoryInfo?.name || slug}
        </span>
      </nav>

      {/* Category Banner */}
      <div className="bg-zinc-950 text-white rounded-xl p-6 sm:p-8 mb-8 border border-zinc-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 shrink-0">
              {categoryIcons[slug] || <Flame className="w-8 h-8 text-amber-400" />}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Kanal Berita
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight">
                {categoryInfo?.name || slug}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                {categoryInfo?.description || `Kumpulan berita dan informasi terkini seputar ${categoryInfo?.name || slug} di Kabupaten Grobogan.`}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-2xl font-black text-amber-400 font-serif">
              {filteredNews.length}
            </span>
            <span className="text-xs text-zinc-400 block">Total Berita Terbit</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): News List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Controls Bar: Sort */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-lg border border-zinc-200">
            <span className="text-xs text-zinc-500 font-medium">
              Menampilkan {sortedNews.length} artikel
            </span>

            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-600 font-medium hidden sm:inline">Urutkan:</span>
              <button
                onClick={() => setSortBy("latest")}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  sortBy === "latest"
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                Terbaru
              </button>
              <button
                onClick={() => setSortBy("popular")}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  sortBy === "popular"
                    ? "bg-zinc-900 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                Terpopuler
              </button>
            </div>
          </div>

          {/* News List */}
          {sortedNews.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-zinc-200">
              <p className="text-zinc-500 text-sm">
                Belum ada berita yang diterbitkan pada kategori ini.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block px-4 py-2 bg-amber-400 text-zinc-950 font-bold text-xs rounded"
              >
                Kembali ke Beranda
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNews.map((item) => (
                <NewsCard key={item.id} news={item} variant="horizontal" />
              ))}
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Trending widget */}
          <TrendingNews news={trendingNews} title="Berita Terpopuler" />

          {/* Other Categories */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
              Kategori Lainnya
            </h4>
            <div className="space-y-2 text-xs">
              {CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/kategori/${cat.slug}`}
                  className="flex items-center justify-between p-2.5 rounded hover:bg-amber-50 hover:text-amber-800 text-zinc-700 transition-colors border border-transparent hover:border-amber-200"
                >
                  <span className="font-semibold">{cat.name}</span>
                  <span className="text-zinc-400">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}
