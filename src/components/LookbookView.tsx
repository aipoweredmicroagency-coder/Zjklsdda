import React, { useState } from 'react';
import { Product, Language } from '../types';
import { FashionImage } from './FashionImage';
import { formatPrice } from '../data/mockData';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';

interface LookbookViewProps {
  products: Product[];
  language: Language;
  onBackToHome: () => void;
  onSelectProduct: (p: Product) => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({
  products,
  language,
  onBackToHome,
  onSelectProduct,
}) => {
  // Curate dedicated looks from live products (up to 16)
  const looks = (products && products.length > 0 ? products : []).slice(0, 16);

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] min-h-screen pt-24 sm:pt-32 pb-32 select-none">
      {/* Top Quiet Navigation */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-8 sm:mb-12 flex items-center justify-between text-xs font-mono">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors cursor-pointer uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span className="hover:underline underline-offset-4">Return Home</span>
        </button>

        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-black/40">
          EDITORIAL LOOKBOOK · ISSUE I
        </span>
      </div>

      {/* Hero Header: Quiet Nordic Luxury */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-16 sm:mb-24 text-center">
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-black/40 block mb-3 sm:mb-4">
          WINTER SOLSTICE 2026 ARCHIVE
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-8xl font-normal text-black tracking-tight leading-[1.05] mb-4 sm:mb-6">
          Silence & Geometry
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-sans text-black/60 max-w-xl mx-auto leading-relaxed font-light">
          Sculptural monolithic silhouettes documented in Helsinki&apos;s low winter studio light. Pure unblended virgin wools, restrained tailoring, and permanence.
        </p>
      </div>

      {/* EMPTY STATE */}
      {looks.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20 px-4 font-mono">
          <p className="text-xs uppercase tracking-widest text-black/50 mb-4">
            Lookbook In Curation
          </p>
          <p className="text-sm font-sans text-black/70 mb-6">
            The atelier is preparing the latest lookbook series. Explore our permanent catalogue in the meantime.
          </p>
          <button
            type="button"
            onClick={onBackToHome}
            className="text-xs uppercase tracking-[0.2em] font-mono text-black underline underline-offset-4 cursor-pointer hover:opacity-60"
          >
            Explore Storefront →
          </button>
        </div>
      ) : (
        /* EDITORIAL HIGH-FASHION SPREADS: Fluid asymmetrical layouts with ZERO boxes and ZERO borders */
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 space-y-24 sm:space-y-40">
          {looks.map((product, idx) => {
            const lookNumber = (idx + 1).toString().padStart(2, '0');
            const isAlternate = idx % 2 === 1;

            return (
              <article
                key={product.id}
                className="group relative"
              >
                {/* Look Meta Top Info */}
                <div className="flex items-center justify-between font-mono text-[11px] text-black/40 uppercase tracking-[0.25em] mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-black">LOOK {lookNumber}</span>
                    <span>·</span>
                    <span>{product.plateNumber || product.nr || `Nº ${lookNumber}`}</span>
                  </div>
                  <span className="hidden sm:inline font-sans capitalize text-black/50 tracking-normal text-xs font-light">
                    {product.origin?.en || 'Atelier Tailored'}
                  </span>
                </div>

                {/* Asymmetrical Editorial Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isAlternate ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Primary Large Editorial Visual */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className={`w-full cursor-pointer relative overflow-hidden bg-neutral-100 ${
                      isAlternate ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7 lg:order-1'
                    }`}
                  >
                    <div className="aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden">
                      <FashionImage
                        product={product}
                        src={product.hoverImage || product.image}
                        alt={product.name?.en || 'Look'}
                        position={product.imagePosition || product.cropVariation?.onModel?.position || 'center 20%'}
                        scale={product.imageScale || product.cropVariation?.onModel?.scale || 1.05}
                        aspectRatio="auto"
                        className="w-full h-full"
                        imageClassName="group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                    </div>
                  </div>

                  {/* Editorial Typography & Accompanying Details */}
                  <div
                    className={`w-full flex flex-col justify-center space-y-6 ${
                      isAlternate ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'
                    }`}
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40 block">
                        {product.category?.toUpperCase() || 'COLLECTION'}
                      </span>
                      <h2
                        onClick={() => onSelectProduct(product)}
                        className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-black cursor-pointer hover:opacity-70 transition-opacity leading-tight"
                      >
                        {product.name?.en || product.name?.fi}
                      </h2>
                      <p className="font-sans text-xs sm:text-sm text-black/70 leading-relaxed font-light max-w-md pt-1">
                        {product.description?.en || product.description?.fi}
                      </p>
                    </div>

                    {/* Material & Tailoring Dossier */}
                    <div className="space-y-2 pt-2 font-mono text-[11px] text-black/60">
                      <div className="flex items-center justify-between max-w-sm">
                        <span className="text-black/40 uppercase tracking-widest text-[9.5px]">Composition</span>
                        <span>{product.material?.en || 'Virgin Wool'}</span>
                      </div>
                      <div className="flex items-center justify-between max-w-sm">
                        <span className="text-black/40 uppercase tracking-widest text-[9.5px]">Colorway</span>
                        <span>{product.colorName?.en || 'Obsidian'}</span>
                      </div>
                      <div className="flex items-center justify-between max-w-sm">
                        <span className="text-black/40 uppercase tracking-widest text-[9.5px]">Archive Value</span>
                        <span className="font-medium text-black">{formatPrice(product.price)}</span>
                      </div>
                    </div>

                    {/* Pure Typographic Action (Zero Box, Zero Border) */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="group/btn inline-flex items-center gap-2 py-2 text-xs uppercase font-mono tracking-[0.22em] text-black cursor-pointer relative"
                      >
                        <span className="group-hover/btn:underline underline-offset-8 transition-all">
                          Inspect Archival Piece
                        </span>
                        <ArrowUpRight className="w-4 h-4 stroke-[1.5] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
