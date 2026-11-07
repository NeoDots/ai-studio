import React, { useState, useRef, useCallback, useEffect } from 'react';
import { calculateSliderPosition } from '../utils/promoTools';
import { Sparkles, Eye, ZoomIn, Download, CheckCircle, ShieldAlert } from 'lucide-react';

interface ComparisonSliderProps {
  originalSrc: string;
  enhancedSrc: string;
  enhancedLabel: string;
  onOpenZoom: () => void;
  onDownload: () => void;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  originalSrc,
  enhancedSrc,
  enhancedLabel,
  onOpenZoom,
  onDownload,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showWatermarkCallout, setShowWatermarkCallout] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor container width for pixel-perfect image overlay
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPos = calculateSliderPosition(clientX, rect.left, rect.width);
    setSliderPos(newPos);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-emerald-500/20 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            Interactive Split View
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">
            Drag the slider to compare original with removed watermark
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowWatermarkCallout(!showWatermarkCallout)}
            className={`px-3 py-1.5 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
              showWatermarkCallout
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
            title="Highlight watermark area"
          >
            <Eye className="w-3.5 h-3.5" />
            {showWatermarkCallout ? 'Watermark Radar: ON' : 'Watermark Radar: OFF'}
          </button>

          <button
            type="button"
            onClick={onOpenZoom}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            Inspect
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download Clean HD
          </button>
        </div>
      </div>

      {/* Main Comparison Canvas / Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onClick={handleContainerClick}
        className="relative select-none overflow-hidden rounded-2xl border-2 border-emerald-500/30 bg-black shadow-2xl shadow-emerald-950/40 aspect-[3/4] max-w-2xl mx-auto w-full cursor-ew-resize group"
      >
        {/* Under layer: Enhanced / Clean Image */}
        <img
          src={enhancedSrc}
          alt="Watermark Removed Enhanced Flyer"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Top layer: Original Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={originalSrc}
            alt="Original Image with Watermark"
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full object-cover pointer-events-none"
            style={{
              width: containerWidth > 0 ? `${containerWidth}px` : '100%',
              maxWidth: 'none',
            }}
          />
        </div>

        {/* Labels at top corners */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md text-[11px] font-semibold text-rose-400 border border-rose-500/40 shadow-md">
            Original (Watermarked)
          </span>
        </div>

        <div className="absolute top-4 right-4 z-20 pointer-events-none flex flex-col items-end gap-2">
          <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 backdrop-blur-md text-[11px] font-semibold text-emerald-300 border border-emerald-500/50 shadow-md flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            {enhancedLabel}
          </span>

          {/* Watermark Radar Indicator right beneath label */}
          {showWatermarkCallout && (
            <div className="p-2 rounded-xl border-2 border-dashed border-rose-400/80 bg-slate-950/85 backdrop-blur-md text-right shadow-lg">
              <div className="flex items-center justify-end gap-1.5 text-[10px] sm:text-xs font-bold text-rose-300">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Watermark Spot</span>
              </div>
              <div className="text-[9px] text-slate-300 mt-0.5">
                {sliderPos < 80 ? '✅ Cleaned & Seamless' : '⚠️ @webdev.kerala'}
              </div>
            </div>
          )}
        </div>

        {/* Draggable Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-auto"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          {/* Vertical white/green bar */}
          <div className="w-1 h-full bg-gradient-to-b from-emerald-400 via-white to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.8)] -ml-0.5" />

          {/* Central handle button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-900 border-2 border-emerald-400 text-white flex items-center justify-center shadow-xl cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <div className="flex items-center gap-0.5 text-emerald-400 text-xs font-bold">
              <span>◀</span>
              <span>▶</span>
            </div>
          </div>
        </div>

        {/* Quick percentage tooltip while dragging */}
        <div
          className="absolute bottom-4 -translate-x-1/2 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] text-emerald-300 font-mono border border-emerald-500/30 pointer-events-none z-20"
          style={{ left: `${sliderPos}%` }}
        >
          {Math.round(sliderPos)}%
        </div>
      </div>

      {/* Preset Slider buttons */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-slate-400 mr-2">Quick position:</span>
        <button
          type="button"
          onClick={() => setSliderPos(0)}
          className="px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        >
          100% Enhanced
        </button>
        <button
          type="button"
          onClick={() => setSliderPos(50)}
          className="px-2.5 py-1 rounded text-xs bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40"
        >
          50% Split
        </button>
        <button
          type="button"
          onClick={() => setSliderPos(100)}
          className="px-2.5 py-1 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        >
          100% Original
        </button>
      </div>
    </div>
  );
};
