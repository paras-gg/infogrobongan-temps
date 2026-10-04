import type { Metadata } from "next";
import "./globals.css";
import { NewsProvider } from "@/lib/NewsContext";

export const metadata: Metadata = {
  title: "Info Grobogan - Portal Berita Terkini & Terpercaya Kabupaten Grobogan",
  description: "Menyajikan kabar terkini seputar Purwodadi, politik, ekonomi, olahraga, dan pesona wisata Kabupaten Grobogan Jawa Tengah secara akurat dan berimbang.",
  keywords: "Info Grobogan, Berita Purwodadi, Wisata Grobogan, Bledug Kuwu, Api Mrapen, Persipur Purwodadi",
  icons: {
    icon: "https://ik.imagekit.io/jfqsn6cwe/Image_in_web/334116403_1338444666730870_2104248033328788575_n.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-zinc-900 flex flex-col antialiased">
        <NewsProvider>
          {children}
        </NewsProvider>
      </body>
    </html>
  );
}
