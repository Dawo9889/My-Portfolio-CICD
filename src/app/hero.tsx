"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative w-full">
      <div className="grid place-items-center min-h-[92vh] px-8">
        <div className="container mx-auto grid place-items-center h-max text-center">
          <Typography variant="h1" color="blue-gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Mój profil
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-4xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          >
              Witam serdecznie na mojej stronie! 
              Znajdziesz tutaj szczegółowy opis moich doświadczeń zawodowych, umiejętności 
              oraz informacji o tym, czym zajmuję się w wolnym czasie. 
              Skupię się szczególnie na mojej drodze zawodowej w obszarze DevOps, którą zdecydowałem się podjąć i rozwijać.
          </Typography>
          <Typography className="mt-12 mb-4 text-blue-gray-900 font-medium uppercase" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Znajdziesz mnie na:
          </Typography>
          <div className="gap-2 lg:flex">
          <IconButton variant="text" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <a href="https://www.linkedin.com/in/galadawid/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin text-lg" />
            </a>
          </IconButton>

            <IconButton variant="text" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <a href="https://github.com/Dawo9889/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github text-lg" />
              </a>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
