import useBookingStore from "../globalkurv/useBookingStore";
import { useState } from "react";

export default function Basket({ selectedArea }) {
  const [isOpen, setIsOpen] = useState(false)
  const { tickets, campingSelection, packageSelection, calculateTotal } = useBookingStore();
  const { twoPerson, threePerson } = campingSelection.tents;
  const { greenCamping } = campingSelection;

  return (

    <div 
    className="
  w-full border border-black text-black p-8 
  lg:w-96 lg:cursor-default 
  fixed bottom-0 left-0 right-0 bg-red-300 opacity-80 z-50 
  lg:static lg:bg-transparent lg:text-black"

    onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`p-4 ${isOpen ? "block" : "hidden"} lg:block`}>
        <h2 className="font-bold text-lg mb-4">Din Kurv</h2>

  {/* Viser valgte billetter */}
  {tickets.map(
    (ticket) =>
      ticket.quantity > 0 && (
        <p key={ticket.id} className="text-black">
          {ticket.quantity} x {ticket.title} ({ticket.price},-) ={" "}
          {ticket.quantity * ticket.price},-
        </p>
      )
  )}

  {/* Viser pakkeløsning, hvis den er valgt */}
  {packageSelection && (
    <div className="mt-4">
      <h3 className="font-semibold text-black">Pakkeløsning</h3>
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
      <h3 className="font-semibold text-black">Individuelle telte</h3>
      {twoPerson > 0 && (
        <p className="text-black">
          {twoPerson} x 2-personers telt (799,-) = {twoPerson * 799},-
        </p>
      )}
      {threePerson > 0 && (
        <p className="text-black">
          {threePerson} x 3-personers telt (999,-) = {threePerson * 999},-
        </p>
      )}
    </div>
  )}

  {/* Viser Green Camping, hvis valgt */}
  {greenCamping && (
    <div className="mt-4">
      <h3 className="font-semibold text-black">Ekstra</h3>
      <p className="text-black">Green Camping: 249,-</p>
    </div>
  )}

  {/* Viser valgt område */}
  {selectedArea !== "Område" && (
    <div className="mt-4">
      <h3 className="font-semibold text-black">Område</h3>
      <p className="text-black">{selectedArea}</p>
    </div>
  )}
</div>

      {/* Totalpris */}
      <div className= {`flex mt-4 pt-4 ${isOpen ? "border-t" : ""}`}>
        <h3 className="font-bold text-gray-800">Total</h3>
        <p className="text-gray-900 text-lg">{calculateTotal()},-</p>
        <span className="text-2xl lg:hidden">{isOpen ? "▼" : "▲"}</span>
      </div>
    </div>
  );
}
