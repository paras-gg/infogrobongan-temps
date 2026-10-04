"use client";

import React, { useState } from "react";
import { 
  Share2, 
  Check, 
  Copy, 
  MessageCircle, 
  Send 
} from "lucide-react";
import { FacebookIcon, TwitterIcon } from "@/components/SocialIcons";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Fallback to window.location.href in browser
  const shareUrl = typeof window !== "undefined" ? window.location.href : (url || "https://infogrobogan.id");

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} - ${shareUrl}`
  )}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(shareUrl)}`;

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex flex-wrap items-center gap-2 py-4 my-6 border-y border-zinc-200">
      <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center gap-1.5 mr-2">
        <Share2 className="w-3.5 h-3.5 text-amber-500" />
        Bagikan:
      </span>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-semibold transition-colors"
        title="Bagikan ke WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Facebook */}
      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-semibold transition-colors"
        title="Bagikan ke Facebook"
      >
        <FacebookIcon className="w-3.5 h-3.5" />
        <span>Facebook</span>
      </a>

      {/* Twitter / X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-800 hover:bg-zinc-900 hover:text-white border border-zinc-300 text-xs font-semibold transition-colors"
        title="Bagikan ke X / Twitter"
      >
        <TwitterIcon className="w-3.5 h-3.5" />
        <span>X (Twitter)</span>
      </a>

      {/* Telegram */}
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-500 hover:text-white border border-sky-200 text-xs font-semibold transition-colors"
        title="Bagikan ke Telegram"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Telegram</span>
      </a>

      {/* Salin Tautan */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 border border-zinc-200 text-xs font-semibold transition-colors"
        title="Salin tautan berita"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Tersalin!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>
    </div>
  );
}
