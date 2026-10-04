import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Users, 
  Compass, 
  Building2, 
  Mail,
  ChevronRight
} from "lucide-react";
import { BRAND_CONFIG } from "@/lib/newsData";

export default function TentangKamiPage() {
  const redaksiList = [
    {
      jabatan: "Pemimpin Umum / Penanggung Jawab",
      nama: "H. Bambang Sulistyo, S.Sos., M.I.Kom.",
      deskripsi: "Bertanggung jawab atas keseluruhan arah kebijakan redaksi dan operasional pers.",
    },
    {
      jabatan: "Pemimpin Redaksi",
      nama: "Bagus Prasetyo, S.I.P.",
      deskripsi: "Mengkoordinir produksi konten berita harian dan menjaga independensi jurnalisme.",
    },
    {
      jabatan: "Redaktur Pelaksana",
      nama: "Dian Anggraini, S.Hum.",
      deskripsi: "Memimpin kurasi liputan daerah, wisata, kebudayaan, dan feature humaniora.",
    },
    {
      jabatan: "Redaktur Ekonomi & Bisnis",
      nama: "Hendro Wibowo, S.E.",
      deskripsi: "Fokus liputan pertanian komoditas kedelai, UMKM daerah, dan perbankan rakyat.",
    },
    {
      jabatan: "Redaktur Politik & Hukum",
      nama: "Wahyu Setiawan, S.H.",
      deskripsi: "Mengawal regulasi daerah, transparansi APBD, dan dinamika legislatif DPRD.",
    },
    {
      jabatan: "Koordinator Liputan Olahraga",
      nama: "Rizky Ramadhan",
      deskripsi: "Meliput Persipur Purwodadi, laga Liga 3, dan prestasi cabor atletik daerah.",
    },
    {
      jabatan: "Kepala Tim IT & Pengembangan Digital",
      nama: "Arif Kurniawan, S.Kom.",
      deskripsi: "Menjamin performa portal web, keandalan server, dan keamanan data redaksi.",
    },
  ];

  return (
    <div className="py-2 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-1.5 text-xs text-zinc-500">
        <Link href="/" className="hover:text-amber-600 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-900 font-bold">Tentang Kami</span>
      </nav>

      {/* Hero Banner */}
      <div className="bg-zinc-950 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-zinc-800">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Profil Perusahaan Pers
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight leading-tight text-white mb-4">
            Mencerahkan Grobogan Melalui Jurnalisme Berintegritas
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            <strong>Info Grobogan</strong> adalah portal berita digital independen yang berpusat di Purwodadi, Kabupaten Grobogan, Jawa Tengah. Kami hadir menjadi lentera informasi terpercaya, mengawal pembangunan daerah, dan mengangkat potensi kearifan lokal ke pentas nasional.
          </p>
        </div>

        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
          <Image
            src={BRAND_CONFIG.logoUrl}
            alt="Watermark"
            width={400}
            height={400}
          />
        </div>
      </div>

      {/* Profil Singkat & Identitas */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl bg-zinc-950">
            <Image
              src={BRAND_CONFIG.logoUrl}
              alt="Logo Info Grobogan"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-zinc-950">
            Tentang Portal Info Grobogan
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Didirikan untuk menjawab kebutuhan masyarakat Kabupaten Grobogan akan akses berita yang cepat, berimbang, dan terverifikasi. Di era tsunami informasi dan maraknya hoaks di media sosial, Info Grobogan memegang teguh kaidah jurnalistik Undang-Undang Pokok Pers No. 40 Tahun 1999 dan Pedoman Pemberitaan Media Siber Dewan Pers.
          </p>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Cakupan peliputan kami merata di 19 kecamatan se-Kabupaten Grobogan, mulai dari denyut perkotaan Purwodadi, sentra pertanian kedelai di Gabus dan Toroh, situs geowisata Bledug Kuwu Kradenan, hingga pusat api abadi Mrapen di Godong.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-2xl font-black text-amber-900 font-serif">19</span>
              <p className="text-xs font-semibold text-amber-950">Kecamatan Terjangkau</p>
            </div>
            <div className="p-3.5 bg-zinc-100 rounded-xl border border-zinc-200">
              <span className="text-2xl font-black text-zinc-900 font-serif">24/7</span>
              <p className="text-xs font-semibold text-zinc-700">Pembaruan Waktu Nyata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visi & Misi Section */}
      <section id="visi-misi" className="bg-white rounded-2xl p-8 sm:p-10 border border-zinc-200 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Arah dan Komitmen
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-zinc-950 mt-1">
            Visi & Misi Redaksi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visi */}
          <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-zinc-950 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-3 font-serif">
                Visi Kami
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed">
                Menjadi rujukan media digital nomor satu di Kabupaten Grobogan yang menginspirasi, mencerdaskan kehidupan masyarakat, dan mendorong terciptanya tata kelola pemerintahan daerah yang bersih, transparan, dan berpihak kepada rakyat.
              </p>
            </div>
          </div>

          {/* Misi */}
          <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-zinc-900 text-amber-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-3 font-serif">
                Misi Kami
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Menyajikan berita faktual, berimbang, dan terbebas dari tendensi kepentingan partisan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Mempromosikan potensi pariwisata, agrikultur lumbung pangan, dan UMKM khas Grobogan ke kancah global.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Menyediakan wadah aspirasi publik yang konstruktif bagi seluruh elemen warga Purwodadi dan sekitarnya.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Susunan Dewan Redaksi */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-900">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-serif text-zinc-950 flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-500" />
              Susunan Dewan Redaksi & Manajemen
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Struktur pengelola redaksional PT Info Grobogan Media Nusantara
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {redaksiList.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl border border-zinc-200 hover:border-amber-400 transition-all hover:shadow-md"
            >
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                {item.jabatan}
              </span>
              <h3 className="text-base font-bold text-zinc-950 font-serif mb-2">
                {item.nama}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pedoman Media Siber & Kode Etik */}
      <section id="kode-etik" className="bg-zinc-900 text-white rounded-2xl p-8 border border-zinc-800 space-y-4">
        <h3 className="text-lg font-bold text-amber-400 font-serif">
          Kepatuhan Kode Etik Jurnalistik
        </h3>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          Wartawan Info Grobogan dibekali tanda pengenal (Kartu Pers) resmi dan tercatat dalam boks redaksi. Wartawan Info Grobogan dilarang keras menerima suap, gratifikasi, atau imbalan dalam bentuk apa pun dari narasumber terkait penulisan berita. Apabila ada pihak yang mengaku wartawan Info Grobogan dan melakukan pemerasan, harap segera melapor ke kontak redaksi kami.
        </p>
        <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
          <span>Surat Izin Penerbitan Pers: SK Kemenkumham RI No. AHU-0034112.AH.01.01</span>
        </div>
      </section>

    </div>
  );
}
