"use client";

import "../../app/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";

export default function BandCarousel({ bands }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Carousel showThumbs={false} infiniteLoop={false} interval={3000} showStatus={false} showIndicators={false} onChange={(index) => setCurrentSlide(index)}>
      {bands.map((band, index) => (
        <div key={band.id || index} className={`text-center rounded-lg p-4 m-4 transition duration-300 ${currentSlide === index ? "scale-110" : "scale-75 opacity-65"}`}>
          <Image src={band.logo?.startsWith("http") ? band.logo : `/logos/${band.logo}`} width={225} height={200} alt={band.slug || band.name} className="h-72 object-contain rounded-md mx-auto" /> <h2 className="text-4xl font-semibold mt-4 font-gajraj">{band.name}</h2>
          {/* VIS SCENE, START OG SLUT TIDSPUNKT FOR BANDS */}
          {band.scene && band.start && band.end && (
            <p className="mt-2 text-lg font-genos">
              {band.scene} - Kl. {band.start} til {band.end}
            </p>
          )}
          <Link href={`/program/${band.slug}`} className="mt-4 inline-block bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-300">
            Read more
          </Link>
        </div>
      ))}
    </Carousel>
  );
}
