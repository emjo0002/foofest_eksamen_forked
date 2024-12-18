import React, { useEffect, useState } from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import { postSub } from "../lib/supabase";

export default function Information({ onNext, onBack }) {
  const { reservationId, fetchReservation, totalTents, tickets, updateUserInfo } = useBookingStore();

  // STATE DER GEMMER BRUGERINFORMATION
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservation();
  }, []);

  // HÅNDTERER DEN INFORMATION DER KOMMER IND
  const handleSubmit = async (e, ticket, index) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const name = e.target[`name-${ticket.id}-${index}`].value;
    const email = e.target[`email-${ticket.id}-${index}`].value;

    const newUser = { name, email };

    try {
      // GEM DATAEN I SUPABASE
      await postSub(newUser);
      setUserInfo((prev) => [...prev, newUser]);
      updateUserInfo(newUser); // Gem data i useBookingStore
      alert("Information gemt i databasen!");
    } catch (error) {
      console.error("Fejl ved gemning i Supabase:", error);
      setError("Der skete en fejl ved gemning i databasen.");
    } finally {
      setIsLoading(false);
    }
  };

  // OPRET EN LISTE OVER BILLETTER UD FRA HVOR MANGE DER ER VALGT
  const selectedTickets = tickets.flatMap((ticket) => Array(ticket.quantity).fill(ticket));

  return (
    <main className="flex items-center justify-center min-h-screen p-8">
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <div className="w-96 border border-black text-white text-center p-4">
          {reservationId ? (
            <div>
              <p>Dit reservation ID: {reservationId}</p>
              <p>Pladser reserveret: {totalTents()}</p>
            </div>
          ) : (
            <p>Reserverer plads...</p>
          )}
        </div>

        <div className="flex flex-col gap-8 justify-center p-8 w-full max-w-md">
          {selectedTickets.map((ticket, index) => (
            <div key={`${ticket.id}-${index}`} className="border border-black text-white p-6 rounded">
              <form onSubmit={(e) => handleSubmit(e, ticket, index)}>
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Info Form - {ticket.title} #{index + 1}
                </h2>

                {/* NAVN */}
                <div className="mb-4">
                  <label htmlFor={`name-${ticket.id}-${index}`} className="block font-medium mb-2 text-black">
                    Navn:
                  </label>
                  <input type="text" id={`name-${ticket.id}-${index}`} className="w-full px-3 py-2 border border-gray-300 text-black rounded-md" placeholder="Indtast dit navn" required />
                </div>

                {/* E-MAIL */}
                <div className="mb-4">
                  <label htmlFor={`email-${ticket.id}-${index}`} className="block font-medium mb-2 text-black">
                    E-mail:
                  </label>
                  <input type="email" id={`email-${ticket.id}-${index}`} className="w-full px-3 py-2 border border-gray-300 text-black rounded-md" placeholder="Indtast din e-mail" required />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" disabled={isLoading}>
                  {isLoading ? "Gemmer..." : "Gem Information"}
                </button>
              </form>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          ))}
        </div>

        {/* Knapper */}
        <div className="flex gap-4">
          <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">
            Tilbage
          </button>
          <button onClick={() => onNext(userInfo)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Fortsæt
          </button>
        </div>
      </div>
    </main>
  );
}
