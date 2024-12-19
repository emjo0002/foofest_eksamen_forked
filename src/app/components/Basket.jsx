import useBookingStore from "../globalkurv/useBookingStore";
import { useState } from "react";

export default function Basket({ selectedArea }) {
  const [isOpen, setIsOpen] = useState(false);
  const { tickets, campingSelection, packageSelection, calculateTotal, bookingFee } = useBookingStore();
  const { twoPerson, threePerson, ownTent } = campingSelection.tents;
  const { greenCamping } = campingSelection;

  return (
  <div className="w-full text-white flex flex-col max-h-[720px] lg:border lg:border-white lg:p-8">
    <div
      className="text-center lg:cursor-default fixed bottom-0 left-0 right-0 bg-black opacity-95 z-50 lg:h-full lg:static lg:bg-transparent lg:text-white lg:flex lg:flex-col"
      onClick={() => {
        if (window.innerWidth < 1024) {
          setIsOpen(!isOpen);
        }
      }}
    >
      {/* Indhold ovenfor totalprisen */}
      <div className={`${isOpen ? "block p-10 border-t lg:border-none lg:p-0" : "hidden"} lg:block lg:flex-grow`}>
        <h2 className="font-bold text-5xl mb-4 font-gajraj justify-center">Kurv</h2>

        {/* Viser valgte billetter */}
        {tickets.map(
          (ticket) =>
            ticket.quantity > 0 && (
              <div className="flex justify-between font-genos text-2xl">
                <p key={ticket.id} className="text-white">{ticket.quantity} x </p>
                <p>{ticket.title} {ticket.quantity * ticket.price},-</p>
              </div>
            )
        )}

        <div className="flex justify-between font-genos text-2xl text-white">
                <p>1 x </p>
                <p>Booking Fee {bookingFee},-</p>
              </div>


        {/* Viser pakkeløsning, hvis den er valgt */}
        {packageSelection ? (
          <div className="flex justify-between font-genos text-white text-2xl">
            <p>1 x</p>
            <p className="text-white">Anbefalet pakkeløsning {packageSelection.twoPerson * 799 + packageSelection.threePerson * 999},-</p>
          </div>
        ) : (
          (twoPerson > 0 || threePerson > 0) && (
            <div className="font-genos text-white text-2xl">
              {twoPerson > 0 && (
                <div className="flex justify-between">
                  <p>{twoPerson} x </p>
                  <p>2-pers telt {twoPerson * 799},-</p>
                </div>
              )}
              {threePerson > 0 && (
                <div className="flex justify-between">
                  <p>{threePerson} x </p>
                  <p>3-pers telt {threePerson * 999},-</p>
                </div>
              )}
            </div>
          )
        )}

        {/* Viser antal eget telte */}
        {ownTent > 0 && (
          <div className="flex justify-between font-genos text-white text-2xl">
            <p>{ownTent} x </p>
            <p>Eget telt 0,-</p>
          </div>
        )}

        {/* Viser Green Camping, hvis valgt */}
        {greenCamping && (
          <div className="flex justify-between font-genos text-white text-2xl">
            <p>1 x</p>
            <p>Green Camping 249,-</p>
          </div>
        )}

        {/* Viser valgt område */}
        
        <div className="mt-4 flex justify-between">
          <h3 className="font-extrabold font-genos text-3xl text-white mb-2">Campingområde:</h3>
          <p className="text-white font-genos text-2xl">{selectedArea || "Vælg område"}</p>
        </div>
      </div>
      

      {/* Totalpris */}
      <div className={`font-genos  text-white p-10 lg:mt-auto lg:pt-4 ${isOpen ? "block" : "border-t lg:border-none"}`}>
        <div className="flex justify-center items-center gap-5 text-5xl">
        <h3> Total </h3>
        <p>{calculateTotal()},-</p>
        <span className="text-2xl lg:hidden">{isOpen ? "▼" : "▲"}</span>
        </div>
        <p className="text-xl">Booking gebyr: 99,-*</p>
      </div>
    </div>
  </div>
);
}
