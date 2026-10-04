"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Save, 
  ArrowLeft, 
  Image as ImageIcon, 
  Sparkles, 
  Eye, 
  Check, 
  Flame, 
  Star,
  Quote,
  Heading,
  List
} from "lucide-react";
import { NewsItem, NewsCategory } from "@/lib/types";
import { slugify } from "@/lib/utils";

interface NewsFormProps {
  initialData?: NewsItem;
  onSubmit: (data: Omit<NewsItem, "id" | "viewsCount">) => void;
  isEdit?: boolean;
}

const PRESET_IMAGES = [
  {
    name: "Simpang Lima Purwodadi",
    url: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Lumpur Bledug Kuwu",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Sawah & Kedelai Grobogan",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Stadion & Persipur",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Api Abadi Mrapen",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kuliner Tradisional",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Rapat & Pemerintahan",
    url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Waduk Kedung Ombo",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function NewsForm({ initialData, onSubmit, isEdit = false }: NewsFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState<NewsCategory>(
    initialData?.category || "Seputar Purwodadi"
  );
  const [author, setAuthor] = useState(initialData?.author || "Bagus Prasetyo");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || PRESET_IMAGES[0].url
  );
  const [imageCaption, setImageCaption] = useState(initialData?.imageCaption || "");
  const [isTrending, setIsTrending] = useState(initialData?.isTrending || false);
  const [isHeadline, setIsHeadline] = useState(initialData?.isHeadline || false);
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags ? initialData.tags.join(", ") : "Grobogan, Purwodadi"
  );
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Auto-slug from title
  useEffect(() => {
    if (autoSlug) {
      setSlug(slugify(title));
    }
  }, [title, autoSlug]);

  const insertSnippet = (snippet: string) => {
    setContent((prev) => prev + "\n" + snippet);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !summary.trim()) {
      alert("Mohon lengkapi Judul, Ringkasan, dan Konten Berita!");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const formattedData: Omit<NewsItem, "id" | "viewsCount"> = {
      title,
      slug: slug || slugify(title),
      summary,
      content,
      category,
      author,
      imageUrl,
      imageCaption,
      isTrending,
      isHeadline,
      tags,
      publishedAt: initialData?.publishedAt || new Date().toISOString(),
    };

    onSubmit(formattedData);
    setSavedSuccess(true);

    setTimeout(() => {
      router.push("/admin");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-serif text-zinc-950">
              {isEdit ? "Edit Berita Redaksi" : "Tulis Berita Baru"}
            </h1>
            <p className="text-xs text-zinc-500">
              {isEdit
                ? "Perbarui konten berita yang sudah diterbitkan di portal"
                : "Publikasikan kabar terbaru untuk pembaca Info Grobogan"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="px-4 py-2 border border-zinc-300 rounded-lg text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-amber-400 hover:bg-amber-500 text-zinc-950 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isEdit ? "Simpan Perubahan" : "Terbitkan Berita"}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3 text-emerald-900">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-sm font-bold">
            Berita berhasil {isEdit ? "diperbarui" : "diterbitkan"}! Mengalihkan ke dashboard...
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Main Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Judul Berita */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              Judul Berita Utama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul berita yang menarik dan informatif..."
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-base font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
            />

            {/* Slug Editor */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                <span>Slug URL:</span>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-amber-600 hover:underline font-semibold"
                >
                  {autoSlug ? "Ubah Manual" : "Otomatis dari Judul"}
                </button>
              </div>
              <input
                type="text"
                value={slug}
                disabled={autoSlug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full px-3 py-1.5 bg-zinc-100 border border-zinc-200 rounded text-xs text-zinc-700 font-mono disabled:opacity-75"
              />
            </div>
          </div>

          {/* Ringkasan Berita (Summary) */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
              Ringkasan Berita (Lead / Excerpt) <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tuliskan 1-2 kalimat ringkasan inti berita untuk pengantar pembaca dan cuplikan kartu..."
              className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white resize-y"
            ></textarea>
          </div>

          {/* Konten Utama */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                Isi Berita Lengkap <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => insertSnippet("\nPURWODADI — ")}
                  className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 rounded text-[11px] font-semibold text-zinc-700"
                >
                  + Dateline Purwodadi
                </button>
                <button
                  type="button"
                  onClick={() => insertSnippet('\n"Kutipan pernyataan narasumber di sini," tegasnya.\n')}
                  className="px-2 py-1 bg-zinc-100 hover:bg-zinc-200 rounded text-[11px] font-semibold text-zinc-700 flex items-center gap-1"
                >
                  <Quote className="w-3 h-3" /> Kutipan
                </button>
              </div>
            </div>

            <textarea
              required
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan seluruh naskah berita di sini. Pisahkan antar-paragraf dengan baris baru ganda (Enter dua kali)..."
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white font-sans leading-relaxed resize-y"
            ></textarea>
            <p className="text-[11px] text-zinc-400">
              Tips: Gunakan pemisahan paragraf yang rapi agar nyaman dibaca pembaca ponsel.
            </p>
          </div>

        </div>

        {/* Right Column (4 cols): Meta, Image & Toggles */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Metadata Card: Kategori & Penulis */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2">
              Klasifikasi & Penulis
            </h3>

            {/* Kategori Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Kategori Berita <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NewsCategory)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-semibold"
              >
                <option value="Seputar Purwodadi">Seputar Purwodadi</option>
                <option value="Wisata Grobogan">Wisata Grobogan</option>
                <option value="Ekonomi">Ekonomi</option>
                <option value="Politik">Politik</option>
                <option value="Olahraga">Olahraga</option>
              </select>
            </div>

            {/* Penulis */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Nama Penulis / Editor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nama Jurnalis..."
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Tag / Topik Terkait (Pisahkan Koma)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Grobogan, Purwodadi, Wisata"
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2">
              Status & Penempatan
            </h3>

            {/* Trending Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 cursor-pointer">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Set as Trending
                </label>
                <p className="text-[11px] text-zinc-500">
                  Tampilkan di daftar Berita Terpopuler
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTrending(!isTrending)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isTrending ? "bg-amber-400" : "bg-zinc-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isTrending ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Headline Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
              <div>
                <label className="text-xs font-bold text-zinc-900 flex items-center gap-1.5 cursor-pointer">
                  <Star className="w-4 h-4 text-amber-500" />
                  Jadikan Headline Utama
                </label>
                <p className="text-[11px] text-zinc-500">
                  Tampilkan di Banner Paling Atas Beranda
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHeadline(!isHeadline)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isHeadline ? "bg-amber-400" : "bg-zinc-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isHeadline ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Gambar Berita & Preset */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-900 border-b border-zinc-100 pb-2 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-amber-500" />
              Gambar Utama Berita
            </h3>

            {/* Preview Image */}
            <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-zinc-400">
                  Belum ada URL gambar
                </div>
              )}
            </div>

            {/* Image URL Input */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                URL Gambar (https://...) <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Image Caption */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 mb-1">
                Keterangan Foto / Sumber
              </label>
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Dokumentasi Humas Grobogan / Istimewa"
                className="w-full px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-900"
              />
            </div>

            {/* Preset Image Options */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-zinc-500 block mb-2">
                Pilih Dari Foto Preset Grobogan:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setImageCaption(`Dokumentasi ${preset.name}`);
                    }}
                    className={`text-left p-1.5 rounded border text-[10px] truncate transition-colors ${
                      imageUrl === preset.url
                        ? "bg-amber-100 border-amber-400 text-amber-900 font-bold"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    • {preset.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </form>
  );
}
