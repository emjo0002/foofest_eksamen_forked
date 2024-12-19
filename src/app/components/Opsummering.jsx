import React from "react";
import useBookingStore from "../globalkurv/useBookingStore";

export default function Opsummering({ onNext, onBack }) {
  const { tickets, reservationId, totalTents, calculateTotal, campingSelection, userInfo } = useBookingStore();

  // HER FILTRERER JEG DE VALGTE BILLETTER
  const selectedTickets = tickets.filter((ticket) => ticket.quantity > 0);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-3xl w-full border border-white text-white p-6 rounded-lg shadow-lg">
        {/* VISER RESERVATIONSID OG TOTAL TELTE */}
        <div className="mb-8 text-left">
          {reservationId ? (
            <div>
              <p className="font-genos text-2xl mb-2">
                <strong>Reservation ID:</strong> {reservationId}
              </p>
              <p className="font-genos text-2xl">
                <strong>Antal Telte Reserveret:</strong> {totalTents()}
              </p>
            </div>
          ) : (
            <p className="font-genos text-2xl">Reserverer plads...</p>
          )}
        </div>

        {/* DE / DEN VALGTE BILLET */}
        <div className="mb-8">
          <h3 className="font-genos text-3xl font-extrabold mb-4">Valgte Billetter</h3>
          {selectedTickets.map((ticket) => (
            <div key={ticket.id} className="mb-4 border-b border-white pb-4">
              <p className="font-genos text-2xl">
                <strong>{ticket.title}</strong>
              </p>
              <p className="font-genos text-2xl">Antal: {ticket.quantity}</p>
              <p className="font-genos text-2xl">Pris: {ticket.price * ticket.quantity},-</p>
            </div>
          ))}
        </div>

        {/* EKSTRA TILFØJELSE */}
        {campingSelection.greenCamping && (
          <div className="mb-8">
            <h3 className="font-genos text-3xl font-extrabold mb-2">Ekstra</h3>
            <p className="font-genos text-2xl">Green Camping: 249,-</p>
          </div>
        )}

        {/* BRUGERENS INFORMATION, HVIS ANGIVET */}
        <div className="mb-8">
          <h3 className="font-genos text-3xl font-extrabold mb-4">Brugerinformation</h3>
          {userInfo.length > 0 ? (
            userInfo.map((info, index) => (
              <div key={index} className="mb-4 border-b border-white pb-4">
                <p className="font-genos text-2xl">
                  <strong>Navn:</strong> {info.name}
                </p>
                <p className="font-genos text-2xl">
                  <strong>Email:</strong> {info.email}
                </p>
              </div>
            ))
          ) : (
            <p className="font-genos text-2xl">Ingen brugerinformation tilgængelig.</p>
          )}
        </div>

        {/* DEN TOTALE PRIS */}
        <div className="mb-8">
          <h3 className="font-genos text-3xl font-extrabold mb-2">Totalpris</h3>
          <p className="font-genos text-2xl">{calculateTotal()},-</p>
        </div>
      </div>

      <div className="flex justify-between mt-6 gap-x-80">
        <button onClick={onBack} className="font-gajraj px-6 py-2 text-3xl text-white hover:text-black">
          Tilbage
        </button>
        <button onClick={onNext} className="font-gajraj px-6 py-2 text-3xl text-white hover:text-black">
          Forsæt
        </button>
      </div>
    </main>
  );
}
