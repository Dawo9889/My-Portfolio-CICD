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


const POJECTS= [
  {
    icon: CommandLineIcon,
    title: "Cupid App – aplikacja stworzona do robienia i zarządzania zdjęciami weselnymi.",
    githubLink: "https://github.com/Dawo9889/cupid-app",
    date: "10.2024 - 02.2025",
    children: (
      <>
        Wspólny projekt z trójką znajomych mający na celu stworzenie aplikacji weselnej dostępnej zarówno na przeglądarki, jak i smartfony. 
        Aplikacja umożliwia fotografowi dostęp do zdjęć z innej perspektywy – mianowicie, goście weselni mogą za jej pomocą robić zdjęcia 
        i udostępniać je w czasie rzeczywistym, prezentując wydarzenie z ich punktu widzenia.
        <br></br>
        <br></br>
        Moim głównym zadaniem było: <br></br>

          - Opracowanie aplikacji backendowej,<br></br>
          - Zabezpieczenie aplikacji,<br></br>
          - Skonteneryzowanie aplikacji za pomocą Dockera,<br></br>
          - Wystawienie aplikacji na serwer produkcyjny.<br></br>

      </>
    ),
  },
  {
    icon: CommandLineIcon,
    title: "My Portfolio CI/CD Project Development",
    githubLink: "https://github.com/Dawo9889/My-Portfolio-CICD",
    date: "01.2025",
    children: "Nie ma co się za bardzo rozpisywać – oto projekt, który udało mi się stworzyć i który z dumą prezentuję!"
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
    title: "Artykuł porównujący wydajności klasyfikatorów Naive Bayes i K-Najbliższych Sąsiadów",
    githubLink: "https://ceur-ws.org/Vol-3885/paper37.pdf",
    date: "2024",
    children:
     "Artykuł miał na celu porównanie wydajności klasyfikatorów Naive Bayes i K-Najbliższych Sąsiadów."
  },

];

const EXPERIENCE = [
  {
    icon: BriefcaseIcon,
    title: "Stażysta DevOps | COIG S.A.",
    date: "07.2024 - 10.2024",
    children:
      "Moim głównym zadaniem było zapoznanie się z pracą w środowisku IT w dużej firmie. Skupiłem się na zrozumieniu przepływów pracy, współpracy z zespołami międzydziałowymi oraz poznawaniu podstawowych praktyk DevOps w praktycznym środowisku.",
  },
  {
    icon: BriefcaseIcon,
    title: "Pracownik DevOps | COIG S.A.",
    date: "10.2024 - 05.2025",
    children:
      "Moim głównym zadaniem była współpraca z zespołem wdrożeniowców przy realizacji zadań związanych z rozwojem i utrzymaniem infrastruktury IT. \
       Kluczowym elementem mojej pracy było zarządzanie kontenerami oraz ich orkiestracja. \
       Na co dzień korzystałem z narzędzi takich jak Prometheus i Grafana do monitorowania i analizy wydajności systemów.",
  },
  {
    icon: BriefcaseIcon,
    title: "Cloud DevOps Engineer | SAP Poland",
    date: "07.2025 - NOW",
    children:
      "Pracuję przy projekcie open source Kyma jako członek zespołu DevOps. \
      Moje obowiązki obejmują projektowanie, wdrażanie i utrzymanie pipeline’ów CI/CD oraz usług wspierających zespoły developerskie. \
      Skupiam się na automatyzacji procesów, poprawie niezawodności oraz usprawnianiu wydajności dostarczania oprogramowania.",

  }
];


