import React from 'react';
import { ArrowLeft, Compass, Feather, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/mockData';

interface StoryPageProps {
  onBackToHome: () => void;
  onExploreArchive: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ onBackToHome, onExploreArchive }) => {
  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] min-h-screen pt-24 sm:pt-32 pb-32 select-none">
      {/* Top Breadcrumb Navigation */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-8 sm:mb-12 flex items-center justify-between font-mono text-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors cursor-pointer uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span className="hover:underline underline-offset-4">Return Home</span>
        </button>
        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-black/40">
          ATELIER DOSSIER · EST. 2026
        </span>
      </div>

      {/* Hero Headline Section */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-16 sm:mb-28">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-black/40 block">
            HOUSE CHARTER & GENESIS
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight text-black leading-[1.02]">
            The Architecture of Silence
          </h1>
          <p className="text-xs sm:text-base md:text-lg font-sans text-black/70 max-w-2xl mx-auto leading-relaxed font-light pt-2">
            Zejesh was founded in opposition to the seasonal turnover of synthetic fashion. We construct permanent garments carved from natural virgin fibers, tailored with the restraint of Northern stone.
          </p>
        </div>
      </div>

      {/* Large Featured Editorial Image (Borderless) */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-24 sm:mb-36">
        <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-100 relative">
          <img
            src="/src/assets/images/hero_nordic_campaign_1790736679172.jpg"
            alt="Zejesh Campaign Still"
            className="w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-black/80 bg-white/80 backdrop-blur-sm px-3 py-1">
            Plate No. 00 · The Greatcoat in Obsidian Wool
          </div>
        </div>
      </div>

      {/* Chapter 01: The Northern Axis */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-28 sm:mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.2em] text-black/50">
              <Compass className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Chapter I · Geography</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-black leading-tight">
              Between Helsinki and Porto
            </h2>
            <div className="space-y-4 text-xs sm:text-sm font-sans text-black/75 leading-relaxed font-light">
              <p>
                Our aesthetic geometry is conceived in Helsinki. The cold, low winter light of the Finnish archipelago demands high-contrast silhouettes: sharp monolithic hemlines, exaggerated collars that brace against ocean gales, and total chromatic discipline.
              </p>
              <p>
                Our tailoring occurs in Porto, Portugal—the spiritual heart of European shuttle-loom weaving. In small multi-generational ateliers, our heavy 620 to 820 gsm virgin wools are woven slowly on low-tension mechanical looms, yielding a drape that refuses to collapse over decades of wear.
              </p>
            </div>
            <div className="pt-2 font-mono text-xs flex items-center gap-4 text-black/40">
              <span>60° 10&apos; N, 24° 56&apos; E</span>
              <span>·</span>
              <span>41° 09&apos; N, 08° 37&apos; W</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={PRODUCT_IMAGES.woolCoat}
                  alt="Helsinki Silhouette"
                  className="w-full h-full object-cover object-[center_20%] hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-neutral-100 sm:translate-y-12">
                <img
                  src={PRODUCT_IMAGES.mensTrench}
                  alt="Porto Tailoring"
                  className="w-full h-full object-cover object-[center_25%] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 02: The Material Standard */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 mb-28 sm:mb-40">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.2em] text-black/50">
            <Feather className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Chapter II · Fabrication</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-black">
            Zero Synthetic Compromise
          </h2>
          <p className="text-xs sm:text-sm font-sans text-black/70 leading-relaxed font-light">
            We operate under an absolute fabric charter. Every textile selected must decompose naturally back into the soil from which it grew.
          </p>
        </div>

        {/* Pure minimal cards (NO boxes, NO borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 font-mono text-xs">
          <div className="space-y-3">
            <span className="text-[10px] text-black/40 uppercase tracking-widest block">STANDARD 01</span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-black">Unblended Virgin Wool</h3>
            <p className="text-xs font-sans text-black/60 leading-relaxed font-light">
              High-micron pure fleece with intact lanolin. Naturally water-repellent, temperature-regulating, and immune to artificial pilling.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] text-black/40 uppercase tracking-widest block">STANDARD 02</span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-black">Natural Corozo Fasteners</h3>
            <p className="text-xs font-sans text-black/60 leading-relaxed font-light">
              Carved from the solid seed of the Tagua palm. Each button possesses distinct wood-grain patterns that deepen with age.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] text-black/40 uppercase tracking-widest block">STANDARD 03</span>
            <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-black">Permanent Architecture</h3>
            <p className="text-xs font-sans text-black/60 leading-relaxed font-light">
              Reinforced horn-stitched points of tension, double-turned hand hems, and structured internal horsehair canvases.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 03: The Accession Plate */}
      <section className="max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <ShieldCheck className="w-8 h-8 mx-auto stroke-[1.2] text-black/40" />
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-normal text-black">
            The Numbered Archive
          </h2>
          <p className="text-xs sm:text-sm font-sans text-black/70 leading-relaxed font-light">
            Every garment released by the house bears an immutable Accession Number (e.g. Nº 001, Nº 014). We do not produce disposable trend collections; we register permanent plates into an ongoing open library.
          </p>
          {/* Pure Typographic Action Links (Zero Box, Zero Border) */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-8 font-mono text-xs uppercase tracking-[0.2em]">
            <button
              type="button"
              onClick={onExploreArchive}
              className="group flex items-center gap-2 text-black cursor-pointer hover:opacity-60 transition-opacity"
            >
              <span className="underline underline-offset-8">Explore Complete Archive</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-black/50 hover:text-black cursor-pointer transition-colors"
            >
              <span className="hover:underline underline-offset-8">Return to Storefront</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
