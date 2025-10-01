"use client";

import React from "react";
import Image from "next/image";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";

// some versions of @material-tailwind/react have overly-strict prop types
// which can force unrelated DOM-like props to appear required. Cast to any
// locally to keep the runtime behavior unchanged while silencing TS errors.
const CardAny: any = Card;
const CardBodyAny: any = CardBody;
const TypographyAny: any = Typography;
const AvatarAny: any = Avatar;

export function HobbyScianka() {
  // keep type explicit and bounded to avoid invalid indexes
  const [active, setActive] = React.useState<number>(2);
  const [imgSrc, setImgSrc] = React.useState<string>(`/image/scianka/scianka${active}.jpg`);

  React.useEffect(() => {
    const idx = Math.min(4, Math.max(1, Math.floor(active) || 1));
    setImgSrc(`/image/scianka/scianka${idx}.jpg`);
  }, [active]);

  const handleSelect = (n: number) => {
    const idx = Math.min(4, Math.max(1, n));
    setActive(idx);
  };

  const onImageError = () => {
    // lightweight SVG fallback if image is missing
    const svgFallback = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='576' height='768'><rect fill='%23e5e7eb' width='100%' height='100%'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23888' font-size='20'>No image</text></svg>`;
    setImgSrc(svgFallback);
  };

  return (
    <section className="py-2 px-8 lg:py-12">
      <div className="container max-w-screen-lg mx-auto">
        <CardAny color="transparent" shadow={false} className="py-8 lg:flex-row">
          <CardBodyAny className="w-full lg:gap-10 h-full lg:!flex justify-between">
            {/* Text section */}
            <div className="w-full mb-10 lg:mb-0">
              <TypographyAny variant="h3" color="blue-gray" className="mb-4 font-bold lg:max-w-xs">
                3. Wspinaczka ściankowa
              </TypographyAny>
              <TypographyAny className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500">
                Wspinaczka ściankowa to dla mnie świetny sposób na poprawę siły, techniki i koncentracji. Zacząłem od boulderowni, ale z czasem przerzuciłem się też na wspinanie z liną. Wymaga skupienia, planowania i dobrej współpracy z partnerem asekuracyjnym — co przekłada się też na inne obszary życia.
              </TypographyAny>
              <TypographyAny variant="h6" color="blue-gray" className="mb-0.5">
                Pare zdjęć
              </TypographyAny>
              <div className="flex items-center gap-4">
                <AvatarAny
                  variant="rounded"
                  src="/image/scianka/scianka1.jpg"
                  alt="scianka zdjęcie 1"
                  size="xl"
                  className={`cursor-pointer ${active === 1 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => handleSelect(1)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(1);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === 1}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <AvatarAny
                  variant="rounded"
                  src="/image/scianka/scianka2.jpg"
                  alt="scianka zdjęcie 2"
                  size="xl"
                  className={`cursor-pointer ${active === 2 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => handleSelect(2)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(2);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === 2}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <AvatarAny
                  variant="rounded"
                  src="/image/scianka/scianka3.jpg"
                  alt="scianka zdjęcie 3"
                  size="xl"
                  className={`cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => handleSelect(3)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(3);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === 3}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <AvatarAny
                  variant="rounded"
                  src="/image/scianka/scianka4.jpg"
                  alt="scianka zdjęcie 4"
                  size="xl"
                  className={`cursor-pointer ${active === 4 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => handleSelect(4)}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(4);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active === 4}
                />
              </div>
            </div>

            {/* Image section */}
            <div className="h-full sm:w-[18rem] w-full shrink-0">
              <div className="aspect-w-3 aspect-h-4 w-full">
                <Image
                  width={576}
                  height={768}
                  src={imgSrc}
                  alt={`Zdjęcie wspinaczki ${active}`}
                  className="h-full w-full object-cover rounded-lg"
                  onError={onImageError}
                />
              </div>
            </div>
          </CardBodyAny>
        </CardAny>
      </div>
    </section>
  );
}

export default HobbyScianka;
