import { useState } from "react";

export default function Counter({ initialQuantity, onChange = () => {}, disableIncrement }) {
  const [quantity, setQuantity] = useState(initialQuantity || 0);

  const handleIncrement = () => {
    if (disableIncrement) return; // Stop hvis increment ikke er tilladt
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={handleDecrement} className="border px-2 py-1">
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={handleIncrement}
        className={`border px-2 py-1 ${disableIncrement ? "cursor-not-allowed opacity-50" : ""}`}
        disabled={disableIncrement} // Deaktiver knappen, hvis increment ikke er tilladt
      >
        +
      </button>
    </div>
  );
}
