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
  const {
    fetchReservation,
    timer,
    timerActive,
    decrementTimer,
    stopTimer,
    resetBooking,
  } = useBookingStore();

  // Start timer nedtælling, når timerActive er true
  useEffect(() => {
    if (timerActive) {
      const interval = setInterval(() => {
        decrementTimer();
      }, 1000);

      return () => clearInterval(interval); // Ryd op, hvis komponenten unmountes
    }
  }, [timerActive, decrementTimer]);

  // Håndter, når timer når 0
  useEffect(() => {
    if (timer === 0 && timerActive) {
      alert("Din reservation er udløbet.");
      resetBooking(); // Nulstil bookingdata
      setCurrentView("tickets"); // Gå tilbage til billetsiden
    }
  }, [timer, timerActive, resetBooking]);

  const handleNext = (nextView) => {
    setCurrentView(nextView);
  };

  const handleBack = (previousView) => {
    setCurrentView(previousView);
  };

  return (
    <div className="mx-auto relative dynamic-bg lg:px-4">
      <div className="flex justify-center lg:justify-start">
        <h1 className="text-white text-7xl font-gajraj font-bold pt-20 lg:pb-2">TICKETS</h1>
      </div>
      <h2 className="flex text-white justify-center text-5xl font-gajraj pb-6">{currentView}</h2>

      {/* Trinindikator */}
      <div className="flex justify-center items-center gap-4">
        <div className={stepIndicator("tickets", 1)}>1</div>
        <div className={stepIndicator("camping", 2)}>2</div>
        <div className={stepIndicator("information", 3)}>3</div>
        <div className={stepIndicator("opsummering", 4)}>4</div>
        <div className={stepIndicator("payment", 5)}>5</div>
      </div>

      {timerActive && (
        <div className="text-white text-primary border-b border-t border-primary text-center py-2 mb-8">
          Reservation expires in: {Math.floor(timer / 60)}:
          {String(timer % 60).padStart(2, "0")}
        </div>
      )}

      {/* Indhold */}
      <div>
        {currentView === "tickets" && <Ticket onNext={() => handleNext("camping")} />}
        {currentView === "camping" && <Camping onNext={() => handleNext("information")} onBack={() => handleBack("tickets")} />}
        {currentView === "information" && <Information onNext={() => handleNext("opsummering")} onBack={() => handleBack("camping")} />}
        {currentView === "opsummering" && <Opsummering onNext={() => handleNext("payment")} onBack={() => handleBack("information")} />}
        {currentView === "payment" && <Payment onBack={() => handleBack("opsummering")} />}
      </div>
    </div>
  );
}