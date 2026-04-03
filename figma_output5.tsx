const imgVector = "https://www.figma.com/api/mcp/asset/e8e5c5a1-b2f0-4ea1-b1ac-230a340a6525";
const imgVector1 = "https://www.figma.com/api/mcp/asset/493d3122-cdf6-419d-9e15-52fd0bf2e2d0";
const imgJakobL = "https://www.figma.com/api/mcp/asset/c526e3a5-0615-490d-b5ee-a21249e3ebfc";
const imgSaraM = "https://www.figma.com/api/mcp/asset/a6b781b4-14eb-4b57-bf4b-0914cae9f666";
const imgTomR = "https://www.figma.com/api/mcp/asset/3d5e9570-e158-4195-a483-844925f2f7fb";
const imgAnnikaB = "https://www.figma.com/api/mcp/asset/b2838994-fe3a-46e7-98c9-5668919eba44";
const imgDavidK = "https://www.figma.com/api/mcp/asset/eb25f733-9773-45c6-af77-38ffbf64ffb2";
type ComponentProps = {
  className?: string;
  variant?: "17" | "18";
};

function Component({ className, variant = "17" }: ComponentProps) {
  const is18 = variant === "18";
  return (
    <div className={className || `overflow-clip relative ${is18 ? "size-[14px]" : "size-[20px]"}`} id={is18 ? "node-2_2664" : "node-2_2661"}>
      <div className="absolute inset-[8.33%_8.33%_12.2%_8.33%]" data-name="Vector" id={is18 ? "node-2_2663" : "node-2_2660"}>
        <div className="absolute inset-[-5.24%_-5%]">
          <img alt="" className="block max-w-none size-full" src={is18 ? imgVector1 : imgVector} />
        </div>
      </div>
    </div>
  );
}

