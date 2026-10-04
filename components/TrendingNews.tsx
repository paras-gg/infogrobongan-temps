"use client";

import React from "react";
import Link from "next/link";
import { Flame, TrendingUp, Eye, Clock } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";

interface TrendingNewsProps {
  news: NewsItem[];
  title?: string;
  variant?: "sidebar" | "section";
}

export default function TrendingNews({
  news,
  title = "Berita Terpopuler",
  variant = "sidebar",
}: TrendingNewsProps) {
  const trendingList = news.slice(0, 5);

  if (variant === "section") {
    return (
      <section className="my-10 bg-zinc-950 text-white rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-amber-400 text-zinc-950">
              <Flame className="w-5 h-5 fill-zinc-950" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                {title}
              </h2>
              <p className="text-xs text-zinc-400">
                Paling banyak dibaca warganet Grobogan pekan ini
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendingList.map((item, index) => (
            <Link
              key={item.id}
              href={`/berita/${item.slug}`}
              className="group p-4 bg-zinc-900 border border-zinc-800 hover:border-amber-400 rounded-lg flex flex-col justify-between transition-all"
            >
              <div>
                <span className="text-3xl font-black text-amber-400/80 group-hover:text-amber-400 font-serif">
                  0{index + 1}
                </span>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block mt-1 tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-300 transition-colors line-clamp-3 mt-1.5 leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-amber-400" />
                  {item.viewsCount.toLocaleString("id-ID")}
                </span>
                <span>{formatTimeAgo(item.publishedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // Sidebar Widget Variant
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
      <div className="bg-zinc-950 text-white px-5 py-3.5 flex items-center justify-between border-b border-zinc-800">
        <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>{title}</span>
        </h3>
        <span className="text-[10px] uppercase font-semibold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded">
          Top 5
        </span>
      </div>

      <div className="divide-y divide-zinc-100 p-2">
        {trendingList.map((item, index) => (
          <Link
            key={item.id}
            href={`/berita/${item.slug}`}
            className="group flex gap-3 p-3 hover:bg-amber-50/50 rounded-lg transition-colors"
          >
            <span
              className={`text-2xl font-black font-serif w-8 shrink-0 flex items-center justify-center ${
                index === 0
                  ? "text-amber-500"
                  : index === 1
                  ? "text-zinc-800"
                  : index === 2
                  ? "text-zinc-600"
                  : "text-zinc-400"
              }`}
            >
              {index + 1}
            </span>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                {item.category}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-1.5">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3 text-zinc-400" />
                  {item.viewsCount.toLocaleString("id-ID")}
                </span>
                <span>•</span>
                <span>{formatTimeAgo(item.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
