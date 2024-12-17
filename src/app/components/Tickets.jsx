import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import { useState } from "react";
import { useEffect } from "react";

export default function Ticket({ onNext }) {
  const { tickets, updateTicketQuantity } = useBookingStore();
  const [error, setError] = useState(false);

  const hasSelectedTickets = tickets.some((ticket) => ticket.quantity > 0);

  useEffect(() => {
    if (hasSelectedTickets && error) {
      setError(false);
    }
  }, [hasSelectedTickets, error]);

  const handleNext = () => {
    if (hasSelectedTickets) {
      onNext();
    } else {
      setError(true);
    }
  };

  return (
    <main>
      <div className="px-4 max-w-5xl mx-auto mb-24">
        <h2 className="flex justify-center text-5xl font-gajraj">Valg af billet</h2>
        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 border-2 border-black text-black font-genos text-4xl">1</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">2</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">3</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">4</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">5</div>
              </div>
        <div className="flex justify-center flex-wrap gap-8 m-20">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="w-96 border border-black text-black text-center p-8"
            >
              <h2 className="text-2xl font-bold mb-4 uppercase">{ticket.title}</h2>
              <p className="text-xl font-bold mb-4">Pris: {ticket.price},-</p>
              <Counter
                quantity={ticket.quantity}
                onIncrement={() => updateTicketQuantity(ticket.id, ticket.quantity + 1)}
                onDecrement={() => updateTicketQuantity(ticket.id, ticket.quantity - 1)}
              />
            </div>
          ))}
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-center">
            Vælg venligst en billet for at fortsætte
          </p>
        )}
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className={`mt-4 px-4 py-2 rounded ${
              hasSelectedTickets
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
