"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  ExternalLink, 
  RotateCcw, 
  Layers, 
  Settings,
  ShieldAlert
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/newsData";
import { useNews } from "@/lib/NewsContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { resetToDefault } = useNews();

  const handleReset = () => {
    if (confirm("Apakah Anda yakin ingin mengatur ulang data berita ke data mock awal?")) {
      resetToDefault();
      alert("Data berhasil direset ke pengaturan default!");
    }
  };

  const navItems = [
    {
      label: "Dashboard & Berita",
      href: "/admin",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "Tulis Berita Baru",
      href: "/admin/berita/tambah",
      icon: <PlusCircle className="w-4 h-4" />,
    },
  ];

  return (
    <aside className="w-64 bg-zinc-950 text-zinc-300 flex flex-col border-r border-zinc-800 shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-zinc-800 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-zinc-900">
          <Image
            src={BRAND_CONFIG.logoUrl}
            alt="Logo"
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div>
          <span className="font-black text-sm font-serif tracking-tight text-white block">
            CMS REDAKSI
          </span>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
            Info Grobogan
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Menu Utama
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? "bg-amber-400 text-zinc-950 shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <span className={isActive ? "text-zinc-950" : "text-amber-400"}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Akses Portal
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
        >
          <span className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-emerald-400" />
            <span>Lihat Web Publik</span>
          </span>
          <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">
            Tab baru
          </span>
        </Link>
      </div>

      {/* Bottom Tools */}
      <div className="p-4 border-t border-zinc-800 space-y-3">
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 text-xs font-semibold border border-zinc-800 transition-colors"
          title="Kembalikan semua artikel ke seed mock data awal"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset ke Data Awal</span>
        </button>

        <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
          <p className="font-bold text-zinc-200">Mode Penyimpanan:</p>
          <p className="text-[10px] text-zinc-500 mt-0.5">
            Object Store / Local Browser Sync (Real-time reactivity).
          </p>
        </div>
      </div>
    </aside>
  );
}
