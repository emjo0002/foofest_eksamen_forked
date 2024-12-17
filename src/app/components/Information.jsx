import React, { useEffect } from "react";
import useBookingStore from "../globalkurv/useBookingStore";

export default function Information({ onNext, onBack }) {
  const { reservationId, fetchReservation, totalTents } = useBookingStore(); // Hent totalTents fra store

  useEffect(() => {
    fetchReservation(); 
  }, []);

  return (
    <main>
      <div>
        {reservationId ? (
          <div>
            <p>Reservation ID: {reservationId}</p>
            <p>Pladser reserveret: {totalTents()}</p> {/* Kald totalTents-funktionen */}
          </div>
        ) : (
          <p>Reserverer plads...</p>
        )}
      </div>
      <button onClick={onBack}>Tilbage</button>
      <button onClick={onNext}>Fortsæt</button>
    </main>
  );
}
