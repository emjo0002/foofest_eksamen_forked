import React, { useEffect, useState } from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import { postSub } from "../lib/supabase";

export default function Information({ onNext, onBack }) {
  const { fetchReservation, tickets, updateUserInfo } = useBookingStore();

  // STATE DER GEMMER BRUGERINFORMATION
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  // HÅNDTER FORTSÆT-KNAP
  const handleContinue = async (event) => {
  event.preventDefault(); // Forhindre standardformularindsendelse

  // Validering: Tjek at alle felter er udfyldt for faktisk valgte billetter
  const isFormValid = selectedTickets.every((_, index) => {
    const user = userInfo[index];
    return user?.name && user?.lastname && user?.number && user?.email;
  });

  if (!isFormValid) {
    setError("Alle felter skal udfyldes korrekt.");
    return;
  }

  setIsLoading(true);
  setError(null);

  try {
    for (const user of userInfo) {
      const { name, lastname, number, email } = user; // Send kun nødvendige felter
      console.log("Data der sendes til Supabase:", { name, lastname, number, email });
      await postSub({ name, lastname, number, email });
      updateUserInfo({ name, lastname, number, email });
    }
    onNext(); // Fortsæt til næste side
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
        <div className="flex flex-col gap-8 justify-center w-full max-w-lg font-genos mt-10">
          {selectedTickets.map((ticket, index) => (
            <div key={`${ticket.id}-${index}`} className="border border-white text-white p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Info Form - {ticket.title} #{index + 1}
              </h2>

              {/* NAVN */}
              <div className="mb-4">
                <label
                  htmlFor={`name-${ticket.id}-${index}`}
                  className="block font-medium mb-2 text-white"
                >
                  Navn:
                </label>
                <input
                  type="text"
                  name="name"
                  id={`name-${ticket.id}-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 text-black"
                  placeholder="Indtast dit navn"
                  onChange={(e) => handleChange(e, ticket, index)}
                  required
                />
              </div>

              {/* EFTERNAVN */}
              <div className="mb-4">
                <label
                  htmlFor={`lastname-${ticket.id}-${index}`}
                  className="block font-medium mb-2 text-white"
                >
                  Efternavn:
                </label>
                <input
                  type="text"
                  name="lastname"
                  id={`lastname-${ticket.id}-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 text-black"
                  placeholder="Indtast dit efternavn"
                  onChange={(e) => handleChange(e, ticket, index)}
                  required
                />
              </div>

              {/* TELEFONNUMMER */}
              <div className="mb-4">
                <label
                  htmlFor={`number-${ticket.id}-${index}`}
                  className="block font-medium mb-2 text-white"
                >
                  Telefon nummer:
                </label>
                <input
                  type="text"
                  name="number"
                  id={`number-${ticket.id}-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 text-black"
                  placeholder="Indtast dit telefon nummer"
                  onChange={(e) => handleChange(e, ticket, index)}
                  required
                />
              </div>

              {/* E-MAIL */}
              <div className="mb-4">
                <label
                  htmlFor={`email-${ticket.id}-${index}`}
                  className="block font-medium mb-2 text-white"
                >
                  E-mail:
                </label>
                <input
                  type="email"
                  name="email"
                  id={`email-${ticket.id}-${index}`}
                  className="w-full px-3 py-2 border border-gray-300 text-black"
                  placeholder="Indtast din e-mail"
                  onChange={(e) => handleChange(e, ticket, index)}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Knapper */}
        <div className="flex justify-between w-full lg:w-3/4">
          <button
            onClick={onBack}
            className="font-gajraj px-4 py-2 text-3xl text-white lg:text-5xl"
          >
            Tilbage
          </button>
          <button
            onClick={handleContinue}
            className="font-gajraj px-4 py-2 text-3xl text-white lg:text-5xl"
            disabled={isLoading}
          >
            {isLoading ? "Gemmer..." : "Fortsæt"}
          </button>
        </div>

        {error && <p className="font-genos text-2xl text-red-500 mt-2 mb-10">{error}</p>}
      </div>
    </main>
  );
}
