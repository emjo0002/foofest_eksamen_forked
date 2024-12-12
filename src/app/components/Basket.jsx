import useBookingStore from "../globalkurv/useBookingStore";

const Basket = ({ selectedArea }) => {
  const tickets = useBookingStore((state) => state.tickets);
  const campingSelection = useBookingStore((state) => state.campingSelection);

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-2 text-black">Basket</h2>

      {/* Vis billetter i kurven */}
      {tickets
        .filter((ticket) => ticket.quantity > 0)
        .map((ticket) => (
          <div key={ticket.id} className="flex justify-between mb-2">
            <p className="text-black">
              {ticket.title} x {ticket.quantity}
            </p>
            <p className="text-black">{ticket.price * ticket.quantity} DKK</p>
          </div>
        ))}

      {/* Vis 2-personers telte */}
      {campingSelection.tents.twoPerson > 0 && (
        <div className="flex justify-between mb-2">
          <p className="text-black">2-personers telt x {campingSelection.tents.twoPerson}</p>
          <p className="text-black">{campingSelection.tents.twoPerson * 299} DKK</p>
        </div>
      )}

      {/* Vis 3-personers telte */}
      {campingSelection.tents.threePerson > 0 && (
        <div className="flex justify-between mb-2">
          <p className="text-black">3-personers telt x {campingSelection.tents.threePerson}</p>
          <p className="text-black">{campingSelection.tents.threePerson * 399} DKK</p>
        </div>
      )}

      {/* Vis Green Camping, hvis det er valgt */}
      {campingSelection.greenCamping && (
        <div className="flex justify-between mb-2">
          <p className="text-black">Green Camping</p>
          <p className="text-black">200 DKK</p>
        </div>
      )}
      {selectedArea !== "Område" ? <p>Valgt Område: {selectedArea}</p> : <p>Intet område valgt</p>}
    </div>
  );
};

export default Basket;
