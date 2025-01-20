// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import InformationSection from "./information-section";
import HobbyRower from "./HobbyRower";
import HobbyGory from "./HobbyGory";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <InformationSection />
      <HobbyRower />
      <HobbyGory />
      <Footer />
    </>
  );
}
