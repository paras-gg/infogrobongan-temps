"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, UserCheck, Bell, Shield } from "lucide-react";

export default function AdminNavbar() {
  return (
    <header className="h-16 bg-white border-b border-zinc-200 px-6 flex items-center justify-between shrink-0">
      
      {/* Title / Status */}
      <div className="flex items-center gap-3">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Sistem CMS:
          </span>
          <span className="text-xs font-bold text-zinc-900 bg-zinc-100 px-2.5 py-0.5 rounded-full">
            Online & Aktif
          </span>
        </div>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-zinc-950 text-xs font-bold transition-colors shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Lihat Web Portal</span>
        </Link>

        <div className="h-6 w-px bg-zinc-200"></div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-950 text-amber-400 flex items-center justify-center font-bold text-xs border border-zinc-700">
            BP
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-zinc-900 leading-none">
              Bagus Prasetyo
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">
              Pemimpin Redaksi
            </p>
          </div>
        </div>
      </div>

    </header>
  );
}
