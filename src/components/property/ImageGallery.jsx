import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export default function ImageGallery({ images = [], title = 'Property' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const galleryImages = images && images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ];

  const safeIndex = Math.min(activeIndex, galleryImages.length - 1);

  useEffect(() => {
    if (activeIndex !== safeIndex) {
      setActiveIndex(safeIndex);
    }
  }, [activeIndex, safeIndex]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Image Stage */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group">
        <Image
          src={galleryImages[safeIndex]}
          alt={`${title} - view ${safeIndex + 1}`}
          fill
          priority
          className="object-cover"
        />

        {/* Counter Pill */}
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-md bg-slate-950/70 backdrop-blur-xs text-white text-xs font-mono font-medium">
          {safeIndex + 1} / {galleryImages.length}
        </div>

        {/* Fullscreen Button */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label="Expand image to fullscreen view"
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-950/70 hover:bg-slate-950/90 text-white backdrop-blur-xs transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Prev & Next Controls */}
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative shrink-0 w-20 sm:w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                safeIndex === idx
                  ? 'border-emerald-600 ring-2 ring-emerald-500/30'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm font-medium">
              {title} — Photo {safeIndex + 1} of {galleryImages.length}
            </span>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen modal"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 max-h-[80vh] my-auto flex items-center justify-center">
            <Image
              src={galleryImages[safeIndex]}
              alt={`${title} - view ${safeIndex + 1}`}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-4 p-3 rounded-full bg-slate-800/80 hover:bg-slate-800 text-white"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto py-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                  safeIndex === idx ? 'border-emerald-400' : 'border-transparent opacity-50'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
