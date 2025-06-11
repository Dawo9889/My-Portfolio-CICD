// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import InformationSection from "./information-section";
import HobbyRower from "./HobbyRower";
import HobbyGory from "./HobbyGory";
import HobbyScianka from "./HobbyScianka";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <InformationSection />
      <HobbyRower />
      <HobbyGory />
      <HobbyScianka />
      <Footer />
    </>
  );
}
