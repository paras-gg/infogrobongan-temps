"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsItem, NewsCategory } from "@/lib/types";
import NewsCard from "./NewsCard";

interface CategorySectionProps {
  title: string;
  category: NewsCategory;
  categorySlug: string;
  items: NewsItem[];
  accentColor?: string;
  description?: string;
}

export default function CategorySection({
  title,
  category,
  categorySlug,
  items,
  description,
}: CategorySectionProps) {
  if (items.length === 0) return null;

  const [firstItem, ...restItems] = items;

  return (
    <section className="mb-12">
      {/* Category Header */}
      <div className="flex items-end justify-between pb-3 mb-5 border-b-2 border-zinc-900">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-zinc-950">
              {title}
            </h2>
          </div>
          {description && (
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          )}
        </div>

        <Link
          href={`/kategori/${categorySlug}`}
          className="text-xs font-bold text-zinc-700 hover:text-amber-600 flex items-center gap-1 group transition-colors"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Card (Larger) */}
        {firstItem && (
          <div className="md:col-span-6 lg:col-span-6">
            <NewsCard news={firstItem} variant="vertical" />
          </div>
        )}

        {/* Secondary Cards Column */}
        <div className="md:col-span-6 lg:col-span-6 flex flex-col justify-between gap-4">
          {restItems.slice(0, 3).map((item) => (
            <NewsCard key={item.id} news={item} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
