import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Story from "@/components/Story";
import EventsTable from "@/components/EventsTable";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <Hero />
        {/* Rotating anti-grid badge — bridges Hero and O NÁS */}
        <div className="absolute bottom-0 right-10 translate-y-1/2 z-40 animate-[spin_12s_linear_infinite] pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 100 100">
            <path id="curve" fill="transparent" d="M 50 50 m -35 0 a 35 35 0 1 1 70 0 a 35 35 0 1 1 -70 0" />
            <text className="text-[9px] uppercase tracking-[0.2em]" fill="#1A1A1A" fontWeight="600">
              <textPath href="#curve">Separé · Mikulandská · Third Place ·&nbsp;</textPath>
            </text>
          </svg>
        </div>
      </div>
      <main id="main">
        <BentoGrid />
        <Story />
        <EventsTable />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
