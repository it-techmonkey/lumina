"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoPreload = "none" | "metadata" | "auto";

interface SmartVideoProps {
  src: string;
  posterSrc: string;
  posterAlt: string;
  className?: string;
  preload?: VideoPreload;
  eager?: boolean;
  priorityPoster?: boolean;
  rootMargin?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
}

export default function SmartVideo({
  src,
  posterSrc,
  posterAlt,
  className = "object-cover w-full h-full",
  preload = "metadata",
  eager = false,
  priorityPoster = false,
  rootMargin = "200px",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: SmartVideoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(eager);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (eager || !wrapperRef.current) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const fallbackTimer = window.setTimeout(() => setIsInView(true), 0);

      return () => window.clearTimeout(fallbackTimer);
    }

    const target = wrapperRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [eager, rootMargin]);

  return (
    <div ref={wrapperRef} className="relative w-full h-full bg-[#dbe0e6]">
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority={priorityPoster}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`object-cover transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      />

      {isInView && (
        <video
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          className={`absolute inset-0 transition-opacity duration-500 ${className} ${isReady ? "opacity-100" : "opacity-0"}`}
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
        />
      )}
    </div>
  );
}