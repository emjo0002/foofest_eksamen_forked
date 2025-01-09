import React from "react";
import useBookingStore from "../globalkurv/useBookingStore";
import Basket from "./Basket";

export default function Opsummering({ onNext, onBack }) {
  const { reservationId, userInfo } = useBookingStore();

  return (
    <main className="max-w-6xl mx-auto pb-5">
      <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap">
        <div className="relative border border-white text-white lg:w-full lg:min-h-[29rem] p-8 flex flex-col">
          <h2 className="font-bold text-4xl mb-4 font-gajraj self-center">User information</h2>
          {/* VISER RESERVATIONSID*/}
          <div className="mb-8 self-center">
            {reservationId ? (
              <div>
                <p className="font-genos text-2xl mb-2">
                  <strong>Reservation ID:</strong> {reservationId}
                </p>
              </div>
            ) : (
              <p className="font-genos text-2xl">Reserve an area</p>
            )}
          </div>

          {/* BRUGERENS INFORMATION, HVIS ANGIVET */}
          <div className="mb-8">
            {userInfo.length > 0 ? (
              userInfo.map((info, index) => (
                <div key={index} className="mb-4 border-b border-white font-genos text-2xl pb-4">
                  <p>
                    <strong className="font-extrabold">Name:</strong> {info.name}
                  </p>
                  <p>
                    <strong className="font-extrabold">Last name:</strong> {info.lastname}
                  </p>
                  <p>
                    <strong className="font-extrabold">Telephone number:</strong> {info.number}
                  </p>
                  <p>
                    <strong className="font-extrabold">Email:</strong> {info.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="font-genos text-2xl">Information error</p>
            )}
          </div>
        </div>
        <Basket />
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onBack} className="font-gajraj px-6 py-2 text-3xl text-white">
          Back
        </button>
        <button onClick={onNext} className="font-gajraj px-6 py-2 text-3xl text-white">
          Next
        </button>
      </div>
    </main>
  );
}
