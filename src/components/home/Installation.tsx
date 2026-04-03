import Image from 'next/image';

const steps = [
  {
    number: 1,
    title: 'Unbox & unroll',
    description: 'Remove the blind from its tube. It unrolls flat in seconds.',
  },
  {
    number: 2,
    title: 'Extend the tension bar',
    description: 'Twist and pull both end caps outward until the bar spans your window width.',
  },
  {
    number: 3,
    title: 'Press & click',
    description: 'Push both ends firmly into the window recess until you feel them click into place. The spring tension holds it secure.',
  },
  {
    number: 4,
    title: 'Done',
    description: 'Pull down to close, push back up to let light in. That\'s it — no instructions booklet required.',
  },
];

export default function Installation() {
  return (
    <section className="bg-[#eaedf0] py-16 md:py-24 px-6 relative w-full">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-10 md:gap-14">
        {/* Header Content */}
        <div className="flex flex-col items-center gap-4 max-w-[672px] w-full text-center">
          <p className="font-[family-name:var(--font-dm-sans)] font-medium text-[#4051b5] text-xs tracking-[1.2px] uppercase">
            Installation
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-[48px] leading-tight md:leading-[48px] text-[#131720]">
            <span className="font-medium">Installed in </span>
            <span className="italic font-normal">three minutes</span>
          </h2>
          <p className="font-[family-name:var(--font-dm-sans)] font-normal text-[#657186] text-base leading-6">
            No drills. No screws. No wall damage. Our tension-mount system works in any standard window recess.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#f9fafb] flex flex-col gap-2 items-start justify-start p-7 pb-12 relative rounded-2xl overflow-hidden"
            >
              {/* Number Badge */}
              <div className="bg-[#131720] flex items-center justify-center rounded-full size-9 mb-1 shrink-0 z-10">
                <span className="font-[family-name:var(--font-playfair)] font-semibold text-[#f9fafb] text-sm leading-5">
                  {step.number}
                </span>
              </div>
              
              <h3 className="font-[family-name:var(--font-playfair)] font-medium text-[#131720] text-lg leading-7 z-10">
                {step.title}
              </h3>
              
              <p className="font-[family-name:var(--font-dm-sans)] font-normal text-[#657186] text-sm leading-[22.75px] z-10">
                {step.description}
              </p>

              {/* Large Faint Number */}
              <div className="absolute right-7 top-11 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none">
                <span className="font-[family-name:var(--font-playfair)] font-bold text-[48px] leading-[48px] text-[#131720]/5">
                  {step.number}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Image Area */}
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden flex flex-col items-center justify-center">
          <Image
            src="/home/craftsmanship-bg.webp"
            alt="Clean Scandinavian bedroom with window"
            fill
            className="object-cover pointer-events-none"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-[#131720]/40 flex flex-col justify-center items-center px-6 z-10 text-center">
            <h3 className="font-[family-name:var(--font-playfair)] font-medium italic text-white text-3xl md:text-4xl leading-tight md:leading-10 mb-2">
              No tools. No damage.
            </h3>
            <p className="font-[family-name:var(--font-dm-sans)] font-normal text-white/75 text-sm md:text-base leading-5">
              Works in any standard window recess, 5–80mm deep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
