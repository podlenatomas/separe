import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import EventsTable from "@/components/EventsTable";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main id="main">
        <BentoGrid />
        <EventsTable />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
