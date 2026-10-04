"use client";

import React from "react";
import Link from "next/link";
import { useNews } from "@/lib/NewsContext";
import HeroNews from "@/components/HeroNews";
import TrendingNews from "@/components/TrendingNews";
import CategorySection from "@/components/CategorySection";
import NewsCard from "@/components/NewsCard";
import { Flame, Compass, MapPin, Sparkles, Newspaper } from "lucide-react";

export default function HomePage() {
  const { news, getTrendingNews } = useNews();

  // Find headline or first news item
  const headline = news.find((n) => n.isHeadline) || news[0];
  const secondaryNews = news.filter((n) => n.id !== headline?.id).slice(0, 4);

  // Trending list
  const trendingNews = getTrendingNews();

  // Filter by categories
  const purwodadiNews = news.filter((n) => n.category === "Seputar Purwodadi");
  const wisataNews = news.filter((n) => n.category === "Wisata Grobogan");
  const ekonomiNews = news.filter((n) => n.category === "Ekonomi");
  const politikNews = news.filter((n) => n.category === "Politik");
  const olahragaNews = news.filter((n) => n.category === "Olahraga");

  return (
    <div className="space-y-10">
      
      {/* 1. Hero Section: Headline Utama & Top Stories */}
      {headline && (
        <HeroNews headline={headline} secondaryNews={secondaryNews} />
      )}

      {/* 2. Banner Informasi Khusus Pemkab Grobogan / Headline Ticker Bar */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 p-4 rounded-xl border border-amber-500/40 text-zinc-950 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-950 text-amber-400 rounded-lg shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base font-serif">
              Grobogan Bersemi: Menuju Sentra Kedelai & Pariwisata Geologi Unggulan
            </h3>
            <p className="text-xs text-zinc-800">
              Dukung kemajuan pembangunan dan keterbukaan informasi publik Kabupaten Grobogan.
            </p>
          </div>
        </div>
        <Link
          href="/kategori/wisata-grobogan"
          className="px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-amber-300 hover:text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
        >
          Jelajah Grobogan &rarr;
        </Link>
      </div>

      {/* 3. Main Grid Layout: Categories & Sidebar Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Main Column (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Seputar Purwodadi Section */}
          <CategorySection
            title="Seputar Purwodadi"
            category="Seputar Purwodadi"
            categorySlug="seputar-purwodadi"
            items={purwodadiNews}
            description="Peristiwa, infrastruktur, kuliner, dan gaya hidup di jantung kota Purwodadi."
          />

          {/* Wisata Grobogan Section */}
          <CategorySection
            title="Pesona Wisata Grobogan"
            category="Wisata Grobogan"
            categorySlug="wisata-grobogan"
            items={wisataNews}
            description="Eksplorasi keajaiban alam Bledug Kuwu, Api Mrapen, dan Kedung Ombo."
          />

          {/* Split 2 Columns: Ekonomi & Politik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-zinc-900">
            
            {/* Ekonomi */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-zinc-300">
                <h3 className="font-black text-lg font-serif text-zinc-950 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Ekonomi & Bisnis
                </h3>
                <Link
                  href="/kategori/ekonomi"
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  Semua
                </Link>
              </div>
              <div className="space-y-3">
                {ekonomiNews.slice(0, 3).map((item) => (
                  <NewsCard key={item.id} news={item} variant="compact" />
                ))}
              </div>
            </div>

            {/* Politik */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-4 border-b border-zinc-300">
                <h3 className="font-black text-lg font-serif text-zinc-950 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Politik & Pemerintahan
                </h3>
                <Link
                  href="/kategori/politik"
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  Semua
                </Link>
              </div>
              <div className="space-y-3">
                {politikNews.slice(0, 3).map((item) => (
                  <NewsCard key={item.id} news={item} variant="compact" />
                ))}
              </div>
            </div>

          </div>

          {/* Olahraga Section */}
          <CategorySection
            title="Kabar Olahraga & Persipur"
            category="Olahraga"
            categorySlug="olahraga"
            items={olahragaNews}
            description="Laskar Petir Persipur Purwodadi dan prestasi atlet Kabupaten Grobogan."
          />

        </div>

        {/* Right / Sidebar Column (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Trending Widget */}
          <TrendingNews news={trendingNews} title="Paling Banyak Dibaca" />

          {/* Editorial Callout */}
          <div className="bg-zinc-900 text-white rounded-xl p-5 border border-zinc-800">
            <div className="flex items-center gap-2 mb-3 text-amber-400">
              <Newspaper className="w-5 h-5" />
              <h4 className="font-bold text-sm uppercase tracking-wider">
                Suara Redaksi
              </h4>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Info Grobogan berkomitmen mengawal kemajuan Kabupaten Grobogan lewat jurnalisme yang jujur, independen, dan berpihak kepada kepentingan masyarakat umum.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
              <Link
                href="/tentang-kami"
                className="text-xs font-bold text-amber-400 hover:underline"
              >
                Profil Redaksi &rarr;
              </Link>
              <Link
                href="/kontak"
                className="text-xs font-medium text-zinc-400 hover:text-zinc-200"
              >
                Kirim Saran
              </Link>
            </div>
          </div>

          {/* Grobogan Tourism Quick Guide */}
          <div className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm">
            <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-amber-500" />
              Destinasi Wajib Grobogan
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-700">
              <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-900">Bledug Kuwu</p>
                  <p className="text-[11px] text-zinc-500">Kawah lumpur purba & garam alami di Kradenan</p>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">Unik</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-900">Api Abadi Mrapen</p>
                  <p className="text-[11px] text-zinc-500">Situs api sakral PON & Waisak di Godong</p>
                </div>
                <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold">Sejarah</span>
              </div>
              <div className="p-2.5 rounded bg-zinc-50 border border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-900">Waduk Kedung Ombo</p>
                  <p className="text-[11px] text-zinc-500">Wisata perahu & ikan bakar di Geyer</p>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Alam</span>
              </div>
            </div>
          </div>

          {/* Quick Category List */}
          <div className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm">
            <h4 className="font-black text-sm uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-200">
              Jelajahi Berdasarkan Kategori
            </h4>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/kategori/seputar-purwodadi"
                className="px-3 py-1.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold hover:bg-purple-100 transition-colors"
              >
                Seputar Purwodadi ({purwodadiNews.length})
              </Link>
              <Link
                href="/kategori/wisata-grobogan"
                className="px-3 py-1.5 rounded bg-amber-50 text-amber-800 border border-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors"
              >
                Wisata Grobogan ({wisataNews.length})
              </Link>
              <Link
                href="/kategori/ekonomi"
                className="px-3 py-1.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
              >
                Ekonomi ({ekonomiNews.length})
              </Link>
              <Link
                href="/kategori/politik"
                className="px-3 py-1.5 rounded bg-red-50 text-red-700 border border-red-200 text-xs font-semibold hover:bg-red-100 transition-colors"
              >
                Politik ({politikNews.length})
              </Link>
              <Link
                href="/kategori/olahraga"
                className="px-3 py-1.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors"
              >
                Olahraga ({olahragaNews.length})
              </Link>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}
