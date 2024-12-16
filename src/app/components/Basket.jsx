import useBookingStore from "../globalkurv/useBookingStore";

export default function Basket({ selectedArea }) {
  const { tickets, campingSelection, packageSelection, calculateTotal } = useBookingStore();
  const { twoPerson, threePerson } = campingSelection.tents;
  const { greenCamping } = campingSelection;

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="font-bold text-lg mb-4">Kurv</h2>

      {/* Viser valgte billetter */}
      {tickets.map(
        (ticket) =>
          ticket.quantity > 0 && (
            <p key={ticket.id} className="text-gray-700">
              {ticket.quantity} x {ticket.title} ({ticket.price},-) ={" "}
              {ticket.quantity * ticket.price},-
            </p>
          )
      )}

      {/* Viser pakkeløsning, hvis den er valgt */}
      {packageSelection && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Pakkeløsning</h3>
          <p className="text-gray-700">
            {packageSelection.twoPerson} x 2-personers telt
          </p>
          <p className="text-gray-700">
            {packageSelection.threePerson} x 3-personers telt
          </p>
          <p className="text-gray-700">
            Subtotal:{" "}
            {packageSelection.twoPerson * 799 +
              packageSelection.threePerson * 999}
            ,-
          </p>
        </div>
      )}

      {/* Viser individuelle teltvalg */}
      {(twoPerson > 0 || threePerson > 0) && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Individuelle telte</h3>
          {twoPerson > 0 && (
            <p className="text-gray-700">
              {twoPerson} x 2-personers telt (799,-) = {twoPerson * 799},-
            </p>
          )}
          {threePerson > 0 && (
            <p className="text-gray-700">
              {threePerson} x 3-personers telt (999,-) = {threePerson * 999},-
            </p>
          )}
        </div>
      )}

      {/* Viser Green Camping, hvis valgt */}
      {greenCamping && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Ekstra</h3>
          <p className="text-gray-700">Green Camping: 249,-</p>
        </div>
      )}

      {/* Viser valgt område */}
      {selectedArea !== "Område" && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Område</h3>
          <p className="text-gray-700">{selectedArea}</p>
        </div>
      )}

      {/* Totalpris */}
      <div className="mt-4 border-t pt-4">
        <h3 className="font-bold text-gray-800">Total</h3>
        <p className="text-gray-900 text-lg">{calculateTotal()},-</p>
      </div>
    </div>
  );
}
