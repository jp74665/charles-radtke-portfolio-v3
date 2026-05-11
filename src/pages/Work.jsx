import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import { PIECES } from '../data/pieces';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PieceOverlay = ({ piece, onClose }) => {
  const overlayRef = useRef(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current,
        { y: '100vh' },
        { y: 0, duration: 0.6, ease: 'power3.out' }
      );
    });

    return () => {
      window.removeEventListener('keydown', handleKey);
      ctx.revert();
    };
  }, []);

  const handleClose = () => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        y: '100vh',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: onClose
      });
    });
    return () => ctx.revert();
  };

  if (!piece) return null;

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex flex-col md:flex-row bg-background overflow-hidden">
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-50 p-3 text-ink hover:opacity-60 transition-opacity"
        aria-label="Close details"
      >
        <X size={24} />
      </button>

      {/* Image panel */}
      <div className="w-full md:w-[60%] h-[50vh] md:h-full bg-white flex flex-col items-center justify-center relative">
        <img
          key={activeImageIdx}
          src={piece.images[activeImageIdx]}
          alt={piece.title}
          className="w-full h-full object-contain p-4 md:p-12"
        />

        {piece.images.length > 1 && (
          <>
            <button
              onClick={() => setActiveImageIdx(prev => (prev === 0 ? piece.images.length - 1 : prev - 1))}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-2 text-ink hover:opacity-60 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setActiveImageIdx(prev => (prev === piece.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-ink hover:opacity-60 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {piece.images.length > 1 && (
          <div className="absolute bottom-6 flex gap-3 px-4">
            {piece.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-12 h-12 overflow-hidden border transition-opacity ${
                  idx === activeImageIdx ? 'border-ink opacity-100' : 'border-rule opacity-60 hover:opacity-100'
                }`}
                aria-label={`Image ${idx + 1}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Metadata panel */}
      <div className="w-full md:w-[40%] h-[50vh] md:h-full overflow-y-auto px-8 md:px-16 py-12 md:py-24 border-t md:border-t-0 md:border-l border-rule bg-background flex flex-col">
        <h2 className="font-display font-light text-3xl text-ink leading-[1.1] mb-3">
          {piece.title}
        </h2>
        {piece.year && (
          <div className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted mb-10">
            {piece.year}
          </div>
        )}

        <div className="space-y-8 flex-grow mb-16">
          {piece.materials?.length > 0 && (
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-textMuted pb-2 border-b border-rule mb-3">
                Materials
              </h3>
              <p className="font-sans text-sm text-ink leading-[1.75]">
                {piece.materials.join(' · ')}
              </p>
            </div>
          )}
          {piece.dimensions && (
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-textMuted pb-2 border-b border-rule mb-3">
                Dimensions
              </h3>
              <p className="font-sans text-sm text-ink leading-[1.75]">
                {piece.dimensions}
              </p>
            </div>
          )}
          {piece.description && (
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-textMuted pb-2 border-b border-rule mb-3">
                About this piece
              </h3>
              <p className="font-sans text-sm text-ink leading-[1.75]">
                {piece.description}
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-rule pt-8 mt-auto">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted mb-4">
            Commission a piece
          </p>
          <NavLink
            to="/contact"
            state={{ tab: 'commission' }}
            className="font-sans text-sm text-ink hover:opacity-60 transition-opacity inline-flex items-center gap-2"
          >
            Get in Touch <span>→</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Cabinets', value: 'cabinets' },
  { label: 'Tables', value: 'tables' },
  { label: 'Chairs', value: 'chairs' },
  { label: 'Bespoke', value: 'custom' },
];

const Work = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortNewest, setSortNewest] = useState(true);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const gridRef = useRef(null);

  const filteredPieces = PIECES
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => sortNewest ? (b.year || 0) - (a.year || 0) : (a.year || 0) - (b.year || 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, stagger: 0.05, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
        );
      }
    });
    return () => ctx.revert();
  }, [activeCategory, sortNewest]);

  return (
    <div className="w-full pt-20 pb-24 min-h-screen">

      {/* Filter Bar */}
      <div className="work-header relative z-20 max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="w-full border-b border-rule pb-5 flex flex-wrap items-center justify-between gap-y-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.value;
              return (
                <div key={cat.value} className="flex items-center gap-x-6">
                  {idx > 0 && <span className="text-textMuted select-none">·</span>}
                  <button
                    type="button"
                    onClick={() => setActiveCategory(cat.value)}
                    className={`font-sans text-xs uppercase tracking-[0.18em] cursor-pointer transition-colors ${
                      isActive
                        ? 'text-ink border-b border-ink pb-0.5'
                        : 'text-textMuted hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setSortNewest((v) => !v)}
            className="font-sans text-xs text-textMuted hover:text-ink transition-colors"
          >
            {sortNewest ? 'Newest first' : 'Oldest first'}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
      >
        {filteredPieces.map((piece) => (
          <div
            key={piece.id}
            className="group cursor-pointer flex flex-col"
            onClick={() => setSelectedPiece(piece)}
          >
            <div className="w-full aspect-[4/5] overflow-hidden relative mb-4 bg-white">
              <img
                src={piece.thumbnail || piece.images[0]}
                alt={piece.title}
                loading="lazy"
                className="w-full h-full object-contain transition-opacity duration-500 ease-smooth group-hover:opacity-90"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="font-display font-light text-base text-ink leading-[1.2]">
                {piece.title}
              </h3>
              {piece.year && (
                <span className="font-sans text-xs uppercase tracking-[0.12em] text-textMuted mt-1">
                  {piece.year}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPieces.length === 0 && (
        <div className="w-full py-24 text-center font-display font-light text-2xl text-ink">
          No pieces found in this category.
        </div>
      )}

      {selectedPiece && (
        <PieceOverlay piece={selectedPiece} onClose={() => setSelectedPiece(null)} />
      )}
    </div>
  );
};

export default Work;
