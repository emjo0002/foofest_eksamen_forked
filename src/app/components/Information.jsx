import React, { useEffect } from "react";
import useBookingStore from "../globalkurv/useBookingStore";

export default function Information({ onNext, onBack }) {
  const { reservationId, fetchReservation, campingSelection } = useBookingStore();

  useEffect(() => {
    fetchReservation(); // Hent reservation med dynamiske værdier
  }, [fetchReservation]);

  return (
    <main>
      <div>
        {reservationId ? (
          <div>
          <p>Reservation ID: {reservationId}</p>
          <p>Pladser reserveret: {campingSelection.totalTents} </p>
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