"use client";

import "../styles/carousel.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import DialogModal from "./DialogModal";

export default function BandCarousel({ bands }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState(null);

  const openDialog = (band) => {
    setSelectedBand(band); // Gem det valgte band
    setIsDialogOpen(true); // Åbn dialogen
  };

  const closeDialog = () => {
    setIsDialogOpen(false); // Luk dialogen
    setSelectedBand(null); // Nulstil det valgte band
  };

  return (
    <>
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
            className={`text-center rounded-lg p-4 m-4 transition duration-300 ${
              currentSlide === index ? "scale-110" : "scale-75 opacity-65"
            }`}
          >
            <Image
              src={`/logos/${band.logo}`}
              width={1000}
              height={1000}
              alt={band.slug}
              className="h-96 object-contain rounded-md mx-auto"
            />
            <h2 className="text-4xl font-semibold mt-4 font-gajraj">{band.name}</h2>
            <p className="mt-2">{band.description}</p>
            <button 
              onClick={() => openDialog(band)} 
              className={`mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg  opacity-0${
              currentSlide === index ? "opacity-100 transition duration-600s" : ""
            }`}
            >
              Show Details
            </button>
          </div>
        ))}
      </Carousel>
      
      {/* Dialog Modal */}
      <DialogModal isOpen={isDialogOpen} onClose={closeDialog}>
        {selectedBand && (
          <>
            <h2 className="text-4xl font-semibold text-black">{selectedBand.name}</h2>
            <p className="text-black pt-5"><b>Members: </b>{selectedBand.members}</p>
            <p className="text-black"><b>Genre: </b>{selectedBand.genre}</p>
            <p className="mt-4 text-black">{selectedBand.bio}</p>
            <button 
              onClick={closeDialog} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </>
        )}
      </DialogModal>
    </>
  );
}
