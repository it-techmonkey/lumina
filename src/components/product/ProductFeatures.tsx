import Image from "next/image";
import Link from "next/link";

export default function ProductFeatures() {
  return (
    <section className="w-full bg-[#eaedf0] py-16 md:py-24 object-cover px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-10 md:gap-14">

        {/* Banner Section */}
        <div className="bg-[#131720] rounded-[24px] w-full overflow-hidden flex flex-col md:grid md:grid-cols-2 relative min-h-[431px]">

          <div className="flex flex-col items-start justify-center p-8 md:p-14 z-10 order-2 md:order-1">
            <div className="text-[#f9fafb] text-[40px] md:text-[48px] leading-tight font-playfair font-medium mb-6">
              90% of adults say light <br />
              exposure <span className="font-playfair font-normal italic">ruins their <br/> sleep</span>
            </div>
            
            <p className="text-[14px] text-[rgba(255,255,255,0.7)] font-sans leading-[1.6] max-w-md mb-8">
              When sunlight and street-lamp glare sneak into your bedroom, it disrupts
              your circadian rhythm, spikes cortisol, and fragments your deep sleep cycles.
              The result? You wake up exhausted, irritable, and fog-brained — even after 8
              hours in bed.
            </p>
            
            <Link 
              href="#fix-sleep" 
              className="bg-white text-[#131720] font-sans font-medium text-[14px] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Fix Your Sleep &rarr;
            </Link>
          </div>

          <div className="relative w-full h-[300px] md:h-full opacity-60 order-1 md:order-2">      
            <Image 
              src="/product/sleep-struggle.webp" 
              alt="Person struggling to sleep with light"
              fill
              className="object-cover object-right"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#131720] via-transparent to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131720] via-transparent to-transparent block md:hidden" />
          </div>
        </div>

        {/* 3-in-1 Features Heading */}
        <div className="flex flex-col items-center gap-2 mt-4 text-center">
          <h2 className="text-[#131720] text-[36px] font-playfair font-medium leading-tight">
            A 3-in-1 solution
          </h2>
          <p className="text-[#657186] text-[14px] font-sans">
            One blind. Three measurable improvements to your home.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-[#f9fafb] rounded-[16px] overflow-hidden flex flex-col">
            <div className="relative w-full aspect-[4/3] md:h-[298px]">
              <video 
                src="/product/blackout.mp4" 
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-playfair font-medium text-[20px] text-[#131720]">100% Blackout</h3>
              <p className="font-sans text-[14px] text-[#657186] leading-relaxed">
                Unlike traditional curtains, our triple-layer fabric ensures complete darkness at any time of day — noon or midnight.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f9fafb] rounded-[16px] overflow-hidden flex flex-col">
            <div className="relative w-full aspect-[4/3] md:h-[298px]">
              <Image 
                src="/home/measuring-guide-img.webp" 
                alt="No-Drill Install"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-playfair font-medium text-[20px] text-[#131720]">No-Drill Install</h3>
              <p className="font-sans text-[14px] text-[#657186] leading-relaxed">
                A 4-step tension-fit setup with no tools or DIY expertise required. Damage-free — perfect for renters.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f9fafb] rounded-[16px] overflow-hidden flex flex-col">
            <div className="relative w-full aspect-[4/3] md:h-[298px]">
              <Image 
                src="/product/energy-efficient.webp" 
                alt="Energy Efficient"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h3 className="font-playfair font-medium text-[20px] text-[#131720]">Energy Efficient</h3>
              <p className="font-sans text-[14px] text-[#657186] leading-relaxed">
                Our honeycomb fabric structure traps air, insulating your room. Warmer in winter, cooler in summer — lower energy bills.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
