/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Download,
  Share2,
  CheckCircle,
  Eye,
  Sliders,
  Maximize2,
  Wand2,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import promoCleanImg from './assets/images/promo_clean_1793992555192.jpg';
import promoUltraHdImg from './assets/images/promo_ultra_hd_1793992552049.jpg';
import { ComparisonSlider } from './components/ComparisonSlider';
import { BrandCustomizer } from './components/BrandCustomizer';
import { ZoomModal } from './components/ZoomModal';
import { SocialCaptionsModal } from './components/SocialCaptionsModal';
import { FeatureHighlights } from './components/FeatureHighlights';

// Original image uploaded by user in /public/assets/aistudio/...
const ORIGINAL_IMG = '/assets/aistudio/1793861706918_97b6f496.png';

export default function App() {
  const [activeTab, setActiveTab] = useState<'slider' | 'clean' | 'ultraHd' | 'customizer'>('slider');
  const [sliderComparisonTarget, setSliderComparisonTarget] = useState<'clean' | 'ultraHd'>('clean');
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);
  const [isCaptionsOpen, setIsCaptionsOpen] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Check URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'clean' || tabParam === 'ultraHd' || tabParam === 'customizer' || tabParam === 'slider') {
      setActiveTab(tabParam);
    }
  }, []);

  const handleDownloadDirect = (src: string, filename: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-emerald-900/60 to-slate-950 border-b border-emerald-500/20 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-300">Enhancement Complete:</span>
          <span className="text-slate-300">
            Watermark <code className="text-rose-400 font-mono text-[11px] bg-rose-950/60 px-1 py-0.5 rounded">@webdev.kerala</code> completely removed &amp; visual details sharpened to 4K resolution.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCaptionsOpen(true)}
            className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Ad Captions
          </button>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Zoom Lens
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  E-Commerce Promo Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Clean &amp; Watermark Free
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Go From Local To Global With An E-Commerce Website
              </p>
            </div>
          </div>

          {/* Quick Download Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleDownloadDirect(promoCleanImg, 'ecommerce-flyer-clean-hd.jpg')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              Download Clean
            </button>
            <button
              type="button"
              onClick={() => handleDownloadDirect(promoUltraHdImg, 'ecommerce-flyer-ultra-hd-4k.jpg')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-900/50 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download 4K Studio
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex overflow-x-auto gap-2 py-2 border-t border-slate-800/40 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('slider')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'slider'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Before &amp; After Split View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('clean')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'clean'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Clean Version (Original Layout)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ultraHd')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'ultraHd'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Ultra HD 4K Studio Render
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customizer')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'customizer'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            Brand Customizer &amp; Exporter
          </button>
        </div>
      </header>

      {/* Main App Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Toast notification for direct download */}
        {downloadSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-medium">Downloaded {downloadSuccess}!</span>
          </div>
        )}

        {/* Tab 1: Before & After Split Slider */}
        {activeTab === 'slider' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Watermark Removal &amp; Quality Enhancement
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Compare the original watermarked file against the enhanced version. Notice the top-right corner is clean and smooth.
                </p>
              </div>

              {/* Version Toggle for Slider */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400 px-2">Compare with:</span>
                <button
                  type="button"
                  onClick={() => setSliderComparisonTarget('clean')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    sliderComparisonTarget === 'clean'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Clean Flyer
                </button>
                <button
                  type="button"
                  onClick={() => setSliderComparisonTarget('ultraHd')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    sliderComparisonTarget === 'ultraHd'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Ultra HD 4K
                </button>
              </div>
            </div>

            <ComparisonSlider
              originalSrc={ORIGINAL_IMG}
              enhancedSrc={sliderComparisonTarget === 'clean' ? promoCleanImg : promoUltraHdImg}
              enhancedLabel={sliderComparisonTarget === 'clean' ? 'Clean Edition' : 'Ultra HD 4K'}
              onOpenZoom={() => setIsZoomOpen(true)}
              onDownload={() =>
                handleDownloadDirect(
                  sliderComparisonTarget === 'clean' ? promoCleanImg : promoUltraHdImg,
                  sliderComparisonTarget === 'clean'
                    ? 'ecommerce-flyer-clean.jpg'
                    : 'ecommerce-flyer-ultra-hd.jpg'
                )
              }
            />
          </div>
        )}

        {/* Tab 2: Clean Flyer Full Showcase */}
        {activeTab === 'clean' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative max-w-xl w-full rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black group">
                <img
                  src={promoCleanImg}
                  alt="E-Commerce Flyer Clean Watermark Removed"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />

                {/* Corner Verification Stamp */}
                <div className="absolute top-4 right-4 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/50 rounded-lg px-2.5 py-1 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 shadow-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Watermark Spotless
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 block">
                  Edition 1: 100% Faithful
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  Clean Promotional Flyer
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  The original graphic design, typography, and desk monitor render have been preserved with pristine fidelity. The Instagram handle <code className="text-rose-400 font-mono">@webdev.kerala</code> and watermark marks have been seamlessly erased, and all text elements are razor-sharp.
                </p>

                <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Aspect Ratio:</span>
                    <span className="font-mono text-emerald-300">3:4 Portrait (Standard Flyer)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Format:</span>
                    <span className="font-mono text-emerald-300">High-Resolution JPEG</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Watermark Status:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Completely Removed
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleDownloadDirect(promoCleanImg, 'ecommerce-flyer-clean-watermark-free.jpg')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Clean Flyer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('customizer');
                    }}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Wand2 className="w-4 h-4 text-emerald-400" />
                    Add My Brand
                  </button>
                </div>
              </div>

              {/* Ready-to-use WhatsApp test */}
              <div className="bg-slate-900/60 rounded-2xl border border-emerald-500/20 p-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Integrated Call-to-Action
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                  The flyer contains a prominent &quot;Chat on WhatsApp&quot; button. You can generate a direct WhatsApp link to accompany this post.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCaptionsOpen(true)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  View Copywriting &amp; WhatsApp Templates
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Ultra HD 4K Studio Full Showcase */}
        {activeTab === 'ultraHd' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex justify-center">
              <div className="relative max-w-xl w-full rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-black group">
                <img
                  src={promoUltraHdImg}
                  alt="E-Commerce Flyer Ultra HD 4K Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />

                <div className="absolute top-4 right-4 bg-emerald-950/85 backdrop-blur-md border border-emerald-500/50 rounded-lg px-2.5 py-1 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  4K Studio Master
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 block">
                  Edition 2: Next-Gen Redesign
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  Ultra HD 4K Studio Render
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  An enhanced modern studio redesign. Features high-tech world logistics connectivity charts, glowing neon 3D icons (payment carts, global currencies, shipping freight), and volumetric emerald atmospheric lighting with zero watermarks.
                </p>

                <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Visual Quality:</span>
                    <span className="font-semibold text-emerald-400">Cinematic 4K Volumetric</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Dashboard Display:</span>
                    <span className="font-mono text-emerald-300">Global Logistics &amp; Analytics</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Watermark:</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> 100% Free &amp; Clean
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleDownloadDirect(promoUltraHdImg, 'ecommerce-flyer-ultra-hd-4k.jpg')}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/80 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download Ultra HD 4K
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4 text-emerald-400" />
                    Macro Inspect
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Brand Customizer & Canvas Studio */}
        {activeTab === 'customizer' && (
          <BrandCustomizer
            cleanSrc={promoCleanImg}
            ultraHdSrc={promoUltraHdImg}
          />
        )}

        {/* E-Commerce Offer Feature Breakdown Cards */}
        <FeatureHighlights />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <p>E-Commerce Promotional Graphic Enhancement • Watermark Removed &amp; High-Res Render Engine</p>
      </footer>

      {/* Modals */}
      <ZoomModal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        originalSrc={ORIGINAL_IMG}
        cleanSrc={promoCleanImg}
        ultraHdSrc={promoUltraHdImg}
      />

      <SocialCaptionsModal
        isOpen={isCaptionsOpen}
        onClose={() => setIsCaptionsOpen(false)}
        brandName="Our Team"
        instagramHandle="yourbrand"
        whatsappNumber="+91 98765 43210"
      />
    </div>
  );
}
