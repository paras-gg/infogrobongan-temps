"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight, Filter } from "lucide-react";
import { useNews } from "@/lib/NewsContext";
import NewsCard from "@/components/NewsCard";
import TrendingNews from "@/components/TrendingNews";
import { CATEGORIES } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { news, getTrendingNews } = useNews();

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  // Filter news
  const filtered = news.filter((item) => {
    const matchesQuery =
      !searchTerm.trim() ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    return matchesQuery && matchesCategory;
  });

  const trendingNews = getTrendingNews();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="py-2">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-1.5 text-xs text-zinc-500 mb-6">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-900 font-bold">Pencarian Berita</span>
      </nav>

      {/* Search Header Banner */}
      <div className="bg-zinc-950 text-white rounded-xl p-6 sm:p-8 mb-8 border border-zinc-800 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-white tracking-tight mb-3">
          Hasil Pencarian
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mb-5">
          Temukan arsip liputan, peristiwa, opini, dan informasi terkini seputar Kabupaten Grobogan.
        </p>

        {/* Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ketik kata kunci (contoh: Bledug Kuwu, Persipur, Kedelai)..."
            className="w-full pl-11 pr-24 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-sm"
          />
          <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Results Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Filter:
            </span>
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
                activeCategory === "all"
                  ? "bg-amber-400 text-zinc-950"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
              }`}
            >
              Semua Kategori
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  activeCategory === cat.name
                    ? "bg-amber-400 text-zinc-950 font-bold"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Results Summary */}
          <div className="text-xs text-zinc-600 bg-zinc-100 px-4 py-2 rounded-lg">
            Ditemukan <strong>{filtered.length}</strong> berita
            {searchTerm && <span> untuk kata kunci &ldquo;{searchTerm}&rdquo;</span>}
            {activeCategory !== "all" && <span> pada kategori {activeCategory}</span>}
          </div>

          {/* Results List */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-zinc-200">
              <p className="text-zinc-500 text-sm mb-4">
                Tidak ada berita yang cocok dengan kata kunci tersebut.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 bg-amber-400 text-zinc-950 font-bold text-xs rounded hover:bg-amber-500"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((item) => (
                <NewsCard key={item.id} news={item} variant="horizontal" />
              ))}
            </div>
          )}

        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          <TrendingNews news={trendingNews} title="Paling Banyak Dicari" />
        </aside>

      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-zinc-500">Memuat hasil pencarian...</div>}>
      <SearchContent />
    </Suspense>
  );
}
