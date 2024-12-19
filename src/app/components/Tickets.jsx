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
      <div className="px-4 max-w-6xl mx-auto pb-5">  
        <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap">
    {tickets.map((ticket) => (
      <div
        key={ticket.id}
        className={`flex flex-col w-96 border border-white text-white text-center justify-center p-8 lg:w-full ${
      ticket.title === "VIP-Billet" ? "bg-black bg-opacity-75" : ""
    }`}
  >
        <h2 className="text-2xl font-bold mb-4 uppercase font-gajraj">{ticket.title}</h2>
        <p className="pb-4 font-genos text-xl">{ticket.bio}</p>
        <p className="text-3xl font-bold mb-4 font-genos">Pris: {ticket.price},-</p>
        <div className="flex justify-center">
          <Counter
            quantity={ticket.quantity}
            onIncrement={() => updateTicketQuantity(ticket.id, ticket.quantity + 1)}
            onDecrement={() => updateTicketQuantity(ticket.id, ticket.quantity - 1)}
          />
        </div>
      </div>
    ))}
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-center font-genos text-2xl">
            Vælg venligst en billet for at fortsætte
          </p>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="font-gajraj mt-4 px-4 py-2 text-3xl text-white lg:text-5xl"
          >
            Forsæt
          </button>
        </div>
      </div>
    </main>
  );
}
