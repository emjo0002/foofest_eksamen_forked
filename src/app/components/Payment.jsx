import React from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import Basket from "./Basket";

export default function Payment({ onBack, onSuccess }) {
  const reservationId = useBookingStore((state) => state.reservationId);
  const completeReservation = useBookingStore((state) => state.completeReservation);

  const handlePayment = async (event) => {
    event.preventDefault();

    // HENT FORMEN VIA ID
    const form = document.getElementById("payment-form");

    // DENNE TJEKKER OM DEN ER VALID
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const success = await completeReservation();

    if (success) {
      alert("Betaling gennemført! Tak for dit køb. Du bliver nu sendt tilbage til starten.");
      onSuccess();
    } else {
      alert("Noget gik galt med reservationen. Prøv igen.");
    }
  };

  return (
    <main className="max-w-6xl mx-auto pb-5">
      <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap lg:min-h-[29rem]">
        <div className="border border-white text-white lg:w-full p-8 flex flex-col">
          <h2 className="font-bold text-4xl mb-4 font-gajraj self-center">Card information</h2>
          <div className="mb-8 self-center">
            {reservationId ? (
              <div>
                <p className="font-genos text-2xl mb-2">
                  <strong>Reservation ID:</strong> {reservationId}
                </p>
              </div>
            ) : (
              <p className="font-genos text-2xl">Reserve an area..</p>
            )}
          </div>

          {/* BETALINGS FORM */}
          <form id="payment-form">
            <div className="mb-4">
              <label htmlFor="account-number" className="block font-medium mb-2 text-white">
                ACCOUNT NUMBER:
              </label>
              <input type="text" name="accountNumber" id="account-number" className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="Enter account number" required />
            </div>

            {/* UDLØBSDATO OG CVR */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label htmlFor="expiry-date" className="block font-medium mb-2 text-white">
                  EXPIRE DATE:
                </label>
                <input type="text" name="expiryDate" id="expiry-date" className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="MM/ÅÅ" required />
              </div>
              <div className="flex-1">
                <label htmlFor="cvr" className="block font-medium mb-2 text-white">
                  CVR:
                </label>
                <input type="text" name="cvr" id="cvr" className="w-full px-3 py-2 border border-gray-300 text-black" placeholder="Indtast CVR" required />
              </div>
            </div>
          </form>
        </div>

        <Basket />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="font-gajraj px-6 py-2 text-3xl text-white">
          Back
        </button>
        <button onClick={handlePayment} className="font-gajraj px-6 py-2 text-3xl text-white">
          Pay
        </button>
      </div>
    </main>
  );
}
