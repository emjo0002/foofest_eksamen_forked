import { useState, useEffect } from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";

export default function Ticket({ onNext }) {
  const { tickets, updateTicketQuantity } = useBookingStore();
  const [error, setError] = useState(false); // Error state for validation

  // Tjekker om der er valgt mindst én billet
  const hasSelectedTickets = tickets.some((ticket) => ticket.quantity > 0);

  // Overvåg ændringer i tickets og fjern fejl, hvis der er valgt billetter
  useEffect(() => {
    if (hasSelectedTickets && error) {
      setError(false);
    }
  }, [hasSelectedTickets, error]);

  const handleNext = () => {
    if (hasSelectedTickets) {
      setError(false); // Fjern fejl hvis der er valgt billetter
      onNext();
    } else {
      setError(true); // Vis fejl hvis ingen billetter er valgt
    }
  };

  return (
    <main>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="mb-4">
          <div>
            {ticket.title} - {ticket.price},-
            <Counter
              initialQuantity={ticket.quantity}
              onChange={(newQuantity) => updateTicketQuantity(ticket.id, newQuantity)}
            />
          </div>
        </div>
      ))}

      {error && <p className="text-red-500 mt-2">Vælg venligst en billet for at fortsætte</p>}

      <button
        onClick={handleNext}
        className={`mt-4 px-4 py-2 rounded ${
          hasSelectedTickets ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </main>
  );
}
