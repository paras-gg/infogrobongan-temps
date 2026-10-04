"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsForm from "@/components/admin/NewsForm";
import { useNews } from "@/lib/NewsContext";

interface EditBeritaPageProps {
  params: Promise<{ id: string }>;
}

export default function EditBeritaPage({ params }: EditBeritaPageProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const { news, updateNews } = useNews();

  const article = news.find((item) => item.id === id);

  if (!article) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h2 className="text-xl font-bold text-zinc-900 mb-2">Berita Tidak Ditemukan</h2>
        <p className="text-zinc-500 text-xs mb-6">
          Artikel dengan ID &ldquo;{id}&rdquo; mungkin sudah dihapus atau tidak tersedia.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400 text-zinc-950 font-bold text-xs rounded-lg hover:bg-amber-500"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  const handleUpdateNews = (data: any) => {
    updateNews(id, data);
  };

  return (
    <div className="py-2">
      <NewsForm
        initialData={article}
        onSubmit={handleUpdateNews}
        isEdit={true}
      />
    </div>
  );
}
