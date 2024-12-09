"use client";

import "../styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";

export default function BandCarousel({ bands }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Carousel 
      showThumbs={false} 
      infiniteLoop={false}
      interval={3000} 
      showStatus={false}
      showIndicators={false}
      onChange={(index) => setCurrentSlide(index)}
    >
      {bands.map((band, index) => (
        <div
          key={band.id}
          className={`text-center  rounded-lg p-4 m-4 transition duration-300 ${
            currentSlide === index ? "scale-110" : "scale-75"
          }`}
        >
          <Image
            src={`/logos/${band.logo}`}
            width={1000}
            height={1000}
            alt={band.slug}
            className="h-96 object-contain rounded-md mx-auto"/>
          <h2 className="text-4xl font-semibold mt-4 font-gajraj">{band.name}</h2>
          <p className="mt-2">{band.description}</p>
          <Link href={`/artist/${band.slug}`}>
            <button className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg">
              More Info
            </button>
          </Link>
        </div>
      ))}
    </Carousel>
  );
}