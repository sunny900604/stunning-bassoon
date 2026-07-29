import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsPartners from "@/components/StatsPartners";
import YoutubeSection from "@/components/YoutubeSection";
import ServiceSection from "@/components/ServiceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import { SERVICE_SECTIONS } from "@/data/content";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsPartners />
        <YoutubeSection />
        {SERVICE_SECTIONS.map((service) => (
          <ServiceSection key={service.id} service={service} />
        ))}
        <ContactSection />
      </main>
      <Footer />
      <ScrollTopButton />
    </>
  );
}
