"use client";

import { IconButton, Typography } from "@material-tailwind/react";

function Hero() {
  return (
    <div className="relative w-full">
      <div className="grid place-items-center min-h-[92vh] px-8">
        <div className="container mx-auto grid place-items-center h-max text-center">

          <Typography variant="h1" color="blue-gray">
            Mój profil
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-4 mb-12 w-full md:max-w-full lg:max-w-4xl"
          >
            Witam serdecznie na mojej stronie! 
            Znajdziesz tutaj szczegółowy opis moich doświadczeń zawodowych, umiejętności 
            oraz informacji o tym, czym zajmuję się w wolnym czasie. 
            Skupię się szczególnie na mojej drodze zawodowej w obszarze DevOps, którą zdecydowałem się podjąć i rozwijać.
          </Typography>

          {/* Add profile image under the description */}
          <img
            src="image/my-image.jpg" 
            alt="Dawid Gala"
            className="rounded-full w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-6 object-cover"
            style={{ objectPosition: "top center" }}

          />

          {/* DevOps project section */}
          <Typography variant="h3" color="blue-gray" className="mt-4 mb-6 w-full md:max-w-full lg:max-w-4xl">
            Projekt DevOps
          </Typography>
          <Typography variant="lead" color="gray" className="mb-6">
            Ta strona jest częścią mojego projektu DevOps, w ramach którego wykorzystuję różne technologie do automatyzacji i wdrożenia aplikacji w środowisku produkcyjnym.
            Możesz zapoznać się z kodem źródłowym tego projektu na{" "}
            <a href="https://github.com/Dawo9889/My-Portfolio-CICD" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"> GitHubie.</a>
          </Typography>

          <Typography className="mt-12 mb-4 text-blue-gray-900 font-medium uppercase">
            Znajdziesz mnie na:
          </Typography>
          <div className="gap-2 lg:flex mb-20" >
            <IconButton variant="text" size = "lg" color="gray">
              <a href="https://www.linkedin.com/in/galadawid/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-linkedin text-4xl" />
              </a>
            </IconButton>

            <IconButton variant="text" size = "lg" color="gray">
              <a href="https://github.com/Dawo9889/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github text-4xl" />
              </a>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
