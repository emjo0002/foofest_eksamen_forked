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
  const { timer, timerActive, stopTimer, fetchReservation, loadingReservation } = useBookingStore();


  const handleTimerEnd = () => {
    alert("Din reservation er udløbet. Du bliver sendt tilbage til billetvalg.");
    setCurrentView("tickets");
    stopTimer(); // Stop og nulstil timeren
  };

  // Tjekker, om timeren er 0
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



  return (
    <div className="px-4 mx-auto mb-24">
      <h1 className="text-8xl font-gajraj font-bold mb-8 text-center">TICKETS</h1>

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
