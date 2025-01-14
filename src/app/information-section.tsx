"use client";
import { Typography } from "@material-tailwind/react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  FireIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";

import InfoCard from "@/components/info-card";
import { title } from "process";
import { Children } from "react";

const POJECTS= [
  {
    icon: CommandLineIcon,
    title: "Cupid App – aplikacja stworzona do robienia i zarządzania zdjęciami weselnymi.",
    githubLink: "https://github.com/Dawo9889/IO_PROJECT_2024",
    date: "10.2024 - 02.2025",
    children: (
      <>
        Wspólny projekt z trójką znajomych mający na celu stworzenie aplikacji weselnej dostępnej zarówno na przeglądarki, jak i smartfony. 
        Aplikacja umożliwia fotografowi dostęp do zdjęć z innej perspektywy – mianowicie, goście weselni mogą za jej pomocą robić zdjęcia 
        i udostępniać je w czasie rzeczywistym, prezentując wydarzenie z ich punktu widzenia.
        <br></br>
        <br></br>
        Moim głównym zadaniem było:
        <ul>
          <li> - Opracowanie aplikacji backendowej,</li>
          <li> - Zabezpieczenie aplikacji,</li>
          <li> - Skonteneryzowanie aplikacji za pomocą Dockera,</li>
          <li> - Wystawienie aplikacji na serwer produkcyjny.</li>
        </ul>
      </>
    ),
  },
  {
    icon: CommandLineIcon,
    title: "App In AKS",
    githubLink: "https://github.com/Dawo9889/AppInAKS",
    date: "2024",
    children:
      "Aplikacja internetowa zbudowana w technologii Node.js, gdzie każdy komponent jest konteneryzowany za \
       pomocą Dockera, co zapewnia modułowość i efektywność. Dane uwierzytelniające są bezpiecznie przechowywane \
       w bazie danych MongoDB, co gwarantuje solidną ochronę danych. Cały system jest wdrożony na platformie Microsoft Azure, \
       z wykorzystaniem Kubernetes, co zapewnia skalowalność, niezawodność oraz sprawną orkiestrację konteneryzowanych usług.",
  },
  {
    icon: CommandLineIcon,
    title: "Aplikacja webowa do zarządzania akademikiem",
    githubLink: "https://github.com/Dawo9889/AkademikMVC",
    date: "2024",
    children:
      "Aplikacja internetowa zaprojektowana w celu ułatwienia zarządzania akademikami. \
        Zbudowana w oparciu o ASP.NET z zastosowaniem zasad czystej architektury i wzorca MVC, zapewnia \
        modułowość i łatwość rozwoju w przyszłości.\
        System umożliwia kompleksowe zarządzanie mieszkańcami oraz pokojami, obejmując takie funkcje jak \
        rejestracja nowych mieszkańców, przydzielanie miejsc w pokojach, a także monitorowanie dostępności i historii zamieszkania"
  },
  {
    icon: CommandLineIcon,
    title: "Dokumentacja z początków tworzenia mojego HomeLab'a",
    githubLink: "https://github.com/Dawo9889/HomeLab",
    date: "2024",
    children: 
     "Dokumentacja zawiera wszystkie etapy tworzenia osobistego, taniego Home Laba, który na początku miał służyć tylko pod nauke, \
      jednak po wdrożeniu okazało się to idealne narzędzie do użytku codziennego, co może ułatwić pracę wielu osobom.\
       Przez home lab mam na myśli urządzenie czynne przez 24h/7, na którym będą uruchomione liczne usługi."
  }
];

const EXPERIENCE = [
  {
    icon: BriefcaseIcon,
    title: "Stażysta DevOps",
    date: "07.2024 - 10.2024",
    children:
      "Moim głównym zadaniem było zapoznanie się z pracą w środowisku IT w dużej firmie. Skupiłem się na zrozumieniu przepływów pracy, współpracy z zespołami międzydziałowymi oraz poznawaniu podstawowych praktyk DevOps w praktycznym środowisku.",
  },
  {
    icon: BriefcaseIcon,
    title: "Pracownik DevOps",
    date: "10.2024 - Teraz",
    children:
      "Moim głównym zadaniem jest współpraca z zespołem wdrożeniowców w celu realizacji określonych zadań związanych z rozwojem i utrzymaniem infrastruktury IT. \
       Kluczowym elementem mojej pracy jest zarządzanie kontenerami oraz ich orkiestracja. \
       Na co dzień korzystam z takich narzędzi jak Prometheus i Grafana do monitorowania oraz analizy wydajności systemów."
     
  }
];

const SKILLS = [
  {
    icon: FireIcon,
    title: "Front-End Frameworks",
    date: "Technical Skills",
    children:
      "Competent in working with front-end frameworks such as React, Angular, or Vue.js to develop dynamic and responsive web applications with a focus on user experience.",
  },
  {
    icon: FireIcon,
    title: "Time Management",
    date: "Soft Skills",
    children:
      "Excellent time management skills to meet project deadlines, prioritize tasks effectively, and handle multiple projects simultaneously.",
  },
];
const CERTIFICATES = [
  {
    icon: AcademicCapIcon,
    title: "Time Management",
    date: "Soft Skills",
    children:
      "Excellent time management skills to meet project deadlines, prioritize tasks effectively, and handle multiple projects simultaneously.",
  }
];

export function InformationSection() {
  return (
    <section className="pb-28 px-8">
      <div className="container mx-auto">

        {/* Projects section*/}
        <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Projekty
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Wszystkie moje projekty, z których jestem zadowolny.
          </Typography>

          <div className="mt-12 grid grid-cols-1 gap-16 gap-y-12">
            {POJECTS.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>

        {/* EXPERIENCE Section */}
        <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Doświadczenie
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Moje doświadczenie jako IT DevOps
          </Typography>

          <div className="mt-12 grid grid-cols-1 gap-16 gap-y-12">
            {EXPERIENCE.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>

      {/* Certificates section*/}
      <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Certyfikaty
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Zobacz wszystkie moje certyfikaty.
          </Typography>

          <div className="mt-12 grid grid-cols-1 gap-16 gap-y-12">
            {CERTIFICATES.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>
        {/* SKILLS Section */}
        <div>
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Skills
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Check out my technical and soft skills.
          </Typography>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 gap-y-12">
            {SKILLS.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InformationSection;
