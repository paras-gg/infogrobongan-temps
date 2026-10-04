"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  FileText, 
  Eye, 
  Layers, 
  Flame, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  ExternalLink,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNews } from "@/lib/NewsContext";
import { CATEGORIES, NewsCategory } from "@/lib/types";
import { formatDateIndo } from "@/lib/utils";
import StatCard from "@/components/admin/StatCard";

export default function AdminDashboardPage() {
  const { news, deleteNews, toggleTrending } = useNews();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Stats calculation
  const totalNews = news.length;
  const totalViews = news.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
  const totalCategories = CATEGORIES.length;
  const trendingCount = news.filter((n) => n.isTrending).length;

  // Filtered news for table
  const filteredNews = news.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const handleDelete = (id: string) => {
    deleteNews(id);
    setDeleteConfirmId(null);
  };

  const categoryBadgeColors: Record<string, string> = {
    "Politik": "bg-red-50 text-red-700 border-red-200",
    "Ekonomi": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Olahraga": "bg-blue-50 text-blue-700 border-blue-200",
    "Wisata Grobogan": "bg-amber-50 text-amber-800 border-amber-300 font-bold",
    "Seputar Purwodadi": "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-zinc-950">
            Pusat Kendali Redaksi (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Kelola publikasi naskah, pantau statistik pembaca, dan kurasi berita daerah Info Grobogan.
          </p>
        </div>

        <Link
          href="/admin/berita/tambah"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-xs rounded-lg transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Berita Baru</span>
        </Link>
      </div>

      {/* 1. Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Berita"
          value={totalNews}
          description="Artikel tayang di portal"
          icon={<FileText className="w-6 h-6" />}
          color="amber"
          trend="+Aktif"
        />
        <StatCard
          label="Total Pembaca"
          value={totalViews.toLocaleString("id-ID")}
          description="Akumulasi tayangan artikel"
          icon={<Eye className="w-6 h-6" />}
          color="blue"
          trend="Real-time"
        />
        <StatCard
          label="Kategori Utama"
          value={totalCategories}
          description="Kanal rubrik daerah"
          icon={<Layers className="w-6 h-6" />}
          color="emerald"
        />
        <StatCard
          label="Berita Trending"
          value={trendingCount}
          description="Ditampilkan di widget populer"
          icon={<Flame className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* 2. News Management (Table View) */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        
        {/* Table Filters & Search Bar */}
        <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-50/50">
          <div>
            <h2 className="text-base font-bold text-zinc-900 font-serif">
              Daftar Seluruh Berita
            </h2>
            <p className="text-xs text-zinc-500">
              Total {filteredNews.length} artikel ditemukan
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul atau jurnalis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-zinc-300 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-medium"
              >
                <option value="all">Semua Kategori</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-zinc-100 text-zinc-600 font-bold uppercase tracking-wider text-[11px] border-b border-zinc-200">
              <tr>
                <th className="py-3 px-4">Artikel Berita</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4">Tanggal Terbit</th>
                <th className="py-3 px-4 text-center">Tayangan</th>
                <th className="py-3 px-4 text-center">Trending</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-400">
                    Tidak ada berita yang sesuai dengan filter atau kata kunci.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/80 transition-colors">
                    
                    {/* Artikel & Thumbnail */}
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-11 rounded overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-zinc-900 truncate font-serif text-sm">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {item.isHeadline && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] bg-amber-400 text-zinc-950 font-bold px-1.5 py-0.2 rounded">
                                <Star className="w-2.5 h-2.5 fill-zinc-950" />
                                Headline
                              </span>
                            )}
                            <span className="text-[11px] text-zinc-400 truncate">
                              /{item.slug}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded text-[11px] border font-medium ${
                          categoryBadgeColors[item.category] || "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>

                    {/* Penulis */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-zinc-800">
                      {item.author}
                    </td>

                    {/* Tanggal */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-zinc-500">
                      {formatDateIndo(item.publishedAt)}
                    </td>

                    {/* Tayangan */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center font-bold text-zinc-900">
                      {item.viewsCount.toLocaleString("id-ID")}
                    </td>

                    {/* Trending Toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleTrending(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                          item.isTrending
                            ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
                            : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                        }`}
                        title="Klik untuk beralih status trending"
                      >
                        <Flame
                          className={`w-3 h-3 ${
                            item.isTrending ? "text-amber-500 fill-amber-500" : "text-zinc-400"
                          }`}
                        />
                        <span>{item.isTrending ? "Ya" : "Tidak"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded transition-colors"
                          title="Lihat Berita di Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/berita/edit/${item.id}`}
                          className="p-1.5 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded transition-colors"
                          title="Edit Berita"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Hapus Berita"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4 shadow-xl border border-zinc-200">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-base text-zinc-950 font-serif">
                Konfirmasi Hapus Berita
              </h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini akan menghapus berita dari portal secara langsung.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold border border-zinc-300 text-zinc-700 hover:bg-zinc-50"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-700 shadow-sm"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
