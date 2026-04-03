const imgVector = "https://www.figma.com/api/mcp/asset/c0df6e45-2655-405b-8600-ae188822f8e8";
const imgVector1 = "https://www.figma.com/api/mcp/asset/ee81808a-44a9-4a50-9472-b55b770682bb";
const imgLumioBlindInACalmBedroom = "https://www.figma.com/api/mcp/asset/80e4c25e-9703-4405-bfb8-a3082f5d6bc9";
const imgCloseUpOfTheBlindFabric = "https://www.figma.com/api/mcp/asset/ab7abc1a-d816-470b-be51-212fdfc01be7";
type ComponentProps = {
  className?: string;
  variant?: "16";
};

function Component({ className, variant = "16" }: ComponentProps) {
  return (
    <div className={className || "overflow-clip relative size-[15px]"} data-node-id="2:2658">
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector" data-node-id="2:2656">
        <div className="absolute inset-[-0.63px_-7.14%]">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]" data-name="Vector" data-node-id="2:2657">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <img alt="" className="block max-w-none size-full" src={imgVector1} />
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#eaedf0] content-stretch flex flex-col items-start px-[344px] py-[96px] relative size-full" data-name="Section" data-node-id="2:4192">
      <div className="gap-x-[96px] gap-y-[96px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_710px] h-[710px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4193">
        <div className="col-2 h-[651px] justify-self-stretch relative row-1 self-center shrink-0" data-name="Container" data-node-id="2:4194">
          <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-name="Container" data-node-id="2:4195">
            <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4051b5] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap" data-node-id="2:4196" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[16px]">Our Story</p>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[32px]" data-name="Heading 2" data-node-id="2:4197">
            <div className="flex flex-col font-['Playfair_Display:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[48px] whitespace-nowrap" data-node-id="2:4198">
              <p className="leading-[48px] mb-0">Built for people who</p>
              <p className="font-['Playfair_Display:Italic',sans-serif] font-normal italic leading-[48px]">take sleep seriously</p>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-0 pt-[8px] right-0 top-[144px]" data-name="Container" data-node-id="2:4199">
            <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[16px] whitespace-nowrap" data-node-id="2:4200" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[26px] mb-0">Lumio started with a simple frustration: every blackout blind on the market</p>
              <p className="leading-[26px] mb-0">either leaked light, looked cheap, or required drilling into rented walls. We</p>
              <p className="leading-[26px]">spent three years building something better.</p>
            </div>
          </div>
          <div className="absolute content-stretch flex flex-col items-start left-0 pb-[16px] pt-[4px] right-0 top-[246px]" data-name="Container" data-node-id="2:4201">
            <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[16px] whitespace-nowrap" data-node-id="2:4202" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[26px] mb-0">Today, our blinds are trusted in over 40,000 homes across Europe — from</p>
              <p className="leading-[26px] mb-0">new parents in Helsinki to night-shift nurses in London. Every blind is made</p>
              <p className="leading-[26px] mb-0">to your exact measurements, ships within three days, and installs without a</p>
              <p className="leading-[26px]">single drill hole.</p>
            </div>
          </div>
          <a className="absolute bg-[#131720] content-stretch cursor-pointer flex gap-[8px] items-center left-0 px-[28px] py-[14px] rounded-[9999px] top-[386px]" data-name="Component 5" data-node-id="2:4203">
            <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#f9fafb] text-[14px] text-left whitespace-nowrap" data-node-id="I2:4203;2:2847" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[20px]">See the Blind</p>
            </div>
            <Component className="overflow-clip relative shrink-0 size-[15px]" />
          </a>
          <div className="absolute border-[#dbe0e6] border-solid border-t gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__58px_58px] h-[169px] left-0 pt-[33px] right-0 top-[482px]" data-name="HorizontalBorder" data-node-id="2:4204">
            <div className="col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container" data-node-id="2:4205">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4206">
                  <div className="flex flex-col font-['Playfair_Display:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#131720] text-[30px] w-full" data-node-id="2:4207">
                    <p className="leading-[36px]">40,000+</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4208">
                  <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[14px] w-full" data-node-id="2:4209" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[20px]">Homes across Europe</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Container" data-node-id="2:4210">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4211">
                  <div className="flex flex-col font-['Playfair_Display:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#131720] text-[30px] w-full" data-node-id="2:4212">
                    <p className="leading-[36px]">4.9 / 5</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4213">
                  <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[14px] w-full" data-node-id="2:4214" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[20px]">Average review score</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1 justify-self-stretch relative row-2 self-start shrink-0" data-name="Container" data-node-id="2:4215">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4216">
                  <div className="flex flex-col font-['Playfair_Display:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#131720] text-[30px] w-full" data-node-id="2:4217">
                    <p className="leading-[36px]">±1mm</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4218">
                  <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[14px] w-full" data-node-id="2:4219" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[20px]">Cutting precision</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 justify-self-stretch relative row-2 self-start shrink-0" data-name="Container" data-node-id="2:4220">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4221">
                  <div className="flex flex-col font-['Playfair_Display:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#131720] text-[30px] w-full" data-node-id="2:4222">
                    <p className="leading-[36px]">3 min</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4223">
                  <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[14px] w-full" data-node-id="2:4224" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[20px]">Average install time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1 content-stretch flex flex-col items-start justify-self-stretch relative row-1 self-center shrink-0" data-name="Container" data-node-id="2:4225">
          <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[24px] shrink-0 w-full" data-name="Container" data-node-id="2:4226">
            <div className="h-[710px] relative shrink-0 w-full" data-name="Lumio blind in a calm bedroom" data-node-id="2:4227">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-full left-[-12.5%] max-w-none top-0 w-[125%]" src={imgLumioBlindInACalmBedroom} />
              </div>
            </div>
          </div>
          <div className="absolute bg-[rgba(255,255,255,0)] border-4 border-[#f9fafb] border-solid bottom-[-20px] content-stretch flex flex-col h-[208px] items-start justify-center overflow-clip p-[4px] right-[-32px] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] w-[160px]" data-name="Overlay+Border+Shadow" data-node-id="2:4228">
            <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Close up of the blind fabric" data-node-id="2:4229">
              <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-full left-[-39.81%] max-w-none top-0 w-[179.63%]" src={imgCloseUpOfTheBlindFabric} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}