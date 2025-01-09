import React from "react";

export default function Counter({ quantity, onIncrement, onDecrement, disableIncrement }) {
  return (
    <div className="flex items-center justify-center border font-genos text-xl min-w-16 py-1">
      <button
        onClick={onDecrement}
        className="px-2"
        disabled={quantity <= 0} // DETTE BETYDER AT DEN DEAKTIVERES HVIS MÆNGDEN ER MINDRE END 0
      >
        -
      </button>
      <span>{quantity}</span>
      <button onClick={onIncrement} className={`px-2 ${disableIncrement ? "cursor-not-allowed opacity-50" : ""}`} disabled={disableIncrement}>
        +
      </button>
    </div>
  );
}
