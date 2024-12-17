import React, { useEffect } from "react";
import useBookingStore from "../globalkurv/useBookingStore";

export default function Information({ onNext, onBack }) {
  const { reservationId, fetchReservation, totalTents } = useBookingStore(); // Hent totalTents fra store

  useEffect(() => {
    fetchReservation(); 
  }, []);

 const { tickets } = useBookingStore();

  // Opret en liste over billetter gentaget efter antal valgt
  const selectedTickets = tickets.flatMap((ticket) =>
    Array(ticket.quantity).fill(ticket)
  );
  
  return (
    <main className="flex items-center justify-center">
  <div className="flex flex-col justify-center items-center gap-8">
    <div className="w-96 border border-black text-black text-center p-2">
      <div className="mb-4">
        {reservationId ? (
          <div>
            <p>Dit reservation ID: {reservationId}</p>
            <p>Pladser reserveret: {totalTents()}</p>
          </div>
        ) : (
          <p>Reserverer plads...</p>
        )}
      </div>
    </div>

      <div className="flex flex-col gap-8 justify-center p-8">
      {selectedTickets.map((ticket, index) => (
        <div
          key={`${ticket.id}-${index}`}
          className="w-96 border border-black text-black text-center p-12"
        >
          <form className="w-full max-w-md bg-white p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Info Form - {ticket.title} #{index + 1}
            </h2>

            {/* Navn */}
            <div className="mb-4">
              <label
                htmlFor={`name-${ticket.id}-${index}`}
                className="block font-medium mb-2"
              >
                Navn:
              </label>
              <input
                type="text"
                id={`name-${ticket.id}-${index}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Indtast dit navn"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor={`email-${ticket.id}-${index}`}
                className="block font-medium mb-2"
              >
                E-mail:
              </label>
              <input
                type="email"
                id={`email-${ticket.id}-${index}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Indtast din e-mail"
              />
            </div>

            {/* Submit knap */}
            <button
              type="button"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Send
            </button>
          </form>
        </div>
      ))}
    </div>

    {/* Knapper */}
    <div className="flex gap-4">
    <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Tilbage</button>
    <button onClick={onNext} className="px-4 py-2 bg-blue-500 text-white rounded">Fortsæt</button>
  </div>
  </div>
</main>
  );
}
