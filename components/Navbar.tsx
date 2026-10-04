"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  Search, 
  Menu, 
  X, 
  Flame, 
  MapPin, 
  TrendingUp, 
  Trophy, 
  Compass, 
  Landmark,
  ChevronDown
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/newsData";
import { CATEGORIES } from "@/lib/types";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setSearchOpen(false);
    }
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    "politik": <Landmark className="w-4 h-4" />,
    "ekonomi": <TrendingUp className="w-4 h-4" />,
    "olahraga": <Trophy className="w-4 h-4" />,
    "wisata-grobogan": <Compass className="w-4 h-4" />,
    "seputar-purwodadi": <MapPin className="w-4 h-4" />,
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 shadow-sm">
      
      {/* Brand & Search Bar Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 gap-4">
          
          {/* Logo & Portal Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-400 shadow-sm shrink-0 bg-zinc-900">
              <Image
                src={BRAND_CONFIG.logoUrl}
                alt="Logo Info Grobogan"
                fill
                sizes="56px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-zinc-950 font-serif">
                  INFO <span className="text-amber-500 underline decoration-amber-400 decoration-2 underline-offset-4">GROBOGAN</span>
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 font-medium tracking-tight hidden sm:block">
                Jendela Informasi Terpercaya Bumi Serasi
              </p>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Cari berita Purwodadi, wisata, peristiwa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:bg-white transition-all text-zinc-900 placeholder:text-zinc-400"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-amber-400 hover:bg-amber-500 text-zinc-950 px-4 py-1.5 rounded-full text-xs font-bold transition-colors"
              >
                Cari
              </button>
            </form>
          </div>

          {/* Action / Mobile Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-zinc-700 hover:text-amber-500 hover:bg-zinc-100 rounded-lg md:hidden transition-colors"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-amber-500 hover:bg-zinc-100 rounded-lg lg:hidden transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1 border-t border-zinc-100">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari berita di Info Grobogan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-20 py-2 text-sm bg-zinc-100 border border-zinc-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-amber-400 text-zinc-950 px-3.5 py-1.5 rounded-full text-xs font-bold"
              >
                Cari
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Main Navigation Menu Bar (Desktop) */}
      <nav className="hidden lg:block bg-zinc-950 text-white border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3.5 py-2.5 text-xs uppercase tracking-wider font-bold transition-all border-b-2 ${
                  pathname === "/"
                    ? "border-amber-400 text-amber-400 bg-zinc-900"
                    : "border-transparent text-zinc-200 hover:text-amber-400 hover:bg-zinc-900/60"
                }`}
              >
                Beranda
              </Link>

              {CATEGORIES.map((cat) => {
                const isActive = pathname === `/kategori/${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={`/kategori/${cat.slug}`}
                    className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs uppercase tracking-wider font-bold transition-all border-b-2 ${
                      isActive
                        ? "border-amber-400 text-amber-400 bg-zinc-900"
                        : "border-transparent text-zinc-200 hover:text-amber-400 hover:bg-zinc-900/60"
                    }`}
                  >
                    <span className="text-amber-400/80">
                      {categoryIcons[cat.slug]}
                    </span>
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <Link
                href="/tentang-kami"
                className={`px-3 py-1 rounded transition-colors ${
                  pathname === "/tentang-kami"
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                Tentang Kami
              </Link>
              <span className="text-zinc-700">|</span>
              <Link
                href="/kontak"
                className={`px-3 py-1 rounded transition-colors ${
                  pathname === "/kontak"
                    ? "text-amber-400 font-semibold"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                Kontak
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 text-white border-t border-zinc-800 px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md font-bold text-sm ${
                pathname === "/" ? "bg-amber-400 text-zinc-950" : "text-zinc-200 hover:bg-zinc-800"
              }`}
            >
              Beranda
            </Link>

            <div className="pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 px-3">
              Kategori Berita
            </div>

            {CATEGORIES.map((cat) => {
              const isActive = pathname === `/kategori/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={`/kategori/${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md font-semibold text-sm ${
                    isActive ? "bg-amber-400 text-zinc-950" : "text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={isActive ? "text-zinc-950" : "text-amber-400"}>
                      {categoryIcons[cat.slug]}
                    </span>
                    <span>{cat.name}</span>
                  </span>
                  <ChevronDown className="-rotate-90 w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <div className="pt-3 border-t border-zinc-800 space-y-1">
              <Link
                href="/tentang-kami"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-md"
              >
                Tentang Kami & Redaksi
              </Link>
              <Link
                href="/kontak"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 rounded-md"
              >
                Hubungi Kami
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-zinc-800 text-amber-400 rounded-md font-bold"
              >
                <Flame className="w-4 h-4" />
                Masuk ke CMS Admin
              </Link>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
