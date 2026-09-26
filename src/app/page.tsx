import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Modules from "@/components/Modules";
import HowItWorks from "@/components/HowItWorks";
import DataSection from "@/components/DataSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Modules />
        <HowItWorks />
        <DataSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
