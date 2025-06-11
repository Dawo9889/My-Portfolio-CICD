"use client";

import React from "react";
import Image from "next/image";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";

export function HobbyScianka() {
  const [active, setActive] = React.useState(2);

  return (
    <section className="py-2 px-8 lg:py-12">
      <div className="container max-w-screen-lg mx-auto">
        <Card
          color="transparent"
          shadow={false}
          className="py-8 lg:flex-row"
          placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        >
          <CardBody className="w-full lg:gap-10 h-full lg:!flex justify-between" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {/* Sekcja tekstowa */}
            <div className="w-full mb-10 lg:mb-0">
              <Typography
                variant="h3"
                color="blue-gray"
                className="mb-4 font-bold lg:max-w-xs" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
              >
                3. Wspinaczka ściankowa
              </Typography>
              <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Wspinaczka ściankowa to dla mnie świetny sposób na poprawę siły, techniki i koncentracji. Zacząłem od boulderowni, ale z czasem przerzuciłem się też na wspinanie z liną. Wymaga skupienia, planowania i dobrej współpracy z partnerem asekuracyjnym — co przekłada się też na inne obszary życia.
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-0.5" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Pare zdjęć
              </Typography>
              <div className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  src="/image/scianka/scianka1.jpg"
                  alt="Avatar scianka"
                  size="xl"
                  className={`cursor-pointer ${active === 1 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(1)}
                  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="/image/scianka/scianka2.jpg"
                  alt="Avatar scianka"
                  size="xl"
                  className={`cursor-pointer ${active === 2 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(2)}
                  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="/image/scianka/scianka3.jpg"
                  alt="Avatar scianka"
                  size="xl"
                  className={`cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(3)}
                  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="/image/scianka/scianka4.jpg"
                  alt="Avatar scianka"
                  size="xl"
                  className={`cursor-pointer ${active === 4 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(4)}
                  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                />
              </div>
            </div>

            {/* Sekcja zdjęcia */}
            <div className="h-full sm:w-[18rem] w-full shrink-0">
              <div className="aspect-w-3 aspect-h-4 w-full">
                <Image
                  width={576}
                  height={768}
                  src={`/image/scianka/scianka${active}.jpg`}
                  alt="scianka zdjęcie"
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default HobbyScianka;
