import React from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import Basket from "./Basket";

export default function Opsummering({ onNext, onBack }) {
  const { reservationId, userInfo } = useBookingStore();

  return (
    <main className="max-w-6xl mx-auto pb-5">
  <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap">
    <div className="border border-white text-white lg:w-full p-8">
      {/* VISER RESERVATIONSID*/}
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

      {/* BRUGERENS INFORMATION, HVIS ANGIVET */}
      <div className="mb-8">
        <h3 className="font-genos text-3xl font-extrabold mb-4">Brugerinformation</h3>
        {userInfo.length > 0 ? (
          userInfo.map((info, index) => (
            <div key={index} className="mb-4 border-b border-white font-genos text-2xl pb-4">
              <p>
                <strong className="font-extrabold">Navn:</strong> {info.name}
              </p>
              <p>
                <strong className="font-extrabold">Efternavn:</strong> {info.lastname}
              </p>
              <p>
                <strong className="font-extrabold">Telefon nummer:</strong> {info.number}
              </p>
              <p>
                <strong className="font-extrabold">Email:</strong> {info.email}
              </p>
            </div>
          ))
        ) : (
          <p className="font-genos text-2xl">Ingen brugerinformation tilgængelig.</p>
        )}
      </div>
    </div>

    {/* Basket-komponenten */}
    <Basket />
  </div>

  {/* Navigation */}
  <div className="flex justify-between mt-6">
    <button onClick={onBack} className="font-gajraj px-6 py-2 text-3xl text-white">
      Tilbage
    </button>
    <button onClick={onNext} className="font-gajraj px-6 py-2 text-3xl text-white">
      Forsæt
    </button>
  </div>
</main>
  );
}
