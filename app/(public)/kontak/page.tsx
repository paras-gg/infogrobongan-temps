"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Building,
  Newspaper
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/newsData";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Liputan / Berita Warga",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Liputan / Berita Warga",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="py-2 space-y-10">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-1.5 text-xs text-zinc-500">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-900 font-bold">Hubungi Kami</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-10 border border-zinc-800">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
          Kanal Komunikasi Publik
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight mb-3">
          Hubungi Redaksi Info Grobogan
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Punya informasi peristiwa penting, rilis pers instansi, pengaduan layanan publik, atau ingin bekerja sama pemasangan iklan advertorial? Kami siap mendengar suara Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (7 cols): Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b border-zinc-100">
            <Send className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold font-serif text-zinc-950">
              Kirim Pesan / Pengaduan Redaksi
            </h2>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-900">
                Pesan Anda Berhasil Terkirim!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                Terima kasih atas kontribusi Anda. Tim redaksi Info Grobogan akan segera meninjau dan menindaklanjuti pesan Anda dalam kurun waktu 1x24 jam kerja.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                Kirim Pesan Lainnya
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Rian Anggara"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Alamat Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                    Kategori Keperluan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                  >
                    <option value="Liputan / Berita Warga">Liputan / Informasi Warga</option>
                    <option value="Rilis Pers / Instansi">Rilis Pers Pemerintah / Instansi</option>
                    <option value="Kerjasama Iklan & Advertorial">Kerjasama Iklan & Advertorial</option>
                    <option value="Hak Jawab & Koreksi Berita">Hak Jawab & Koreksi Berita</option>
                    <option value="Kritik & Saran Redaksi">Kritik & Saran Redaksi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase mb-1">
                  Isi Pesan / Keterangan Berita <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan kronologi peristiwa, lokasi kejadian (Kecamatan/Desa), atau maksud penawaran kerjasama Anda secara rinci..."
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-zinc-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <span>Mengirim pesan...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim ke Redaksi Info Grobogan</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column (5 cols): Office Location & Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Office Address Card */}
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm space-y-5">
            <h3 className="font-bold text-base text-zinc-950 flex items-center gap-2 border-b border-zinc-100 pb-3">
              <Building className="w-5 h-5 text-amber-500" />
              Kantor Redaksi Utama
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-zinc-900">Gedung Graha Pers Info Grobogan</p>
                  <p className="text-zinc-600 leading-relaxed mt-0.5">
                    {BRAND_CONFIG.address}
                  </p>
                  <p className="text-[11px] text-zinc-400 mt-1">
                    (Kompleks Perkantoran Simpang Lima Purwodadi)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-zinc-900">Telepon Kantor</p>
                  <p className="text-zinc-600">{BRAND_CONFIG.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-zinc-900">Hotline WhatsApp Redaksi</p>
                  <p className="text-zinc-600">{BRAND_CONFIG.whatsapp}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-zinc-900">Surat Elektronik (Email)</p>
                  <p className="text-zinc-600">Redaksi: {BRAND_CONFIG.email}</p>
                  <p className="text-zinc-600">Iklan: {BRAND_CONFIG.emailAds}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-zinc-900">Jam Kerja Pelayanan Kantor</p>
                  <p className="text-zinc-600">Senin - Sabtu: 08.00 - 17.00 WIB</p>
                  <p className="text-[11px] text-zinc-400">Tim piket liputan beroperasi 24 jam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="bg-zinc-900 text-white rounded-2xl p-6 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Peta Lokasi Kantor
              </span>
              <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400">
                Pusat Kota Purwodadi
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <MapPin className="w-5 h-5 fill-zinc-950" />
                </div>
                <p className="font-bold text-xs text-white">Simpang Lima Purwodadi</p>
                <p className="text-[10px] text-zinc-400">Jl. R.A. Kartini No. 45 Grobogan</p>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Lokasi kantor sangat mudah dijangkau, berjarak hanya 200 meter dari Tugu Simpang Lima Purwodadi ke arah barat.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
