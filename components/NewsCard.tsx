"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, User } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
  variant?: "vertical" | "horizontal" | "compact";
  showCategory?: boolean;
}

export default function NewsCard({
  news,
  variant = "vertical",
  showCategory = true,
}: NewsCardProps) {
  const categoryBadgeColors: Record<string, string> = {
    "Politik": "bg-red-500 text-white",
    "Ekonomi": "bg-emerald-600 text-white",
    "Olahraga": "bg-blue-600 text-white",
    "Wisata Grobogan": "bg-amber-500 text-zinc-950 font-bold",
    "Seputar Purwodadi": "bg-purple-600 text-white",
  };

  if (variant === "horizontal") {
    return (
      <article className="group flex flex-col sm:flex-row gap-4 bg-white p-3.5 rounded-lg border border-zinc-200/80 hover:border-amber-400/80 hover:shadow-md transition-all">
        <Link
          href={`/berita/${news.slug}`}
          className="relative w-full sm:w-48 h-36 shrink-0 overflow-hidden rounded-md bg-zinc-100"
        >
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {showCategory && (
            <span
              className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded shadow-sm ${
                categoryBadgeColors[news.category] || "bg-zinc-800 text-white"
              }`}
            >
              {news.category}
            </span>
          )}
        </Link>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {formatTimeAgo(news.publishedAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
                {news.viewsCount.toLocaleString("id-ID")} pembaca
              </span>
            </div>

            <Link href={`/berita/${news.slug}`}>
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug font-serif">
                {news.title}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 mt-1.5 leading-relaxed">
              {news.summary}
            </p>
          </div>

          <div className="mt-2.5 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400">
            <span className="flex items-center gap-1 text-zinc-600 font-medium">
              <User className="w-3 h-3 text-zinc-400" />
              {news.author}
            </span>
            <span className="text-[11px] text-zinc-400">{news.readTime || "3 mnt"}</span>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="group flex gap-3 py-3 border-b border-zinc-200/60 last:border-0">
        <Link
          href={`/berita/${news.slug}`}
          className="relative w-20 h-20 shrink-0 overflow-hidden rounded bg-zinc-100"
        >
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            sizes="80px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            {showCategory && (
              <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                {news.category}
              </span>
            )}
            <Link href={`/berita/${news.slug}`}>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-tight">
                {news.title}
              </h4>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-1">
            <span>{formatTimeAgo(news.publishedAt)}</span>
            <span>•</span>
            <span>{news.viewsCount.toLocaleString("id-ID")} views</span>
          </div>
        </div>
      </article>
    );
  }

  // Default: Vertical Grid Card
  return (
    <article className="group flex flex-col bg-white rounded-lg border border-zinc-200/80 overflow-hidden hover:border-amber-400/80 hover:shadow-lg transition-all duration-200">
      <Link
        href={`/berita/${news.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100"
      >
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showCategory && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded shadow-md ${
              categoryBadgeColors[news.category] || "bg-zinc-800 text-white"
            }`}
          >
            {news.category}
          </span>
        )}
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              {formatTimeAgo(news.publishedAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-zinc-400" />
              {news.viewsCount.toLocaleString("id-ID")}
            </span>
          </div>

          <Link href={`/berita/${news.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug font-serif">
              {news.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 mt-2 leading-relaxed">
            {news.summary}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-1.5 font-medium text-zinc-700">
            <User className="w-3.5 h-3.5 text-zinc-400" />
            {news.author}
          </span>
          <span className="text-[11px] text-zinc-400">{news.readTime || "3 mnt baca"}</span>
        </div>
      </div>
    </article>
  );
}
