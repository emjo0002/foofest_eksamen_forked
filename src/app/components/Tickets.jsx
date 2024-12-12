import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";

export default function Ticket({ onNext }) {
  const { tickets, updateTicketQuantity } = useBookingStore();

  return (
    <main>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="mb-4">
          <div>
            {ticket.title} - {ticket.price},-
            <Counter initialQuantity={ticket.quantity} onChange={(newQuantity) => updateTicketQuantity(ticket.id, newQuantity)} />
          </div>
        </div>
      ))}

      <button onClick={onNext} className="mt-4">
        Next
      </button>
    </main>
  );
}
