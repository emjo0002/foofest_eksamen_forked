"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Newsletter from "./components/Newsletter";

// Registrer ScrollTrigger-plugin
gsap.registerPlugin(ScrollTrigger);

// HER ANIMERER JEG TEKST

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    tl.fromTo(".anim-text", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 2, stagger: 0.45 });
  }, []);

  return (
    <div className="relative h-screen bg-custom bg-cover text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="anim-text font-gajraj text-6xl md:text-9xl tracking-wider mb-4">FOOFEST</h1>
        <p className="anim-text font-genos text-2xl md:text-4xl lg:text-6xl mb-8">24 - 31 august</p>
        <div className="absolute bottom-8 right-8 space-y-4 text-right">
          <a href="/tickets" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            TICKETS!
          </a>
          <a href="/lineup" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            LINE-UP
          </a>
          <a href="/artists" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            PROGRAM
          </a>
        </div>

        {/* SCROLLING  --> skal ændres da den ikke virker optimalt */}
        <div className="absolute bottom-16 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* SENESTE NYT */}

      <section className="scroll-section h-screen bg-white flex flex-col justify-center items-center">
        <h2 className="text-black text-4xl md:text-8xl font-gajraj font-bold mb-12">SENESTE NYT</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-16">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Billede 1" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-black text-3xl font-genos mb-2">FOOL HAR AFLYST</h3>
            <p className="text-black text-sm">I år har vi desværre oplevet en del afslysninger. Læs mere her og se hvilke bands der desværre har måtte aflyse.</p>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Billede 2" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-black text-3xl font-genos mb-2">AC/DC ÅBNER</h3>
            <p className="text-black text-sm">I år har vi glæden af at byde velkommen til vores hovednavn AD/DC!!! Læs mere om bandet og deres historie her</p>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <img src="https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Billede 3" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-black text-3xl font-genos mb-2">EN GRØN FESTIVAL</h3>
            <p className="text-black text-sm">Foofest har iværksat en række tiltag for at blive endnu grønnere. Læs mere her.</p>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <img src="https://images.unsplash.com/photo-1520066391310-428f06ebd602?q=80&w=3275&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Billede 4" className="w-full h-48 object-cover mb-4 rounded-lg" />
            <h3 className="text-black text-3xl font-genos mb-2">NYE MADBODER I ÅR</h3>
            <p className="text-black text-sm">Vi har fået en masse nye madboder, så du kan nyde lækker mad på festivalen.</p>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
