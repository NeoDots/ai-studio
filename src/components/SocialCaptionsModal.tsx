import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Instagram, Share2 } from 'lucide-react';
import { generateSocialCaptions } from '../utils/promoTools';

interface SocialCaptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  instagramHandle: string;
  whatsappNumber: string;
}

export const SocialCaptionsModal: React.FC<SocialCaptionsModalProps> = ({
  isOpen,
  onClose,
  brandName,
  instagramHandle,
  whatsappNumber,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const captions = generateSocialCaptions(brandName, instagramHandle, whatsappNumber);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Social Media Copy & Ad Captions"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-slate-950 border border-emerald-500/30 rounded-2xl flex flex-col max-h-[85vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white">Social Media Ad Copy & Captions</h2>
              <p className="text-xs text-slate-400">Ready to post on Instagram, WhatsApp & Facebook</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Instagram Post */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                <Instagram className="w-4 h-4" /> Instagram Post / Reel Caption
              </span>
              <button
                type="button"
                onClick={() => handleCopy('ig', captions.instagram)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1 border border-slate-700"
              >
                {copiedKey === 'ig' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Caption
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 max-h-40 overflow-y-auto">
              {captions.instagram}
            </pre>
          </div>

          {/* WhatsApp Broadcast */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" /> WhatsApp Broadcast / Status Message
              </span>
              <button
                type="button"
                onClick={() => handleCopy('wa', captions.whatsapp)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1 border border-slate-700"
              >
                {copiedKey === 'wa' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Message
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 max-h-40 overflow-y-auto">
              {captions.whatsapp}
            </pre>
          </div>

          {/* Facebook Ad */}
          <div className="bg-slate-900/90 rounded-xl border border-slate-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Facebook Ad Primary Text
              </span>
              <button
                type="button"
                onClick={() => handleCopy('fb', captions.facebook)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1 border border-slate-700"
              >
                {copiedKey === 'fb' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Text
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 max-h-32 overflow-y-auto">
              {captions.facebook}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
