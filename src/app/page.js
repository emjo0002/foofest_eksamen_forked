"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";

// Registrer ScrollTrigger-plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Tjek skærmbredden for at køre animationer kun på desktop
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      // ANIMATION TIL H1 OG LINKS
      const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
      tl.fromTo(".anim-text", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 3, stagger: 0.4 });

      // ANIMATION TIL TEKST OG CARDS
      gsap.fromTo(
        ".anim-section-text",
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 4.5,
          ease: "power2.out",
          stagger: 0.9,
          scrollTrigger: {
            trigger: ".scroll-section",
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );

      // ANIMATION TIL CARDS
      gsap.from(".grid > div", {
        opacity: 0,
        y: 50,
        duration: 5,
        stagger: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".grid",
          start: "top 90%",
          end: "top 50%",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div className="relative h-screen dynamic-bg min-h-screen bg-cover text-white">
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="anim-text font-gajraj text-6xl md:text-9xl tracking-wider mb-4 md:block hidden">FOOFEST</h1>
        <h1 className="font-gajraj text-6xl md:hidden">FOOFEST</h1>

        <p className="anim-text font-genos text-2xl md:text-4xl lg:text-6xl mb-8 md:block hidden">24 - 31 august</p>
        <p className="font-genos text-2xl md:hidden">24 - 31 august</p>

        <div className="absolute bottom-8 right-8 space-y-4 text-right md:block hidden">
          <a href="/booking" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            TICKETS!
          </a>
          <a href="/lineup" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            LINE-UP
          </a>
          <a href="/schedule" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            PROGRAM
          </a>
        </div>

        <div className="absolute bottom-16 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* CARDS */}
      <section className="scroll-section min-h-screen bg-white flex flex-col justify-center items-center pb-">
        <h2 className="anim-section-text text-black text-4xl md:text-8xl font-gajraj font-bold mb-12 md:block hidden">SENESTE NYT</h2>
        <h2 className="text-black text-4xl md:hidden font-gajraj font-bold mb-12">SENESTE NYT</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16">
          <div className="p-4 shadow-md border-solid border-2 border-black">
            <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=3270&auto=format&fit=crop" alt="Billede 1" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-black text-3xl font-genos mb-2">FOOL HAR AFLYST</h3>
            <p className="text-black text-sm">I år har vi desværre oplevet en del afslysninger. Læs mere her og se hvilke bands der desværre har måtte aflyse.</p>
          </div>

          <div className="p-4 shadow-md border-solid border-2 border-black">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=3270&auto=format&fit=crop" alt="Billede 2" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-black text-3xl font-genos mb-2">AC/DC ÅBNER</h3>
            <p className="text-black text-sm">I år har vi glæden af at byde velkommen til vores hovednavn AD/DC!!! Læs mere om bandet og deres historie her.</p>
          </div>

          <div className="p-4 border-solid border-2 border-black">
            <img src="https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=3270&auto=format&fit=crop" alt="Billede 3" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-black text-3xl font-genos mb-2">EN GRØN FESTIVAL</h3>
            <p className="text-black text-sm">Foofest har iværksat en række tiltag for at blive endnu grønnere. Læs mere her.</p>
          </div>

          <div className="p-4 shadow-md border-solid border-2 border-black">
            <img src="https://images.unsplash.com/photo-1520066391310-428f06ebd602?q=80&w=3275&auto=format&fit=crop" alt="Billede 4" className="w-full h-48 object-cover mb-4" />
            <h3 className="text-black text-3xl font-genos mb-2">NYE MADBODER I ÅR</h3>
            <p className="text-black text-sm">Vi har fået en masse nye madboder, så du kan nyde lækker mad på festivalen.</p>
          </div>
        </div>
      </section>

      <div className="space-y-12 mt-16 md:mt-0">
        <FAQAccordion />
        <Footer />
      </div>
    </div>
  );
}
