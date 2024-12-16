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
    <div className="px-4 max-w-5xl mx-auto mb-24">
      <h2 className="flex justify-center text-5xl font-gajraj">Valg af billet</h2>
<div className="flex justify-center items-center gap-4">
  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 border-2 border-black text-black font-genos text-4xl"> 1 </div>
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
            <p className="text-sm mb-6 opacity-80 leading-relaxed">
              Non rerum fugiat voluptatum error. Error harum libero eum aliquam
              voluptas fuga reprehenderit possimus.
            </p>
            <ul className="text-left mb-6 list-disc list-inside opacity-80">
              <li>Lorem</li>
              <li>Ipsen</li>
              <li>Non</li>
              <li>Harum</li>
            </ul>
            <p className="text-xl font-bold mb-4">Pris: {ticket.price},-</p>
            <div className="flex items-center justify-center gap-4">
             <Counter
            initialQuantity={ticket.quantity}
            onChange={(newQuantity) => updateTicketQuantity(ticket.id, newQuantity)}
          />
            </div>
          </div>
        ))}
      </div>
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
  </main>
);

}
