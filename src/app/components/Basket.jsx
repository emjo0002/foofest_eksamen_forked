import useBookingStore from "../globalkurv/useBookingStore";
import { useState } from "react";

export default function Basket({ selectedArea }) {
  const [isOpen, setIsOpen] = useState(false);
  const { tickets, campingSelection, packageSelection, calculateTotal, bookingFee } = useBookingStore();
  const { twoPerson, threePerson, ownTent } = campingSelection.tents;
  const { greenCamping } = campingSelection;

  return (
    <div className="w-full text-white flex flex-col lg:max-h-[36rem] lg:border lg:border-white lg:p-8 lg:sticky lg:top-16">
      <div
        className="text-center lg:cursor-default fixed bottom-0 left-0 right-0 bg-black opacity-95 z-50 lg:h-full lg:static lg:bg-transparent lg:text-white lg:flex lg:flex-col"
        onClick={() => {
          if (window.innerWidth < 1024) {
            setIsOpen(!isOpen);
          }
        }}
      >
        {/* TOTALPRISEN */}
        <div className={`${isOpen ? "block p-10 border-t lg:border-none lg:p-0" : "hidden"} lg:block lg:flex-grow`}>
          <h2 className="font-bold text-5xl mb-4 font-gajraj justify-center">Basket</h2>

          {/* HER VISES VALGTE BILLETTER */}
          {tickets.map(
            (ticket, index) =>
            ticket.quantity > 0 && (
            <div key={ticket.id || `ticket-${index}`} className="flex justify-between font-genos text-xl">
            <p className="text-white">{ticket.quantity} x </p>
            <p>{ticket.title} {ticket.quantity * ticket.price},-</p>
      </div>
    )
)}

          <div className="flex justify-between font-genos text-xl text-white">
            <p>1 x </p>
            <p>Booking Fee {bookingFee},-*</p>
          </div>

          {/* VISER PAKKELØSNING HVIS DEN ER VALGT */}
          {packageSelection ? (
            <div className="flex justify-between font-genos text-white text-xl">
              <p>1 x</p>
              <p className="text-white">
                Recommended package solution
                {packageSelection.twoPerson * 799 + packageSelection.threePerson * 999},-
              </p>
            </div>
          ) : (
            (twoPerson > 0 || threePerson > 0) && (
              <div className="font-genos text-white text-xl">
                {twoPerson > 0 && (
                  <div className="flex justify-between">
                    <p>{twoPerson} x </p>
                    <p>2-persons tent {twoPerson * 799},-</p>
                  </div>
                )}
                {threePerson > 0 && (
                  <div className="flex justify-between">
                    <p>{threePerson} x </p>
                    <p>3-persons tent {threePerson * 999},-</p>
                  </div>
                )}
              </div>
            )
          )}

          {/* VISER HVOR MANGE AF DINE EGNE TELTE DU HAR VALGT */}
          {ownTent > 0 && (
            <div className="flex justify-between font-genos text-white text-xl">
              <p>{ownTent} x </p>
              <p>Your own tent 0,-</p>
            </div>
          )}

          {greenCamping && (
            <div className="flex justify-between font-genos text-white text-xl">
              <p>1 x</p>
              <p>Green Camping 249,-</p>
            </div>
          )}

          {/* VISER CAMPING AREA */}

          <div className="mt-4 flex justify-between">
            <h3 className="font-extrabold font-genos text-2xl text-white mb-2">Camping area:</h3>
            <p className="text-white font-genos text-xl">{campingSelection.area || "Choose area"}</p>
          </div>
        </div>

        {/* TOTAL */}
        <div className={`font-genos  text-white p-10 lg:p-0 lg:mt-auto lg:pt-4 ${isOpen ? "block" : "border-t lg:border-none"}`}>
          <div className="flex justify-center items-center gap-5 text-5xl">
            <h3> Total </h3>
            <p>{calculateTotal()},-</p>
            <span className="text-2xl lg:hidden">{isOpen ? "▼" : "▲"}</span>
          </div>
          <p className="text-lg">Note: This includes setting up your tent by our team</p>
        </div>
      </div>
    </div>
  );
}
