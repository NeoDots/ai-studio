import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Download,
  Share2,
  Check,
  Sparkles,
  Phone,
  Instagram,
  Tag,
  Palette,
  Layers,
  HelpCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import {
  PRESET_DIMENSIONS,
  formatWhatsAppUrl,
  formatInstagramHandle,
  type PresetDimension,
} from '../utils/promoTools';

interface BrandCustomizerProps {
  cleanSrc: string;
  ultraHdSrc: string;
}

export const BrandCustomizer: React.FC<BrandCustomizerProps> = ({
  cleanSrc,
  ultraHdSrc,
}) => {
  const [selectedBase, setSelectedBase] = useState<'clean' | 'ultraHd'>('clean');
  const [aspectPreset, setAspectPreset] = useState<'original' | 'feed' | 'story' | 'square'>('original');

  // Custom branding inputs
  const [cornerOption, setCornerOption] = useState<'none' | 'instagram' | 'brandText'>('instagram');
  const [customHandle, setCustomHandle] = useState<string>('yourbrand.dev');
  const [customBrandText, setCustomBrandText] = useState<string>('YOUR STORE STUDIO');
  const [whatsappPhone, setWhatsappPhone] = useState<string>('+91 98765 43210');
  const [whatsappCtaText, setWhatsappCtaText] = useState<string>('Chat on WhatsApp');
  const [offerBadge, setOfferBadge] = useState<string>('LIMITED TIME: FREE DOMAIN & SSL');
  const [showOfferBadge, setShowOfferBadge] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<'normal' | 'emerald' | 'cyber' | 'contrast'>('normal');

  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageObjRef = useRef<HTMLImageElement | null>(null);

  const currentPreset: PresetDimension = PRESET_DIMENSIONS[aspectPreset];
  const activeBaseSrc = selectedBase === 'clean' ? cleanSrc : ultraHdSrc;

  // Render to canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageObjRef.current;
    if (!img || !img.complete) return;

    // Canvas internal target resolution
    const width = currentPreset.width;
    const height = currentPreset.height;
    canvas.width = width;
    canvas.height = height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Apply color filter adjustments
    if (colorFilter === 'emerald') {
      ctx.filter = 'contrast(106%) saturate(125%) hue-rotate(-5deg)';
    } else if (colorFilter === 'cyber') {
      ctx.filter = 'contrast(115%) saturate(140%) brightness(102%)';
    } else if (colorFilter === 'contrast') {
      ctx.filter = 'contrast(120%) brightness(98%)';
    } else {
      ctx.filter = 'none';
    }

    // Draw background image scaled to cover aspect ratio
    const imgRatio = img.width / img.height;
    const targetRatio = width / height;
    let sWidth = img.width;
    let sHeight = img.height;
    let sx = 0;
    let sy = 0;

    if (imgRatio > targetRatio) {
      sWidth = img.height * targetRatio;
      sx = (img.width - sWidth) / 2;
    } else {
      sHeight = img.width / targetRatio;
      sy = (img.height - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
    ctx.filter = 'none'; // reset filter for overlays

    // Draw Top-Right Custom Branding Overlay (replaces watermark spot)
    if (cornerOption === 'instagram' && customHandle.trim()) {
      const cleanHandle = formatInstagramHandle(customHandle);
      const padding = 20;
      const x = width - 40;
      const y = 60;

      ctx.save();
      ctx.font = 'bold 32px Inter, system-ui, sans-serif';
      const text = `@${cleanHandle}`;
      const textMetrics = ctx.measureText(text);
      const bgWidth = textMetrics.width + 60;
      const bgHeight = 54;
      const bgX = x - bgWidth;
      const bgY = y;

      // Subtle frosted dark capsule background for clarity
      ctx.fillStyle = 'rgba(5, 18, 12, 0.75)';
      ctx.beginPath();
      ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 27);
      ctx.fill();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Instagram camera icon simulation (square with circle)
      const iconX = bgX + 18;
      const iconY = bgY + 15;
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(iconX, iconY, 24, 24);
      ctx.beginPath();
      ctx.arc(iconX + 12, iconY + 12, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(iconX + 19, iconY + 5, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Handle text
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 28px Inter, system-ui, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, bgX + 54, bgY + bgHeight / 2);
      ctx.restore();
    } else if (cornerOption === 'brandText' && customBrandText.trim()) {
      ctx.save();
      ctx.font = 'bold 28px Inter, system-ui, sans-serif';
      const text = customBrandText.trim().toUpperCase();
      const textMetrics = ctx.measureText(text);
      const bgWidth = textMetrics.width + 48;
      const bgHeight = 52;
      const bgX = width - 40 - bgWidth;
      const bgY = 60;

      ctx.fillStyle = 'rgba(4, 30, 20, 0.85)';
      ctx.beginPath();
      ctx.roundRect(bgX, bgY, bgWidth, bgHeight, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#6ee7b7';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, bgX + 24, bgY + bgHeight / 2);
      ctx.restore();
    }

    // Optional Offer Badge at top-left
    if (showOfferBadge && offerBadge.trim()) {
      ctx.save();
      const badgeY = 60;
      const badgeX = 40;
      ctx.font = 'bold 24px Inter, system-ui, sans-serif';
      const metrics = ctx.measureText(offerBadge);
      const bWidth = metrics.width + 40;
      const bHeight = 50;

      // Gradient background
      const grad = ctx.createLinearGradient(badgeX, badgeY, badgeX + bWidth, badgeY);
      grad.addColorStop(0, '#059669');
      grad.addColorStop(1, '#10b981');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, bWidth, bHeight, 25);
      ctx.fill();

      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ffffff';
      ctx.textBaseline = 'middle';
      ctx.fillText(offerBadge, badgeX + 20, badgeY + bHeight / 2);
      ctx.restore();
    }

    // Optional Bottom Custom CTA pill replacement
    if (whatsappPhone.trim() && whatsappCtaText.trim() && whatsappCtaText !== 'Chat on WhatsApp') {
      ctx.save();
      const pillWidth = 420;
      const pillHeight = 72;
      const pillX = (width - pillWidth) / 2;
      const pillY = height - 140;

      // Frosted dark pill
      ctx.fillStyle = 'rgba(12, 30, 22, 0.95)';
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 36);
      ctx.fill();
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${whatsappCtaText} >`, width / 2, pillY + pillHeight / 2);
      ctx.restore();
    }
  }, [
    currentPreset,
    colorFilter,
    cornerOption,
    customHandle,
    customBrandText,
    showOfferBadge,
    offerBadge,
    whatsappPhone,
    whatsappCtaText,
  ]);

  // Load image when activeBaseSrc changes
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activeBaseSrc;
    img.onload = () => {
      imageObjRef.current = img;
      renderCanvas();
    };
  }, [activeBaseSrc, renderCanvas]);

  // Re-render when options change
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleDownload = (format: 'png' | 'jpeg') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsExporting(true);

    try {
      const dataUrl = canvas.toDataURL(format === 'jpeg' ? 'image/jpeg' : 'image/png', 0.95);
      const link = document.createElement('a');
      link.download = `ecommerce-flyer-custom-${aspectPreset}-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Export failed', e);
    } finally {
      setIsExporting(false);
    }
  };

  const waUrl = formatWhatsAppUrl(whatsappPhone, 'Hello! I saw your e-commerce website design offer and would like to know more.');

  const handleCopyWaLink = () => {
    if (!waUrl) return;
    navigator.clipboard.writeText(waUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Live Canvas Preview */}
      <div className="lg:col-span-7 flex flex-col items-center">
        <div className="w-full bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-4 shadow-2xl relative">
          <div className="flex items-center justify-between mb-3 px-1 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" /> Live High-Res Export Canvas
            </span>
            <span className="text-slate-400 font-mono">
              {currentPreset.width} × {currentPreset.height} px ({currentPreset.aspectRatio})
            </span>
          </div>

          {/* Canvas container */}
          <div className="relative overflow-hidden rounded-xl bg-black border border-emerald-500/20 shadow-inner flex items-center justify-center p-1">
            <canvas
              ref={canvasRef}
              className="max-h-[600px] w-auto h-auto max-w-full rounded-lg object-contain shadow-2xl"
              style={{ aspectRatio: currentPreset.aspectRatio.replace(':', '/') }}
            />
          </div>

          {/* Export Actions Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <div className="text-xs text-slate-400">
              Clean Watermark-Free Export Ready
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDownload('jpeg')}
                disabled={isExporting}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                JPG (Web)
              </button>
              <button
                type="button"
                onClick={() => handleDownload('png')}
                disabled={isExporting}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-emerald-900/40 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                {isExporting ? 'Exporting...' : 'Download Ultra PNG'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Customization Controls */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {/* Card 1: Base Artwork Choice */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 backdrop-blur-md">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4" /> 1. Select Enhanced Base
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedBase('clean')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedBase === 'clean'
                  ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-emerald-400 mb-0.5">Original Clean</div>
              <div className="text-[11px] text-slate-300">Exact layout, 100% watermark removed</div>
            </button>

            <button
              type="button"
              onClick={() => setSelectedBase('ultraHd')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedBase === 'ultraHd'
                  ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-emerald-400 mb-0.5">Ultra HD Studio</div>
              <div className="text-[11px] text-slate-300">Modern logistics dashboard & neon UI</div>
            </button>
          </div>
        </div>

        {/* Card 2: Corner Branding (Watermark Replacement) */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Instagram className="w-4 h-4" /> 2. Top-Right Corner Branding
            </label>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              Replaces @webdev.kerala
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              type="button"
              onClick={() => setCornerOption('none')}
              className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                cornerOption === 'none'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              Spotless (Empty)
            </button>
            <button
              type="button"
              onClick={() => setCornerOption('instagram')}
              className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                cornerOption === 'instagram'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              My Instagram
            </button>
            <button
              type="button"
              onClick={() => setCornerOption('brandText')}
              className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                cornerOption === 'brandText'
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              Custom Text
            </button>
          </div>

          {cornerOption === 'instagram' && (
            <div>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-sm">
                  @
                </span>
                <input
                  type="text"
                  value={customHandle}
                  onChange={(e) => setCustomHandle(e.target.value)}
                  placeholder="yourstore.official"
                  className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                Renders a sleek Instagram badge with your own social handle on the top-right.
              </p>
            </div>
          )}

          {cornerOption === 'brandText' && (
            <div>
              <input
                type="text"
                value={customBrandText}
                onChange={(e) => setCustomBrandText(e.target.value)}
                placeholder="YOUR BRAND NAME"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                Displays your custom agency or store title in modern emerald styling.
              </p>
            </div>
          )}

          {cornerOption === 'none' && (
            <p className="text-xs text-emerald-400/90 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-500/20">
              Clean and pristine: No watermark, handle, or badge will be placed in the corner.
            </p>
          )}
        </div>

        {/* Card 3: WhatsApp CTA & Link Generator */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 backdrop-blur-md">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
            <Phone className="w-4 h-4" /> 3. WhatsApp Direct CTA
          </label>

          <div className="flex flex-col gap-3">
            <div>
              <span className="text-xs text-slate-300 block mb-1">Your WhatsApp Number (with country code):</span>
              <input
                type="text"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="+1 555 123 4567 or +91 9876543210"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            {waUrl && (
              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 truncate max-w-[220px]">
                  {waUrl}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyWaLink}
                    className="p-1.5 hover:bg-slate-800 text-emerald-400 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy WhatsApp link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 hover:bg-slate-800 text-slate-300 rounded transition-colors flex items-center gap-1"
                    title="Test WhatsApp Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Test</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 4: Social Aspect Ratio & Color Tuning */}
        <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 backdrop-blur-md">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4" /> 4. Aspect Ratio & Color Tuning
          </label>

          <div className="mb-3">
            <span className="text-xs text-slate-300 block mb-1.5">Social Media Crop Preset:</span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PRESET_DIMENSIONS) as Array<'original' | 'feed' | 'story' | 'square'>).map((key) => {
                const item = PRESET_DIMENSIONS[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAspectPreset(key)}
                    className={`p-2 rounded-lg text-left border transition-all cursor-pointer ${
                      aspectPreset === key
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.aspectRatio}</div>
                    <div className="text-[10px] text-slate-400 truncate">{item.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-300 block mb-1.5">Color Enhancement Preset:</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'normal', label: 'Natural' },
                { id: 'emerald', label: 'Emerald' },
                { id: 'cyber', label: 'Cyber Vivid' },
                { id: 'contrast', label: 'Studio HD' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorFilter(c.id as any)}
                  className={`py-1.5 px-1 rounded-md text-[11px] font-medium border text-center transition-all cursor-pointer ${
                    colorFilter === c.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
