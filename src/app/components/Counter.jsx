import { useState } from "react";

export default function Counter({ initialQuantity, onChange = () => {} }) {
  const [quantity, setQuantity] = useState(initialQuantity || 0);

  const handleIncrement = () => {
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
      <button onClick={handleIncrement} className="border px-2 py-1">
        +
      </button>
    </div>
  );
}
