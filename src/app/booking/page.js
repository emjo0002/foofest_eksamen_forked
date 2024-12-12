"use client";

import { useState, useEffect } from "react";

import Ticket from "../components/Tickets";
import Camping from "../components/Camping";
import Information from "../components/Information";
import Payment from "../components/Payment";
import Opsummering from "../components/Opsummering";

export default function Booking() {
  const [currentView, setCurrentView] = useState("tickets"); // Default til første trin (tickets)

  const handleNext = (nextView) => {
    setCurrentView(nextView);
  };

  return (
    <div className="px-4 max-w-5xl mx-auto mb-24">
      <div className="flex flex-col items-center justify-center m-20">
        <h1 className="text-7xl font-bold">Booking</h1>
      </div>

      <div className="grid grid-cols-[65%_30%] justify-between">
        {/* Venstre side */}
        <div className="ticket-selection">
          {currentView === "tickets" && <Ticket onNext={() => handleNext("camping")} />}

          {currentView === "camping" && <Camping onNext={() => handleNext("information")} onBack={() => handleNext("tickets")} />}

          {currentView === "information" && <Information onNext={() => handleNext("opsummering")} onBack={() => handleNext("camping")} />}

          {currentView === "opsummering" && <Opsummering onNext={() => handleNext("payment")} onBack={() => handleNext("information")} />}

          {currentView === "payment" && <Payment onBack={() => handleNext("opsummering")} />}
        </div>
      </div>
    </div>
  );
}
