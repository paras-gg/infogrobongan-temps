"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowUpRight
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/newsData";
import { CATEGORIES } from "@/lib/types";
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t-4 border-amber-400 mt-auto">
      
      {/* Top Banner / Mission Statement */}
      <div className="border-b border-zinc-800/80 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-zinc-950 shadow-md">
                <Image
                  src={BRAND_CONFIG.logoUrl}
                  alt="Info Grobogan"
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-black font-serif text-white tracking-wide">
                  INFO <span className="text-amber-400">GROBOGAN</span>
                </h3>
                <p className="text-sm text-zinc-400 max-w-lg mt-0.5">
                  Portal Berita Terkini & Terpercaya Kabupaten Grobogan. Mengabarkan fakta dengan independen, akurat, dan mengedukasi masyarakat.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/tentang-kami"
                className="px-4 py-2 text-xs font-bold rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-1.5"
              >
                Susunan Redaksi
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/kontak"
                className="px-4 py-2 text-xs font-bold rounded bg-amber-400 text-zinc-950 hover:bg-amber-500 transition-colors"
              >
                Hubungi Redaksi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: About & Address */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">
              Kantor Redaksi
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BRAND_CONFIG.phone} (WhatsApp Redaksi)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BRAND_CONFIG.email}</span>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-xs text-zinc-500 font-medium">Ikuti Kanal Media Sosial Kami:</p>
              <div className="flex items-center space-x-3 mt-2 text-zinc-300">
                <a
                  href={BRAND_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 transition-colors"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_CONFIG.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 transition-colors"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a
                  href={BRAND_CONFIG.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-amber-400 hover:text-zinc-950 transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">
              Kategori Berita
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60"></span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Media Guidelines & Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">
              Informasi & Regulasi
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/tentang-kami#visi-misi" className="hover:text-amber-400 transition-colors">
                  Visi & Misi Portal
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#kode-etik" className="hover:text-amber-400 transition-colors">
                  Kode Etik Jurnalistik
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami#pedoman-siber" className="hover:text-amber-400 transition-colors">
                  Pedoman Pemberitaan Media Siber
                </Link>
              </li>
              <li>
                <Link href="/kontak#kirim-rilis" className="hover:text-amber-400 transition-colors">
                  Kirim Rilis Pers & Opini Warga
                </Link>
              </li>
              <li>
                <Link href="/kontak#pasang-iklan" className="hover:text-amber-400 transition-colors">
                  Pasang Iklan / Advertorial
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-300 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Masuk Dashboard Redaksi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Verification badge */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-zinc-800 pb-2">
              Langganan Berita
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dapatkan rangkuman peristiwa penting seputar Purwodadi & Kabupaten Grobogan langsung ke email Anda setiap pagi.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Terima kasih telah berlangganan buletin Info Grobogan!"); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Alamat email Anda..."
                className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-700 rounded text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold text-xs py-2 rounded transition-colors"
              >
                Langganan Sekarang
              </button>
            </form>
            <div className="p-3 bg-zinc-900 rounded border border-zinc-800 text-[11px] text-zinc-400">
              <span className="font-semibold text-zinc-200">Terdaftar di Dewan Pers:</span> Portal berita resmi menyajikan informasi berdasarkan UU Pers No. 40 Tahun 1999.
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="bg-black py-4 border-t border-zinc-900 text-xs text-zinc-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 <strong>Info Grobogan</strong>. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center space-x-4">
            <Link href="/tentang-kami" className="hover:text-zinc-300">Tentang Kami</Link>
            <span>•</span>
            <Link href="/kontak" className="hover:text-zinc-300">Hubungi Kami</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-amber-400">CMS Admin</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