const CERTIFICATES = [
  {
    icon: AcademicCapIcon,
    title: "Program Corporate Readiness Certificate, ING Hubs - Cybersecurity",
    date: "Technical Skills",
    githubLink: "https://www.linkedin.com/in/galadawid/overlay/1717882932032/single-media-viewer/?type=DOCUMENT&profileId=ACoAAEX78IcBnWMfZ3oQfHKNwbBbkLLHPEDBZj8",
    children:
      "Ukazuje podejście do zabezpieczeń w firmie i w rozwiązaniach komercyjnych. Kurs miał prawie 40h, gdzie każego dnia uczyłem się czegoś nowego. Przede wszystkim dowiedziałem się jak zabezpieczyć firmę przed potencjalnymi atakami cyber.",
  },
    {
    icon: AcademicCapIcon,
    title: "Program Corporate Readiness Certificate, ING Hubs - Administrator IT",
    date: "Technical Skills",
    githubLink: "https://credsverse.com/credentials/78bd82ff-2a51-426b-8a2e-9cd202a82cfd",
    children: "Na szkoleniu nauczyłem się pracy z administrowaniem systemami IT w korporacji"   
  }
];

const SKILLS = [
  {
    icon: FireIcon,
    title: "C#, ASP.NET, Architektura MVC",
    date: "Technical Skills",
    children:
      "Technologie, które towarzyszyły mi w trakcie studiów przy tworzeniu aplikacji backendowych. Dzięki nim zdobyłem solidne podstawy w programowaniu obiektowym, zarządzaniu danymi oraz tworzeniu interfejsów API",
  },
  {
    icon: FireIcon,
    title: "Git, Github, Github Actions",
    date: "Technical Skills",
    children:
      "Technologie bez których nie można się poruszać po świecie IT. Wszystkie swoje kody opieram na systemie kontroli wersji. Jako repozytorium online najcześciej wykorzystuje github.",
  },
  {
    icon: FireIcon,
    title: "Docker & Kubernetes",
    date: "Technical Skills",
    children:
      "Z Dockera korzystam teraz chyba najczęściej. To na nim mam postawione wiele usług w swoim domu. Na przyklad Immich, nextcloud etc. Kubernetes jest technologią z którą mam doświadczenie, ale jeszcze dluga droga przede mną. Mogę zdradzić, że projekt mój projekt inżynierski będzie oparty głównie na tej technologii :) ",
  },
  {
    icon: CommandLineIcon,
    title: "Linux i Windows",
    date: "Technical Skills",
    children:
      "Doskonale wiemy, że DevOps i linux to rzeczy wzajemnie się przyciągające. Bez znajomości tego systemu operacyjnego praca jako DevOps nie ma kompletnie sensu",
  },
  {
    icon: CommandLineIcon,
    title: "Vagrant i Ansible",
    date: "Technical Skills",
    children:
      "Narzędzia ktore pomagają zautomatyzować wdrażanie na nowo systemów. Vagrant sprawia, że tworzenie nowych maszyn wirtualnych jest bardzo proste, a Ansible pomaga w ich konfigurowaniu",
  },
  {
    icon: CommandLineIcon,
    title: "Jenkins",
    date: "Technical Skills",
    children:
      "Jenkins umożliwia budowanie, testowanie i wdrażanie aplikacji w sposób szybki, spójny i niezawodny. Dzięki niemu można automatycznie uruchamiać skrypty po wprowadzeniu zmian w kodzie, integrować projekty, wykrywać błędy na wczesnym etapie i przyspieszać dostarczanie oprogramowania.",
  },
  {
    icon: FireIcon,
    title: "Prometheus, Grafana, Grafana Loki",
    date: "Technical Skills",
    children:
      "Prometheus, Grafana i Grafana Loki to narzędzia, które wykorzystuję do monitorowania oraz analizy systemów. Prometheus służy do zbierania i przechowywania metryk aplikacji, Grafana umożliwia wizualizację danych w postaci interaktywnych dashboardów, a Grafana Loki pozwala na efektywne gromadzenie i przeszukiwanie logów, co ułatwia diagnozowanie problemów i optymalizację działania aplikacji.",
  },
  {
  icon: FireIcon,
  title: "Terraform",
  date: "Technical Skills",
  children:
    "Terraforma używałem do automatycznego tworzenia infrastruktury w chmurze. Pisałem moduły do provisionowania instancji EC2 w AWS oraz konfiguracji sieci VPC. Dzięki temu lepiej zrozumiałem podejście Infrastructure as Code i mogłem szybciej powtarzalnie budować środowiska testowe i produkcyjne.",
  },
  {
    icon: FireIcon,
    title: "Apache HTTP Server",
    date: "Technical Skills",
    children:
      "Apache'a używałem do konfiguracji serwerów WWW, głównie w środowiskach testowych. Konfigurowałem wirtualne hosty, przekierowania oraz obsługę HTTPS przy użyciu certyfikatów SSL. Pomogło mi to zrozumieć podstawy działania backendowego serwera HTTP oraz jego integrację z aplikacjami webowymi.",
  },
  {
    icon: FireIcon,
    title: "Nginx",
    date: "Technical Skills",
    children:
      "Nginx wykorzystywałem zarówno jako serwer statycznych plików, jak i jako reverse proxy. Konfigurowałem load balancing i przekierowania do aplikacji uruchomionych na różnych portach. Dzięki pracy z Nginx zrozumiałem lepiej jak działa routing żądań i optymalizacja wydajności w aplikacjach webowych.",
  },
  {
    icon: FireIcon,
    title: "SSL & PKI",
    date: "Technical Skills",
    children:
      "Pracując z certyfikatami SSL oraz infrastrukturą klucza publicznego (PKI), nauczyłem się generować i zarządzać certyfikatami X.509, tworzyć żądania CSR oraz korzystać z własnych i zaufanych urzędów certyfikacji (CA). Konfigurowałem HTTPS na serwerach Nginx i Apache, dbając o bezpieczeństwo komunikacji i zgodność z aktualnymi standardami (np. TLS 1.2+). Dzięki tej wiedzy lepiej rozumiem, jak działa uwierzytelnianie i szyfrowanie w sieci.",
  },

  {
    icon: FireIcon,
    title: "Azure Cloud",
    date: "Technical Skills",
    children:
      "Azure używałem do tworzenia maszyn wirtualnych z publicznym ip. Pomagało mi to na wdrażanie aplikacji, które miały być wszędzie dostępne. Mocno przydatne okazało się także AKS z gotowym load balancerem",
  },
  {
    icon: FireIcon,
    title: "AWS Cloud",
    date: "Technical Skills",
    children:
      "W ramach nauki chmury AWS pracowałem z różnymi usługami, w tym EC2 do uruchamiania maszyn wirtualnych i S3 do przechowywania plików. Szczególną uwagę poświęciłem Amazon EKS, ucząc się wdrażania aplikacji kontenerowych i zarządzania klastrem Kubernetes. Było to cenne doświadczenie w kontekście automatyzacji i skalowania usług.",
  },

  {
    icon: AcademicCapIcon,
    title: "Angielski, poziom B2/C1",
    date: "Soft Skills",
    children: "Przede wszystkim mój angielski pomaga mi w pracy. Czytanie dokumentacji, która często jest po angielsku nie sprawia mi problemu. Troche inaczej jest z rozmową, ale dalej jest to poziom wyższy niż komunikatywny",
  }
];

export function InformationSection() {
  return (
    <section className="pb-6 px-8">
      <div className="container mx-auto">

        {/* Projects section*/}
        <div className="mb-16">
          <Typography
            color="blue-gray"
            className="mb-2 text-3xl font-bold"
          >
            Projekty
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
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
          >
            Doświadczenie
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
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
          >
            Certyfikaty
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
          >
            Zobacz wszystkie ważniejsze w moim życiu certyfikaty.
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
          >
            Umięjętności
          </Typography>

          <Typography
            variant="lead"
            className="!text-gray-500"
          >
            Czyli czego nauczyłem się do tej pory
          </Typography>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 gap-y-12">
            {SKILLS.map((props, idx) => (
              <InfoCard key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-20 text-center">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Co robię w wolnym czasie?
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-8/12"
          >
            Wolny czas przede wszystkim staram się spędzać aktywnie. Dużo siedzę przed komputerem na studiach i w pracy także każdy ruch jest mi bardzo wskazany
          </Typography>
        </div>
    </section>
  );
}

export default InformationSection;
