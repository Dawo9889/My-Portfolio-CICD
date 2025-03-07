"use client";

import React from "react";
import Image from "next/image";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";

export function HobbyGory() {
  const [active, setActive] = React.useState(4);

  return (
    <section className="py-4 px-8 lg:py-12">
      <div className="container max-w-screen-lg mx-auto">

        <Card color="transparent" shadow={false} className="py-8 lg:flex-row" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <CardBody className="w-full lg:flex justify-between gap-10 h-full"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            {/* Sekcja zdjęcia po lewej */}
            <div className="w-full lg:w-[50%] shrink-0">
              <div className="relative w-full" style={{ paddingTop: '75%' }}> {/* Ustawienie 4:3 przez padding-top */}
                <Image
                  width={1024}
                  height={768} // 4:3 proporcje, czyli 1024 x 768
                  src={`/image/gory/gory${active}.jpg`}
                  alt="gory zdjecie"
                  className="absolute top-0 left-0 h-full w-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Sekcja tekstowa po prawej */}
            <div className="w-full mb-10 ml-10 lg:mb-0 lg:w-8/12">
              <Typography
                variant="h3"
                color="blue-gray"
                className="mb-4 font-bold lg:max-w-md" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                2. Chodzę po górach (Beskid)
              </Typography>
              <Typography className="mb-3 w-full lg:w-8/12 font-normal !text-gray-500"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Ostatnio odkryte hobby. Lubie naładować plecak sprzętem i po prostu iść przed siebie. Tak aż nogi zaczna boleć. Lubie przy tym wziąć drona, kamerę i złapać parę fajnych dla oka ujęć.
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-0.5"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Pare zdjęć
              </Typography>
              <div className="flex items-center gap-4">
                <Avatar
                  variant="rounded"
                  src="/image/gory/gory1.jpg"
                  alt="Avatar gory"
                  size="xl"
                  className={`cursor-pointer ${active === 1 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(1)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100"></div>
                <Avatar
                  variant="rounded"
                  src="image/gory/gory2.jpg"
                  alt="Avatar gory"
                  size="xl"
                  className={`cursor-pointer ${active === 2 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(2)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100" />
                <Avatar
                  variant="rounded"
                  src="image/gory/gory3.jpg"
                  alt="Avatar gory"
                  size="xl"
                  className={`cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(3)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
                <div className="w-[1px] h-[36px] bg-blue-gray-100"></div>
                <Avatar
                  variant="rounded"
                  src="image/gory/gory4.jpg"
                  alt="Avatar gory"
                  size="xl"
                  className={`cursor-pointer ${active === 3 ? "opacity-100" : "opacity-50"}`}
                  onClick={() => setActive(4)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                />
              </div>
            </div>

          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default HobbyGory;
