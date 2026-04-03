"use client";

import { useState } from "react";
import ProductAccordion from "./ProductAccordion";

const sizes = [
  "60×90",
  "80×120",
  "100×150",
  "120×180",
  "140×200",
  "Custom",
];

const blindColors = [
  { id: "nordic-white", hex: "#f2efe9" },
  { id: "dusk-stone", hex: "#b8afa6" },
  { id: "midnight", hex: "#2c2925" },
];

const frameColors = [
  { id: "white", hex: "#f5f2ee" },
  { id: "charcoal", hex: "#4a4845" },
];

export default function ProductInfo() {
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [size, setSize] = useState<string>("100×150");
  const [width, setWidth] = useState("100");
  const [height, setHeight] = useState("150");
  
  const [blindColor, setBlindColor] = useState("nordic-white");
  const [frameColor, setFrameColor] = useState("white");

  // Calculate generic price based on chosen elements... Let's just do a base
  const price = "$118";

  return (
    <div className="flex flex-col gap-6 w-full max-w-[600px] pb-16">
      {/* Header Info */}
      <div className="flex flex-col gap-2">
        <span className="font-sans font-medium text-[#4051b5] text-[12px] tracking-[1.2px] uppercase">
          Total Blackout Blind
        </span>
        <h1 className="font-playfair font-medium text-[#131720] text-4xl lg:text-[48px] leading-tight">
          The Lumina Blind
        </h1>
        <div className="flex items-center text-sm gap-2">
          <div className="flex gap-0.5 text-[#131720]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              ))}
          </div>
          <span className="font-sans text-[#657186] font-normal">
            4.9 · 2,400 reviews
          </span>
        </div>
      </div>

      {/* Delivery */}
      <div className="bg-[#eaedf0] rounded-xl flex items-center gap-3 py-4 px-4 w-full">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#131720]">
            <rect x="3" y="8" width="18" height="10" rx="2"></rect>
            <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
            <circle cx="8" cy="18" r="2"></circle>
            <circle cx="16" cy="18" r="2"></circle>
        </svg>
        <div className="flex flex-col text-sm">
          <span className="font-sans text-[#657186]">Estimated Delivery</span>
          <span className="font-sans font-semibold text-[#131720]">3–5 Working Days</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-end gap-2 pt-2">
        <span className="font-playfair font-medium text-[36px] text-[#131720] leading-none">
          {price}
        </span>
        <span className="font-sans text-[#657186] text-[14px]">
          incl. VAT · free shipping
        </span>
      </div>

      {/* Size Selector */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center justify-between">
          <span className="font-sans font-semibold text-[14px] text-[#131720]">
            Measure your window
          </span>
          <div className="flex border border-[#dbe0e6] rounded-lg p-0.5 bg-white">
            <button 
              onClick={() => setUnit("cm")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${unit === "cm" ? "bg-[#131720] text-white" : "text-[#657186]"}`}
            >
              cm
            </button>
            <button 
              onClick={() => setUnit("in")}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${unit === "in" ? "bg-[#131720] text-white" : "text-[#657186]"}`}
            >
              in
            </button>
          </div>
        </div>

        {/* Quick Sizes */}
        <div className="flex flex-wrap gap-2 text-sm">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-3 py-1.5 rounded-full border transition-colors ${
                size === s 
                  ? "border-[#131720] bg-[#131720] text-white" 
                  : s === "Custom" 
                    ? "border-[#4051b5]/30 text-[#4051b5] hover:bg-[#4051b5]/5" 
                    : "border-[#dbe0e6] text-[#657186] hover:border-[#131720]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Custom Inputs */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#657186]">Width ({unit})</label>
            <input 
              type="text" 
              value={width} 
              onChange={(e) => setWidth(e.target.value)}
              className="border border-[#dbe0e6] bg-[#f9fafb] rounded-xl px-3 py-2.5 text-sm text-[#131720] outline-none focus:border-[#131720]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[#657186]">Height ({unit})</label>
            <input 
              type="text" 
              value={height} 
              onChange={(e) => setHeight(e.target.value)}
              className="border border-[#dbe0e6] bg-[#f9fafb] rounded-xl px-3 py-2.5 text-sm text-[#131720] outline-none focus:border-[#131720]"
            />
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[14px]">
            <span className="font-semibold text-[#131720]">Blind Colour — </span>
            <span className="text-[#657186]">{blindColors.find(c => c.id === blindColor)?.id.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
          </span>
          <div className="flex gap-3">
            {blindColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setBlindColor(color.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${blindColor === color.id ? 'ring-2 ring-offset-2 ring-[#131720]' : 'ring-1 ring-[#dbe0e6] hover:ring-[#131720]/50'}`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.id}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <span className="font-sans text-[14px]">
            <span className="font-semibold text-[#131720]">Frame Colour — </span>
            <span className="text-[#657186]">{frameColors.find(c => c.id === frameColor)?.id.replace(/\b\w/g, l => l.toUpperCase())}</span>
          </span>
          <div className="flex gap-3">
            {frameColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setFrameColor(color.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${frameColor === color.id ? 'ring-2 ring-offset-2 ring-[#131720]' : 'ring-1 ring-[#dbe0e6] hover:ring-[#131720]/50'}`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Select ${color.id}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add To Cart */}
      <div className="flex flex-col gap-3 mt-6">
        <button className="bg-[#131720] hover:bg-black transition-colors w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
        <span className="text-center text-xs text-[#657186]">
          Free returns within 60 days · 5-year warranty
        </span>
      </div>

      {/* Guarantee Grid */}
      <div className="grid grid-cols-3 gap-2 py-6 border-t border-[#dbe0e6] mt-4">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="bg-[#eaedf0] rounded-full w-10 h-10 flex items-center justify-center mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#131720]">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <span className="font-semibold text-xs text-[#131720]">5-Year Warranty</span>
            <span className="text-xs text-[#657186]">Manufacturer backed guarantee</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="bg-[#eaedf0] rounded-full w-10 h-10 flex items-center justify-center mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#131720]">
                <path d="M12.5 10L5.52253 16.9775C5.19101 17.309 4.74137 17.4953 4.27253 17.4953C3.80369 17.4953 3.35405 17.309 3.02253 16.9775C2.69101 16.646 2.50476 16.1963 2.50476 15.7275C2.50476 15.2587 2.69101 14.809 3.02253 14.4775L10 7.5" />
                <path d="M15 12.5L18.3333 9.16663" />
                <path d="M17.9167 9.58334L16.3217 7.98834C16.0091 7.67585 15.8334 7.252 15.8333 6.81001V5.83334L13.95 3.95001C13.0204 3.021 11.7625 2.49531 10.4483 2.48667L7.5 2.46667L8.26667 3.15001C8.81121 3.63283 9.24724 4.22559 9.54602 4.88921C9.84479 5.55283 9.99952 6.27224 10 7.00001V8.33334L11.6667 10H12.6433C13.0853 10.0001 13.5092 10.1758 13.8217 10.4883L15.4167 12.0833" />
              </svg>
            </div>
            <span className="font-semibold text-xs text-[#131720]">Easy Install</span>
            <span className="text-xs text-[#657186]">No tools needed, all fittings included</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="bg-[#eaedf0] rounded-full w-10 h-10 flex items-center justify-center mb-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#131720]">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <span className="font-semibold text-xs text-[#131720]">4.9 / 5 Stars</span>
            <span className="text-xs text-[#657186]">Rated Excellent — 2,400+ reviews</span>
          </div>
      </div>

      {/* Accordions */}
      <div className="border-t border-[#dbe0e6]">
         <ProductAccordion />
      </div>

    </div>
  );
}
