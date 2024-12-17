"use client";

import { useState, useEffect } from "react";
import useBookingStore from "../globalkurv/useBookingStore";

import Ticket from "../components/Tickets";
import Camping from "../components/Camping";
import Information from "../components/Information";
import Payment from "../components/Payment";
import Opsummering from "../components/Opsummering";

export default function Booking() {
  const [currentView, setCurrentView] = useState("tickets");
  const { timer, timerActive, stopTimer, fetchReservation, loadingReservation } =
    useBookingStore();

  const handleTimerEnd = () => {
    alert("Din reservation er udløbet. Du bliver sendt tilbage til billetvalg.");
    setCurrentView("tickets");
    stopTimer();
  };

  useEffect(() => {
    if (timer === 0 && timerActive) {
      handleTimerEnd();
    }
  }, [timer, timerActive]);

  const handleNext = (nextView) => {
    setCurrentView(nextView);
  };

  const handleBack = (previousView) => {
    stopTimer();
    setCurrentView(previousView);
  };

  // Funktion til at bestemme trin-styling baseret på currentView
  const stepIndicator = (viewName, stepNumber) => {
    const isActive = currentView === viewName;
    return `flex items-center justify-center rounded-full 
            ${isActive ? "w-14 h-14 bg-white border-2 border-black text-black" : "w-10 h-10 bg-black bg-opacity-70 text-white"} 
            font-genos ${isActive ? "text-3xl" : "text-2xl"}`;
  };

  return (
    <div className="px-4 mx-auto mb-24 bg-custom">
      <div className="flex justify-center lg:justify-start">
        <h1 className="text-8xl font-gajraj font-bold pt-16 lg: pb-2">TICKETS</h1>
        </div>
      <h2 className="flex justify-center text-5xl font-gajraj pb-6">{currentView}</h2>

      {/* Trinindikator */}
      <div className="flex justify-center items-center gap-4">
        <div className={stepIndicator("tickets", 1)}>1</div>
        <div className={stepIndicator("camping", 2)}>2</div>
        <div className={stepIndicator("information", 3)}>3</div>
        <div className={stepIndicator("opsummering", 4)}>4</div>
        <div className={stepIndicator("payment", 5)}>5</div>
      </div>

      {/* Loading besked */}
      {loadingReservation && (
        <div className="text-center py-4 bg-gray-200">
          Henter reservation, vent venligst...
        </div>
      )}

      {/* Timer visning */}
      {timerActive && (
        <div className="sticky top-0 z-50 bg-red-300 text-primary border-b border-t border-primary text-center py-2 mb-8">
          Reservation expires in: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </div>
      )}

      {/* Indhold */}
      <div>
        {currentView === "tickets" && <Ticket onNext={() => handleNext("camping")} />}

        {currentView === "camping" && (
          <Camping
            onNext={() => handleNext("information")}
            onBack={() => handleBack("tickets")}
          />
        )}

        {currentView === "information" && (
          <Information
            onNext={() => handleNext("opsummering")}
            onBack={() => handleBack("camping")}
          />
        )}

        {currentView === "opsummering" && (
          <Opsummering
            onNext={() => handleNext("payment")}
            onBack={() => handleBack("information")}
          />
        )}

        {currentView === "payment" && (
          <Payment onBack={() => handleBack("opsummering")} />
        )}
      </div>
    </div>
  );
}
