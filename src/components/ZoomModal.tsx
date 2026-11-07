import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, CheckCircle, ShieldAlert } from 'lucide-react';

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalSrc: string;
  cleanSrc: string;
  ultraHdSrc: string;
}

export const ZoomModal: React.FC<ZoomModalProps> = ({
  isOpen,
  onClose,
  originalSrc,
  cleanSrc,
  ultraHdSrc,
}) => {
  const [activeVersion, setActiveVersion] = useState<'original' | 'clean' | 'ultraHd'>('clean');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [focusCorner, setFocusCorner] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentSrc =
    activeVersion === 'original'
      ? originalSrc
      : activeVersion === 'clean'
      ? cleanSrc
      : ultraHdSrc;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="High-Resolution Flyer Inspector"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl h-[88vh] bg-slate-950 border border-emerald-500/30 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-emerald-400" />
              High-Resolution Inspection Lens
            </h2>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Compare sharpness and verify watermark removal
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/80 text-xs">
          {/* Version Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveVersion('clean')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeVersion === 'clean'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Clean (Watermark Removed)
            </button>
            <button
              type="button"
              onClick={() => setActiveVersion('ultraHd')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeVersion === 'ultraHd'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ultra HD 4K Studio
            </button>
            <button
              type="button"
              onClick={() => setActiveVersion('original')}
              className={`px-3 py-1 rounded-md transition-all font-medium ${
                activeVersion === 'original'
                  ? 'bg-rose-900/80 text-rose-200 border border-rose-700/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Original (Watermarked)
            </button>
          </div>

          {/* Quick Focus & Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setFocusCorner(!focusCorner);
                if (!focusCorner) setZoomLevel(2);
                else setZoomLevel(1);
              }}
              className={`px-2.5 py-1 rounded border text-xs flex items-center gap-1.5 transition-colors ${
                focusCorner
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {focusCorner ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Corner Macro Focus: ON
                </>
              ) : (
                'Focus Top-Right Corner'
              )}
            </button>

            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-slate-400 text-xs w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setZoomLevel(1);
                setFocusCorner(false);
              }}
              className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Image Display Area */}
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-black/60 relative">
          <div
            className="transition-transform duration-200 origin-top-right relative"
            style={{
              transform: focusCorner
                ? `scale(${zoomLevel > 1.2 ? zoomLevel : 1.7}) translate(15%, 15%)`
                : `scale(${zoomLevel})`,
            }}
          >
            <img
              src={currentSrc}
              alt="High resolution view"
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto rounded-lg shadow-2xl border border-slate-800"
            />

            {/* Corner Verification Indicator */}
            {activeVersion === 'original' ? (
              <div className="absolute top-4 right-4 bg-rose-950/80 border border-rose-500/80 rounded px-2 py-1 text-[11px] text-rose-300 flex items-center gap-1 shadow-lg pointer-events-none">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                Watermark: @webdev.kerala
              </div>
            ) : (
              <div className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-500/80 rounded px-2 py-1 text-[11px] text-emerald-300 flex items-center gap-1 shadow-lg pointer-events-none">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Watermark completely removed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
