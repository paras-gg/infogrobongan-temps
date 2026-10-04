"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  CloudSun, 
  ShieldCheck, 
  Flame 
} from "lucide-react";
import { useNews } from "@/lib/NewsContext";
import { BRAND_CONFIG } from "@/lib/newsData";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/SocialIcons";

export default function TopBar() {
  const { news } = useNews();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
    setCurrentDate(formatted);
  }, []);

  // Top trending or recent news for ticker
  const tickerItems = news.slice(0, 5);

  return (
    <div className="bg-zinc-900 text-zinc-300 text-xs border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-1.5 gap-2">
          
          {/* Left: Date & Weather */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentDate || "Kamis, 24 September 2026"}</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1.5 text-zinc-400 border-l border-zinc-700 pl-3">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>Purwodadi 29°C Cerah Berawan</span>
            </div>
          </div>

          {/* Center: Running Ticker */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 max-w-xl mx-4 overflow-hidden">
            <span className="flex items-center gap-1 bg-amber-400 text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
              <Flame className="w-3 h-3 fill-zinc-950" />
              Terkini
            </span>
            <div className="overflow-hidden relative w-full h-5">
              <div className="flex space-x-8 animate-ticker">
                {tickerItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/berita/${item.slug}`}
                    className="hover:text-amber-400 transition-colors whitespace-nowrap"
                  >
                    • {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Social Media & CMS Link */}
          <div className="flex items-center justify-between md:justify-end space-x-3 text-zinc-400">
            <div className="flex items-center space-x-2.5">
              <a
                href={BRAND_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors"
                title="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={BRAND_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={BRAND_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors"
                title="Twitter"
              >
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={BRAND_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors"
                title="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="border-l border-zinc-700 pl-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-zinc-800 hover:bg-amber-400 hover:text-zinc-950 text-zinc-200 transition-all font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 group-hover:text-zinc-950" />
                <span>Portal CMS</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
