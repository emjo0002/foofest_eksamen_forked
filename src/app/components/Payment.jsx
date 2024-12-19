import React from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import Basket from "./Basket";

export default function Payment({ onBack, onSuccess }) {
  const reservationId = useBookingStore((state) => state.reservationId);
  const completeReservation = useBookingStore((state) => state.completeReservation);

  const handlePayment = async (event) => {
    event.preventDefault();

    // Hent formen via ID
    const form = document.getElementById("payment-form");

    // Tjek om formen er valid
    if (!form.checkValidity()) {
      form.reportValidity(); // Vis fejlbeskeder
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
      <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap">
        <div className="border border-white text-white lg:w-full p-8">
          {/* Reservation ID */}
          <div className="mb-8 text-left">
            {reservationId ? (
              <div>
                <p className="font-genos text-2xl mb-2">
                  <strong>Reservation ID:</strong> {reservationId}
                </p>
              </div>
            ) : (
              <p className="font-genos text-2xl">Reserverer plads...</p>
            )}
          </div>

          {/* Form for betaling */}
          <form id="payment-form">
            {/* Konto Nummer */}
            <div className="mb-4">
              <label htmlFor="account-number" className="block font-medium mb-2 text-white">
                Kontonummer:
              </label>
              <input
                type="text"
                name="accountNumber"
                id="account-number"
                className="w-full px-3 py-2 border border-gray-300 text-black"
                placeholder="Indtast dit kontonummer"
                required // HTML5 validering
              />
            </div>

            {/* Udløbsdato og CVR */}
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label htmlFor="expiry-date" className="block font-medium mb-2 text-white">
                  Udløbsdato:
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  id="expiry-date"
                  className="w-full px-3 py-2 border border-gray-300 text-black"
                  placeholder="MM/ÅÅ"
                  required // HTML5 validering
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvr" className="block font-medium mb-2 text-white">
                  CVR:
                </label>
                <input
                  type="text"
                  name="cvr"
                  id="cvr"
                  className="w-full px-3 py-2 border border-gray-300 text-black"
                  placeholder="Indtast CVR"
                  required // HTML5 validering
                />
              </div>
            </div>
          </form>
        </div>

        {/* Basket-komponent */}
        <Basket />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="font-gajraj px-6 py-2 text-3xl text-white">
          Tilbage
        </button>
        <button
          onClick={handlePayment}
          className="font-gajraj px-6 py-2 text-3xl text-white"
        >
          Betal
        </button>
      </div>
    </main>
  );
}
