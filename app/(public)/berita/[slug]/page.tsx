"use client";

import React, { useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { 
  Clock, 
  Eye, 
  User, 
  ChevronRight, 
  Calendar, 
  Bookmark, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useNews } from "@/lib/NewsContext";
import { formatDateTimeIndo } from "@/lib/utils";
import ShareButtons from "@/components/ShareButtons";
import TrendingNews from "@/components/TrendingNews";
import NewsCard from "@/components/NewsCard";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const { news, getNewsBySlug, incrementViews, getTrendingNews } = useNews();

  const article = getNewsBySlug(slug);

  // Increment views once on load
  useEffect(() => {
    if (article) {
      incrementViews(article.id);
    }
  }, [article?.id]);

  if (!article) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">Berita Tidak Ditemukan</h1>
        <p className="text-zinc-600 text-sm mb-6">
          Maaf, berita dengan judul tersebut mungkin telah dipindahkan atau dihapus dari sistem.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg hover:bg-amber-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Related news: same category, excluding current article
  const relatedNews = news
    .filter((n) => n.category === article.category && n.id !== article.id)
    .slice(0, 3);

  // Trending
  const trendingNews = getTrendingNews();

  // Category slug helper
  const categorySlug = article.category.toLowerCase().replace(/\s+/g, "-");

  // Format paragraphs from content
  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="py-2">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-1.5 text-xs text-zinc-500 mb-6 overflow-x-auto whitespace-nowrap py-1">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <Link
          href={`/kategori/${categorySlug}`}
          className="hover:text-amber-600 font-medium transition-colors"
        >
          {article.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-800 font-semibold truncate max-w-xs sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Article Column (8 cols) */}
        <article className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200/80 shadow-sm">
          
          {/* Header Meta */}
          <div className="mb-4">
            <Link
              href={`/kategori/${categorySlug}`}
              className="inline-block px-3 py-1 bg-amber-400 text-zinc-950 text-xs font-black rounded uppercase tracking-wider mb-3 hover:bg-amber-500 transition-colors"
            >
              {article.category}
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif text-zinc-950 leading-tight mb-4">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 font-serif leading-relaxed mb-6 italic border-l-2 border-amber-400 pl-4 bg-amber-50/40 py-2 rounded-r">
              {article.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-zinc-100 text-xs text-zinc-500">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-900 text-amber-400 flex items-center justify-center font-bold uppercase text-sm border border-zinc-700">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-zinc-900">{article.author}</p>
                  <p className="text-[11px] text-zinc-400">Jurnalis Info Grobogan</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {formatDateTimeIndo(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  {article.viewsCount.toLocaleString("id-ID")} kali dilihat
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-100 shadow-sm border border-zinc-200">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
            {article.imageCaption && (
              <p className="text-xs text-zinc-500 mt-2 px-1 italic">
                Foto: {article.imageCaption}
              </p>
            )}
          </div>

          {/* Social Share Buttons (Top) */}
          <ShareButtons title={article.title} />

          {/* Article Body */}
          <div className="article-content text-zinc-800 leading-relaxed font-sans text-base sm:text-lg">
            {paragraphs.map((paragraph, index) => {
              // Add a nice visual pullquote or callout after paragraph 2
              if (index === 2 && article.summary) {
                return (
                  <React.Fragment key={index}>
                    <p>{paragraph}</p>
                    <div className="my-6 p-4 sm:p-5 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-lg">
                      <p className="text-sm sm:text-base font-serif italic text-amber-950 font-medium">
                        &ldquo;{article.summary}&rdquo;
                      </p>
                      <span className="block text-xs text-amber-800 font-bold mt-2">
                        — Redaksi Info Grobogan
                      </span>
                    </div>
                  </React.Fragment>
                );
              }
              return <p key={index}>{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-zinc-200">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2.5">
                Topik Terkait:
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded bg-zinc-100 hover:bg-amber-400 hover:text-zinc-950 text-zinc-700 text-xs font-semibold transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Buttons (Bottom) */}
          <ShareButtons title={article.title} />

          {/* Author Box */}
          <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center gap-4 mt-6">
            <div className="w-12 h-12 rounded-full bg-zinc-950 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0 border-2 border-amber-400">
              {article.author.charAt(0)}
            </div>
            <div>
              <h4 className="font-bold text-sm text-zinc-950">
                Ditulis oleh: {article.author}
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Jurnalis liputan daerah Kabupaten Grobogan. Mengawal transparansi informasi publik dan dinamika lokal Purwodadi dan sekitarnya.
              </p>
            </div>
          </div>

          {/* Related News in Same Category */}
          {relatedNews.length > 0 && (
            <div className="mt-12 pt-8 border-t-2 border-zinc-900">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-black text-xl font-serif text-zinc-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm"></span>
                  Berita Terkait Lainnya
                </h3>
                <Link
                  href={`/kategori/${categorySlug}`}
                  className="text-xs font-bold text-amber-600 hover:underline"
                >
                  Lihat Kategori {article.category} &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedNews.map((item) => (
                  <NewsCard key={item.id} news={item} variant="vertical" showCategory={false} />
                ))}
              </div>
            </div>
          )}

        </article>

        {/* Sidebar Column (4 cols) */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Trending News */}
          <TrendingNews news={trendingNews} title="Berita Terpopuler" />

          {/* Category Shortcut Box */}
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-900 mb-3 pb-2 border-b border-zinc-100">
              Kanal Berita
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/kategori/seputar-purwodadi"
                  className="flex items-center justify-between p-2 rounded hover:bg-zinc-100 transition-colors text-zinc-700 font-medium"
                >
                  <span>Seputar Purwodadi</span>
                  <span className="text-zinc-400">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/wisata-grobogan"
                  className="flex items-center justify-between p-2 rounded hover:bg-zinc-100 transition-colors text-zinc-700 font-medium"
                >
                  <span>Wisata Grobogan</span>
                  <span className="text-zinc-400">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/ekonomi"
                  className="flex items-center justify-between p-2 rounded hover:bg-zinc-100 transition-colors text-zinc-700 font-medium"
                >
                  <span>Ekonomi</span>
                  <span className="text-zinc-400">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/politik"
                  className="flex items-center justify-between p-2 rounded hover:bg-zinc-100 transition-colors text-zinc-700 font-medium"
                >
                  <span>Politik</span>
                  <span className="text-zinc-400">&rarr;</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/olahraga"
                  className="flex items-center justify-between p-2 rounded hover:bg-zinc-100 transition-colors text-zinc-700 font-medium"
                >
                  <span>Olahraga</span>
                  <span className="text-zinc-400">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Redaksi Contact Widget */}
          <div className="bg-amber-400 text-zinc-950 rounded-xl p-5 shadow-sm">
            <h4 className="font-black text-sm font-serif uppercase tracking-wider mb-2">
              Kritik, Saran & Hak Jawab
            </h4>
            <p className="text-xs text-zinc-900 leading-relaxed mb-4">
              Info Grobogan menjunjung tinggi Kode Etik Jurnalistik dan melayani hak jawab masyarakat sesuai peraturan perundangan pers.
            </p>
            <Link
              href="/kontak"
              className="inline-block w-full py-2 px-3 text-center bg-zinc-950 text-white hover:bg-zinc-800 rounded font-bold text-xs transition-colors"
            >
              Hubungi Redaksi
            </Link>
          </div>

        </aside>

      </div>

    </div>
  );
}
