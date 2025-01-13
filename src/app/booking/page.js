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
  const [postedIds, setPostedIds] = useState([]);
  const {
    timer,
    timerActive,
    decrementTimer,
    stopTimer,
    resetBooking,
    resetReservationId
  } = useBookingStore();

 useEffect(() => {
  let interval;
  if (timerActive) {
    interval = setInterval(() => {
      decrementTimer(); // Brug decrementTimer fra din store
    }, 1000);
  }

  return () => {
    if (interval) {
      clearInterval(interval); // Ryd op i intervallet
    }
  };
}, [timerActive, decrementTimer]);

  //HÅNDTER NÅR TIMER NÅR TIL 0
  useEffect(() => {
    if (timer === 0 && timerActive) {
      alert("Din reservation er udløbet.");
      resetBooking();
      stopTimer();
      setCurrentView("tickets");
    }
  }, [timer, timerActive, resetBooking, stopTimer]);

  // DENNE FUKTION BESTEMMER TRIN STYLING BASERET PÅ CURRUNTVIEW
  const stepIndicator = (viewName) => {
    const isActive = currentView === viewName;
    return `flex items-center justify-center rounded-full 
            ${isActive ? "w-12 h-12 bg-white border-2 border-black text-black" : "w-10 h-10 bg-black bg-opacity-70 text-white"} 
            font-genos ${isActive ? "text-3xl" : "text-2xl"}`;
  };

  const handleNext = (nextView) => {
    setCurrentView(nextView);
  };

  const handleBack = (previousView) => {
    if (currentView === "information") {
      stopTimer();
      resetReservationId();
    }
    setCurrentView(previousView);
  };

  return (
    <div className="mx-auto relative dynamic-bg pt-14 lg:px-4">
      {/* VORES TRIN I BOOKINGFLOW */}
      <div className="flex justify-center items-center gap-4">
        <div className={stepIndicator("tickets", 1)}>1</div>
        <div className={stepIndicator("camping", 2)}>2</div>
        <div className={stepIndicator("information", 3)}>3</div>
        <div className={stepIndicator("opsummering", 4)}>4</div>
        <div className={stepIndicator("payment", 5)}>5</div>
      </div>

      
        {currentView === "information" && !timerActive && (
          <div className="text-white text-xl font-genos text-center p-5 pt-10">
          <p>Reservation time is loading...</p>
           </div>
          )}
          {timerActive && (
          <div className="text-white text-xl font-genos text-center p-5 pt-10">
          <p>
            Reservation expires in: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </p>
          </div>
        )}
       

      {/* OVERSIGT OVER NAVIGATIONS PÅ BOOKINGFLOW */}
      <div>
        {currentView === "tickets" && <Ticket onNext={() => handleNext("camping")} />}
        {currentView === "camping" && <Camping onNext={() => handleNext("information")} onBack={() => handleBack("tickets")}/>}
        {currentView === "information" && 
        <Information
         onNext={() => handleNext("opsummering")} 
         onBack={() => handleBack("camping")} 
         setPostedIds={setPostedIds}
         />}
        {currentView === "opsummering" && 
        <Opsummering 
        onNext={() => handleNext("payment")} 
        onBack={() => handleBack("information")} 
        postedIds={postedIds}
        />}
        {currentView === "payment" && (
          <Payment
            onBack={() => handleBack("opsummering")}
            onSuccess={() => {
              resetBooking();
              setCurrentView("tickets");
            }}
          />
        )}
      </div>
    </div>
  );
}
