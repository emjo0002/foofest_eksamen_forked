import React from "react";

export default function Counter({ quantity, onIncrement, onDecrement, disableIncrement }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        className="border px-2 py-1"
        disabled={quantity <= 0} // Deaktiver knappen, hvis mængden er 0
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={onIncrement}
        className={`border px-2 py-1 ${disableIncrement ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={disableIncrement} // Deaktiver knappen, hvis increment ikke er tilladt
      >
        +
      </button>
    </div>
  );
}
