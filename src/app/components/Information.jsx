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

  // HÅNDTER ÆNDRINGER I INPUTFELTER
  const handleChange = (e, ticket, index) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      const updatedInfo = [...prev];
      updatedInfo[index] = { ...updatedInfo[index], [name]: value, ticketId: ticket.id };
      return updatedInfo;
    });
  };

  // GEM DATA I DATABASEN OG GÅ TIL NÆSTE SIDE
  const handleContinue = async () => {
    setIsLoading(true);
    setError(null);

    try {
      for (const user of userInfo) {
        const { name, lastname, number, email } = user; // Send kun name og email
        console.log("Data der sendes til Supabase:", { name, email });
        await postSub({ name, lastname, number, email }); // Send kun de nødvendige felter
        updateUserInfo({ name, lastname, number, email });
      }

      onNext(userInfo); // Fortsæt til næste side
    } catch (error) {
      console.error("Fejl ved gemning i Supabase:", error.message);
      setError("Der skete en fejl ved gemning i databasen.");
    } finally {
      setIsLoading(false);
    }
  };

  // OPRET EN LISTE OVER BILLETTER UD FRA HVOR MANGE DER ER VALGT
  const selectedTickets = tickets.flatMap((ticket) => Array(ticket.quantity).fill(ticket));

  return (
    <main className="flex items-center justify-center px-8">
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        {/* <div className="w-96 border border-black text-white text-center p-4">
          {reservationId ? (
            <div>
              <p>Dit reservation ID: {reservationId}</p>
              <p>Pladser reserveret: {totalTents()}</p>
            </div>
          ) : (
            <p>Reserverer plads...</p>
          )}
        </div> */}

        <div className="flex flex-col gap-8 justify-center w-full max-w-lg font-genos mt-10">
          {selectedTickets.map((ticket, index) => (
            <div key={`${ticket.id}-${index}`} className="border border-white text-white p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Info Form - {ticket.title} #{index + 1}
              </h2>

              {/* NAVN */}
              <div className="mb-4">
                <label htmlFor={`name-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
                  Navn:
                </label>
                <input type="text" name="name" id={`name-${ticket.id}-${index}`} className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="Indtast dit navn" onChange={(e) => handleChange(e, ticket, index)} required />
              </div>

              {/* EFTERNAVN */}
              <div className="mb-4">
                <label htmlFor={`name-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
                  Efternavn:
                </label>
                <input type="text" name="lastname" id={`name-${ticket.id}-${index}`} className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="Indtast dit efternavn" onChange={(e) => handleChange(e, ticket, index)} required />
              </div>

              {/* TELEFONNUMMER */}
              <div className="mb-4">
                <label htmlFor={`email-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
                  Telefon nummer:
                </label>
                <input type="text" name="number" id={`number-${ticket.id}-${index}`} className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="Indtast dit telefon nummer" onChange={(e) => handleChange(e, ticket, index)} required />
              </div>

              {/* E-MAIL */}
              <div className="mb-4">
                <label htmlFor={`email-${ticket.id}-${index}`} className="block font-medium mb-2 text-white">
                  E-mail:
                </label>
                <input type="email" name="email" id={`email-${ticket.id}-${index}`} className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="Indtast din e-mail" onChange={(e) => handleChange(e, ticket, index)} required />
              </div>

            </div>
          ))}
        </div>

        {/* Knapper */}
        <div className="flex justify-between w-full lg:w-3/4">
          <button onClick={onBack} className="font-gajraj px-4 py-2 text-3xl text-white lg:text-5xl">
            Tilbage
          </button>
          <button onClick={handleContinue} className="font-gajraj px-4 py-2 text-3xl text-white lg:text-5xl" disabled={isLoading}>
            {isLoading ? "Gemmer..." : "Fortsæt"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </main>
  );
}
