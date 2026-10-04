"use client";

import React from "react";
import NewsForm from "@/components/admin/NewsForm";
import { useNews } from "@/lib/NewsContext";

export default function TambahBeritaPage() {
  const { addNews } = useNews();

  const handleAddNews = (data: any) => {
    addNews(data);
  };

  return (
    <div className="py-2">
      <NewsForm onSubmit={handleAddNews} isEdit={false} />
    </div>
  );
}
