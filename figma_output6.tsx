const imgVector = "https://www.figma.com/api/mcp/asset/ae2de8b7-264a-4d2d-9e51-6dc617da26e6";
const imgVector1 = "https://www.figma.com/api/mcp/asset/3de0a1df-5add-4c6e-9083-2e34fa852524";
const imgVector2 = "https://www.figma.com/api/mcp/asset/99c1777a-acc1-46ae-8935-7cad883904fa";
const imgVector3 = "https://www.figma.com/api/mcp/asset/c6cc066d-7418-4b9c-8cdf-5e601e9c433e";
type ComponentProps = {
  className?: string;
  variant?: "19" | "20";
};

function Component({ className, variant = "19" }: ComponentProps) {
  const is20 = variant === "20";
  return (
    <div className={className || "overflow-clip relative size-[14px]"} id={is20 ? "node-2_2672" : "node-2_2668"}>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector" id={is20 ? "node-2_2670" : "node-2_2666"}>
        <div className="absolute inset-[-0.58px_-7.14%]">
          <img alt="" className="block max-w-none size-full" src={is20 ? imgVector2 : imgVector} />
        </div>
      </div>
      <div className="absolute bottom-[20.83%] left-1/2 right-1/2 top-[20.83%]" data-name="Vector" id={is20 ? "node-2_2671" : "node-2_2667"}>
        <div className="absolute inset-[-7.14%_-0.58px]">
          <img alt="" className="block max-w-none size-full" src={is20 ? imgVector3 : imgVector1} />
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#eaedf0] content-stretch flex flex-col items-start px-[576px] py-[96px] relative size-full" data-name="Section" data-node-id="2:4451">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[768px] px-[24px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4452">
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4453">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container" data-node-id="2:4454">
            <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4051b5] text-[12px] text-center tracking-[1.2px] uppercase whitespace-nowrap" data-node-id="2:4455" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[16px]">FAQ</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2" data-node-id="2:4456">
            <div className="flex flex-col font-['Playfair_Display:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[48px] text-center whitespace-nowrap" data-node-id="2:4457">
              <p className="leading-[48px] mb-0">{`Questions &`}</p>
              <p className="font-['Playfair_Display:Italic',sans-serif] font-normal italic leading-[48px]">answers</p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start pt-[8px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4458">
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4459">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4460">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4460;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4460;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">Is the blackout really 100%?</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4460;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4461">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4462">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4462;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4462;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">How does the no-drill installation work?</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4462;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4463">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4464">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4464;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4464;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">What if I order the wrong size?</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4464;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4465">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4466">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4466;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4466;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">How do I clean it?</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4466;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4467">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4468">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4468;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4468;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">Do you offer custom sizes beyond the listed options?</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4468;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4469">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4470">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4470;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4470;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">How long does delivery take?</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4470;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-[#dbe0e6] border-b border-solid content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4471">
            <div className="relative shrink-0 w-full" data-name="Component 6" data-node-id="2:4472">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[20px] relative w-full">
                <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0" data-name="Container" data-node-id="I2:4472;2:2859">
                  <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[16px] whitespace-nowrap" data-node-id="I2:4472;2:2860" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <p className="leading-[24px]">{`What's your returns policy?`}</p>
                  </div>
                </div>
                <div className="bg-[#eaedf0] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[28px]" data-name="Background" data-node-id="I2:4472;2:2861">
                  <Component className="overflow-clip relative shrink-0 size-[14px]" variant="20" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[8px] items-center p-[32px] relative rounded-[16px] shrink-0 w-full" data-name="Background" data-node-id="2:4473">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container" data-node-id="2:4474">
            <div className="flex flex-col font-['Playfair_Display:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[20px] text-center whitespace-nowrap" data-node-id="2:4475">
              <p className="leading-[28px]">Still have questions?</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4476">
            <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[14px] text-center whitespace-nowrap" data-node-id="2:4477" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[20px]">Our team replies within a few hours, Monday to Friday.</p>
            </div>
          </div>
          <div className="bg-[#131720] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Component 2" data-node-id="2:4478">
            <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#f9fafb] text-[14px] text-center whitespace-nowrap" data-node-id="I2:4478;2:2698" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="leading-[20px]">hello@lumio.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}