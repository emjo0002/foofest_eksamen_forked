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
    <div className="px-4 mx-auto mb-24">
      <div className="">
        <h1 className="text-8xl font-gajraj font-bold mb-8">TICKETS</h1>
      </div>

      <div>
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
