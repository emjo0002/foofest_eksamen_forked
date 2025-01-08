"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import FAQAccordion from "./components/FAQAccordion";
import Footer from "./components/Footer";

// Registrer plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      // ANIMATION FOR H1 AND LINKS
      const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
      tl.fromTo(".anim-text", { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 3, stagger: 0.4 });

      // ANIMATION FOR TEXT AND CARDS
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

      // ANIMATION FOR CARDS
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

    // Log pilen for at sikre, at den findes
    const arrow = document.querySelector(".animate-bounce");
    console.log("Arrow element:", arrow);
  }, []);

  const scrollToLatestNews = () => {
    gsap.to(window, {
      scrollTo: { y: "#latest-news", offsetY: 0 },
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <div className="relative h-screen dynamic-bg min-h-screen bg-cover text-white">
      <section className="h-screen flex flex-col justify-center items-center text-center relative">
        <h1 className="anim-text font-gajraj text-6xl md:text-9xl tracking-wider mb-4">FOOFEST</h1>
        <p className="anim-text font-genos text-2xl md:text-4xl lg:text-6xl mb-8">August 24 - 31</p>

        <div className="absolute bottom-8 right-8 space-y-4 text-right">
          <a href="/booking" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            TICKETS
          </a>
          <a href="/lineup" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            LINE-UP
          </a>
          <a href="/schedule" className="anim-text block text-xl md:text-3xl font-gajraj font-bold hover:underline">
            PROGRAM
          </a>
        </div>

        <div className="absolute bottom-16 animate-bounce">
          <a href="#latest-news" className="text-white fill-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="white" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </section>

      {/* CARDS */}
      <div className="bg-custom bg-cover">
        <section id="latest-news" className="scroll-section min-h-screen flex flex-col justify-center items-center pb-16 px-4 sm:px-8 md:px-16">
          <h2 className="anim-section-text text-black text-4xl sm:text-6xl md:text-8xl font-gajraj font-bold mb-12">LATEST NEWS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-4 shadow-md border-solid border-2 border-black">
              <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=3270&auto=format&fit=crop" alt="Image 1" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-black text-2xl sm:text-3xl font-genos mb-2">FOOL CANCELLED</h3>
              <p className="text-black text-sm sm:text-base">This year we have unfortunately experienced several cancellations. Read more here to see which bands have had to cancel.</p>
            </div>

            <div className="p-4 shadow-md border-solid border-2 border-black">
              <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=3270&auto=format&fit=crop" alt="Image 2" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-black text-2xl sm:text-3xl font-genos mb-2">AC/DC OPENS</h3>
              <p className="text-black text-sm sm:text-base">This year we are pleased to welcome our headliner AC/DC!!! Read more about the band and their history here.</p>
            </div>

            <div className="p-4 border-solid border-2 border-black">
              <img src="https://images.unsplash.com/photo-1552799446-159ba9523315?q=80&w=3270&auto=format&fit=crop" alt="Image 3" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-black text-2xl sm:text-3xl font-genos mb-2">A GREEN FESTIVAL</h3>
              <p className="text-black text-sm sm:text-base">Foofest has launched several initiatives to become even greener. Read more here.</p>
            </div>

            <div className="p-4 shadow-md border-solid border-2 border-black">
              <img src="https://images.unsplash.com/photo-1520066391310-428f06ebd602?q=80&w=3275&auto=format&fit=crop" alt="Image 4" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-black text-2xl sm:text-3xl font-genos mb-2">NEW FOOD STALLS THIS YEAR</h3>
              <p className="text-black text-sm sm:text-base">We have added many new food stalls, so you can enjoy delicious food at the festival.</p>
            </div>
          </div>
          <div />
        </section>
        <div className="space-y-12 mt-16 md:mt-0">
          <FAQAccordion />
        </div>
      </div>

      <div className="space-y-12 mt-16 md:mt-0">
        <Footer />
      </div>
    </div>
  );
}
