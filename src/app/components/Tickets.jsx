import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import { useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

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
      <a href="/" className="block mb-4 text-5xl text-white font-bold w-fit h-fit lg:absolute">
        <IoIosArrowRoundBack />
      </a>
      <div className="max-w-6xl mx-auto">
      <div className="flex justify-center gap-6 mt-6 mr-10 ml-10 mb-2 flex-wrap lg:flex-nowrap">
        {tickets.map((ticket) => (
          <div key={ticket.id} className={`flex flex-col border border-white text-white text-center justify-center p-8 lg:w-full lg:min-h-[36rem] ${ticket.title === "VIP-Billet" ? "bg-black bg-opacity-75" : ""}`}>
            <h2 className="text-5xl font-bold mb-4 uppercase font-gajraj">{ticket.title}</h2>
            <p className="pb-4 font-genos text-xl pt-4">{ticket.bio}</p>
            <p className="text-3xl font-bold mb-4 mt-4 font-genos">Price: {ticket.price},-</p>
            <div className="flex justify-center mt-4">
              <Counter quantity={ticket.quantity} onIncrement={() => updateTicketQuantity(ticket.id, ticket.quantity + 1)} onDecrement={() => updateTicketQuantity(ticket.id, ticket.quantity - 1)} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
  {/* Error message */}
  <div className="flex-1 text-center">
    {error && (
      <p className="text-red-500 font-genos text-2xl pl-32">
        Choose a ticket to continue
      </p>
    )}
  </div>

  {/* Button */}
  <div className="mr-6 pb-3 lg:mr-0">
    <button
      onClick={handleNext}
      className="font-gajraj px-4 py-2 text-3xl text-white lg:text-4xl"
    >
      Next
    </button>
  </div>
</div>
</div>
    </main>
  );
}
