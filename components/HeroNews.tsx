"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, Flame, ArrowRight } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";

interface HeroNewsProps {
  headline: NewsItem;
  secondaryNews: NewsItem[];
}

export default function HeroNews({ headline, secondaryNews }: HeroNewsProps) {
  if (!headline) return null;

  return (
    <section className="mb-10">
      
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-zinc-900">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-amber-400 rounded-sm"></span>
          <h2 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-zinc-950">
            Fokus Utama Hari Ini
          </h2>
        </div>
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden sm:block">
          Edisi Grobogan & Sekitarnya
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Big Headline (8 cols on lg) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <article className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <Link
              href={`/berita/${headline.slug}`}
              className="relative aspect-[16/9] sm:aspect-[16/10] w-full overflow-hidden bg-zinc-900 block"
            >
              <Image
                src={headline.imageUrl}
                alt={headline.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>

              {/* Badge & Meta overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="bg-amber-400 text-zinc-950 font-black text-xs px-3 py-1 rounded shadow-lg uppercase tracking-wider">
                  Headline Utama
                </span>
                <span className="bg-zinc-900/90 text-zinc-100 text-xs px-2.5 py-1 rounded backdrop-blur-sm border border-zinc-700/50">
                  {headline.category}
                </span>
              </div>
            </Link>

            <div className="p-5 sm:p-7 flex flex-col flex-1 justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2.5">
                  <span className="font-semibold text-zinc-800">
                    Oleh: {headline.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    {formatTimeAgo(headline.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-zinc-400" />
                    {headline.viewsCount.toLocaleString("id-ID")} pembaca
                  </span>
                </div>

                <Link href={`/berita/${headline.slug}`}>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-serif text-zinc-950 group-hover:text-amber-600 transition-colors leading-tight">
                    {headline.title}
                  </h1>
                </Link>

                <p className="text-sm sm:text-base text-zinc-600 line-clamp-3 mt-3 leading-relaxed">
                  {headline.summary}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  href={`/berita/${headline.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-950 hover:text-amber-600 transition-colors"
                >
                  Baca Liputan Selengkapnya
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </Link>
                <span className="text-xs text-zinc-400">
                  Waktu baca: {headline.readTime || "3 menit"}
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Secondary Top Stories (5 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
          <div className="bg-zinc-950 text-white px-4 py-2.5 rounded-lg flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              Sorotan Pilihan
            </span>
            <span className="text-[11px] text-zinc-400">Terhangat</span>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            {secondaryNews.slice(0, 3).map((item, idx) => (
              <article
                key={item.id}
                className="group p-3.5 bg-white border border-zinc-200 rounded-lg hover:border-amber-400 hover:shadow-md transition-all flex gap-3.5"
              >
                <Link
                  href={`/berita/${item.slug}`}
                  className="relative w-28 sm:w-32 aspect-[4/3] rounded-md overflow-hidden bg-zinc-100 shrink-0"
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[9px] font-bold bg-zinc-900/90 text-amber-400 rounded">
                    #{idx + 1}
                  </span>
                </Link>

                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                      {item.category}
                    </span>
                    <Link href={`/berita/${item.slug}`}>
                      <h3 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug font-serif">
                        {item.title}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-2">
                    <span>{formatTimeAgo(item.publishedAt)}</span>
                    <span>•</span>
                    <span>{item.viewsCount.toLocaleString("id-ID")} views</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Quick Info Box */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
            <span className="font-medium">
              Punya informasi kejadian di sekitar Anda?
            </span>
            <Link
              href="/kontak"
              className="font-bold underline text-amber-950 hover:text-amber-700 shrink-0 ml-2"
            >
              Lapor Redaksi &rarr;
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
