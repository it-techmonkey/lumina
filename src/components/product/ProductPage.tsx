"use client";

import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductFeatures from "./ProductFeatures";
import ProductWhyLumina from "./ProductWhyLumina";

export default function ProductPage() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full min-h-screen bg-white pt-20 md:pt-24 pb-12 md:pb-20">
        {/* Breadcrumbs */}
        <div className="max-w-[1248px] mx-auto px-4 md:px-8 xl:px-0 mb-6">
        <div className="flex items-center gap-1.5 text-xs text-[#657186] font-sans">
          <span>Home</span>
          <span>/</span>
          <span>Blinds</span>
          <span>/</span>
          <span>Blackout</span>
          <span>/</span>
          <span className="text-[#131720]">The Lumina</span>
        </div>
      </div>

      <div className="max-w-[1248px] mx-auto px-4 md:px-8 xl:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[64px]">
        {/* Left Side - Sticky Gallery */}
        <div className="relative w-full">
          <div className="lg:sticky lg:top-24">
            <ProductGallery />
          </div>
        </div>

        {/* Right Side - Product Info */}
        <div className="w-full pt-2">
          <ProductInfo />
        </div>
      </div>
      </div>

      {/* Features Section below */}
      <ProductFeatures />

      {/* Why Lumina Section below */}
      <ProductWhyLumina />
    </div>
  );
}