export default function Section() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col items-start px-[320px] py-[96px] relative size-full" data-name="Section" data-node-id="2:4334">
      <div className="content-stretch flex flex-col gap-[56px] items-start max-w-[1280px] px-[24px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4335">
        <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Container" data-node-id="2:4336">
          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[283px]" data-name="Container" data-node-id="2:4337">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4338">
              <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4051b5] text-[12px] tracking-[1.2px] uppercase whitespace-nowrap" data-node-id="2:4339" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[16px]">Reviews</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="2:4340">
              <div className="flex flex-col font-['Playfair_Display:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[48px] whitespace-nowrap" data-node-id="2:4341">
                <p className="leading-[48px] mb-0">What our</p>
                <p className="font-['Playfair_Display:Italic',sans-serif] font-normal italic leading-[48px]">customers say</p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-center pb-[8px] relative shrink-0" data-name="Container" data-node-id="2:4342">
            <div className="content-stretch flex items-start relative shrink-0" data-name="Container" data-node-id="2:4343">
              <Component className="overflow-clip relative shrink-0 size-[20px]" />
              <Component className="overflow-clip relative shrink-0 size-[20px]" />
              <Component className="overflow-clip relative shrink-0 size-[20px]" />
              <Component className="overflow-clip relative shrink-0 size-[20px]" />
              <Component className="overflow-clip relative shrink-0 size-[20px]" />
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-[159px]" data-name="Container" data-node-id="2:4349">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4350">
                <div className="flex flex-col font-['Playfair_Display:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#131720] text-[24px] whitespace-nowrap" data-node-id="2:4351">
                  <p className="leading-[32px]">4.9 / 5</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4352">
                <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4353" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[16px]">from 2,400+ verified reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gap-x-[20px] gap-y-[20px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[__240px_217.25px] h-[477.25px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4354">
          <div className="bg-[#eaedf0] col-1 content-stretch flex flex-col gap-[15.3px] items-start justify-self-stretch p-[28px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Background" data-node-id="2:4355">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4356">
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
            </div>
            <div className="content-stretch flex flex-col items-start pb-[23.45px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4362">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] w-full" data-node-id="2:4363" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[22.75px] mb-0">{`"Genuinely the best blackout blind I've ever used.`}</p>
                <p className="leading-[22.75px] mb-0">Not a single sliver of light comes through, even in</p>
                <p className="leading-[22.75px]">{`summer. And installation? Three minutes, no joke."`}</p>
              </div>
            </div>
            <div className="border-[#dbe0e6] border-solid border-t content-stretch flex gap-[12px] items-center pt-[9px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4364">
              <div className="max-w-[341.3299865722656px] rounded-[9999px] shrink-0 size-[36px]" data-name="Emma T." data-node-id="2:4365" />
              <div className="relative shrink-0 w-[164px]" data-name="Container" data-node-id="2:4366">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4367">
                    <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] whitespace-nowrap" data-node-id="2:4368" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p>
                        <span className="leading-[20px]">{`Emma T. · `}</span>
                        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[20px] text-[#657186]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Amsterdam
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4369">
                    <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4370" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p className="leading-[16px]">Lumio · Midnight · 100×150cm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#eaedf0] col-2 content-stretch flex flex-col gap-[16px] items-start justify-self-stretch p-[28px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Background" data-node-id="2:4371">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4372">
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4378">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] w-full" data-node-id="2:4379" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[22.75px] mb-0">{`"I've tried four other blackout blinds. None came`}</p>
                <p className="leading-[22.75px] mb-0">close. The fabric is thick but elegant. The tension</p>
                <p className="leading-[22.75px] mb-0">mount is so much better than drilling. Ordering two</p>
                <p className="leading-[22.75px]">{`more."`}</p>
              </div>
            </div>
            <div className="border-[#dbe0e6] border-solid border-t content-stretch flex gap-[12px] items-center pt-[9px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4380">
              <div className="max-w-[341.3299865722656px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Jakob L." data-node-id="2:4381">
                <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
                  <img alt="" className="absolute h-full left-[-25%] max-w-none top-0 w-[150%]" src={imgJakobL} />
                </div>
              </div>
              <div className="relative shrink-0 w-[173px]" data-name="Container" data-node-id="2:4382">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4383">
                    <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] whitespace-nowrap" data-node-id="2:4384" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p>
                        <span className="leading-[20px]">{`Jakob L. · `}</span>
                        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[20px] text-[#657186]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Copenhagen
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4385">
                    <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4386" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p className="leading-[16px]">Lumio · Dusk Stone · 80×120cm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#eaedf0] col-3 content-stretch flex flex-col gap-[15.3px] items-start justify-self-stretch p-[28px] relative rounded-[16px] row-1 self-start shrink-0" data-name="Background" data-node-id="2:4387">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4388">
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
            </div>
            <div className="content-stretch flex flex-col items-start pb-[23.45px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4394">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] w-full" data-node-id="2:4395" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[22.75px] mb-0">{`"My baby finally sleeps through the night. I'd been`}</p>
                <p className="leading-[22.75px] mb-0">struggling for months. This blind transformed the</p>
                <p className="leading-[22.75px]">{`room. Ordered custom size and it fit perfectly."`}</p>
              </div>
            </div>
            <div className="border-[#dbe0e6] border-solid border-t content-stretch flex gap-[12px] items-center pt-[9px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4396">
              <div className="max-w-[341.3399963378906px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Sara M." data-node-id="2:4397">
                <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
                  <img alt="" className="absolute h-full left-[-25%] max-w-none top-0 w-[150%]" src={imgSaraM} />
                </div>
              </div>
              <div className="relative shrink-0 w-[169px]" data-name="Container" data-node-id="2:4398">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4399">
                    <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] whitespace-nowrap" data-node-id="2:4400" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p>
                        <span className="leading-[20px]">{`Sara M. · `}</span>
                        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[20px] text-[#657186]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Helsinki
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4401">
                    <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4402" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p className="leading-[16px]">Lumio · Nordic White · Custom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#eaedf0] col-1 content-stretch flex flex-col gap-[15.3px] items-start justify-self-stretch p-[28px] relative rounded-[16px] row-2 self-start shrink-0" data-name="Background" data-node-id="2:4403">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4404">
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
            </div>
            <div className="content-stretch flex flex-col items-start pb-[0.7px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4410">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] w-full" data-node-id="2:4411" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[22.75px] mb-0">{`"Rented flat — couldn't drill anything. The tension`}</p>
                <p className="leading-[22.75px] mb-0">mount is a game changer. Looks incredibly premium,</p>
                <p className="leading-[22.75px]">{`the landlord didn't even notice when I moved out."`}</p>
              </div>
            </div>
            <div className="border-[#dbe0e6] border-solid border-t content-stretch flex gap-[12px] items-center pt-[9px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4412">
              <div className="max-w-[341.3299865722656px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Tom R." data-node-id="2:4413">
                <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
                  <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full" src={imgTomR} />
                </div>
              </div>
              <div className="relative shrink-0 w-[163px]" data-name="Container" data-node-id="2:4414">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4415">
                    <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] whitespace-nowrap" data-node-id="2:4416" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p>
                        <span className="leading-[20px]">{`Tom R. · `}</span>
                        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[20px] text-[#657186]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          London
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4417">
                    <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4418" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p className="leading-[16px]">Lumio · Midnight · 120×180cm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#eaedf0] col-2 content-stretch flex flex-col gap-[15.3px] items-start justify-self-stretch p-[28px] relative rounded-[16px] row-2 self-start shrink-0" data-name="Background" data-node-id="2:4419">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4420">
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
            </div>
            <div className="content-stretch flex flex-col items-start pb-[0.7px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4426">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] w-full" data-node-id="2:4427" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[22.75px] mb-0">{`"I love how clean and minimal it looks. The Nordic`}</p>
                <p className="leading-[22.75px] mb-0">{`White matches my walls perfectly. Couldn't be`}</p>
                <p className="leading-[22.75px]">{`happier — already recommended to five friends."`}</p>
              </div>
            </div>
            <div className="border-[#dbe0e6] border-solid border-t content-stretch flex gap-[12px] items-center pt-[9px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4428">
              <div className="max-w-[341.3299865722656px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="Annika B." data-node-id="2:4429">
                <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
                  <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full" src={imgAnnikaB} />
                </div>
              </div>
              <div className="relative shrink-0 w-[180px]" data-name="Container" data-node-id="2:4430">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4431">
                    <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] whitespace-nowrap" data-node-id="2:4432" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p>
                        <span className="leading-[20px]">{`Annika B. · `}</span>
                        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[20px] text-[#657186]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Stockholm
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4433">
                    <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4434" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p className="leading-[16px]">Lumio · Nordic White · 60×90cm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#eaedf0] col-3 content-stretch flex flex-col gap-[15.3px] items-start justify-self-stretch p-[28px] relative rounded-[16px] row-2 self-start shrink-0" data-name="Background" data-node-id="2:4435">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4436">
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
              <Component className="overflow-clip relative shrink-0 size-[14px]" variant="18" />
            </div>
            <div className="content-stretch flex flex-col items-start pb-[0.7px] relative shrink-0 w-full" data-name="Container" data-node-id="2:4442">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] w-full" data-node-id="2:4443" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[22.75px] mb-0">{`"Fast shipping, perfect fit, total blackout. Exactly`}</p>
                <p className="leading-[22.75px] mb-0">what it says on the box. I was sceptical about the</p>
                <p className="leading-[22.75px]">{`no-drill claim but it genuinely works. Solid product."`}</p>
              </div>
            </div>
            <div className="border-[#dbe0e6] border-solid border-t content-stretch flex gap-[12px] items-center pt-[9px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="2:4444">
              <div className="max-w-[341.3399963378906px] relative rounded-[9999px] shrink-0 size-[36px]" data-name="David K." data-node-id="2:4445">
                <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
                  <img alt="" className="absolute h-[150%] left-0 max-w-none top-[-25%] w-full" src={imgDavidK} />
                </div>
              </div>
              <div className="relative shrink-0 w-[181px]" data-name="Container" data-node-id="2:4446">
                <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4447">
                    <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#131720] text-[14px] whitespace-nowrap" data-node-id="2:4448" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p>
                        <span className="leading-[20px]">{`David K. · `}</span>
                        <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[20px] text-[#657186]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Berlin
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="2:4449">
                    <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#657186] text-[12px] whitespace-nowrap" data-node-id="2:4450" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <p className="leading-[16px]">Lumio · Dusk Stone · 140×200cm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}