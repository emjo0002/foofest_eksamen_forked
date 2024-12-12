import Counter from "../components/Counter";

export default function Payment({ onNext, onBack }) {
  return (
    <main>
      <div>
        799,-
        <Counter />
      </div>
      <div>
        1299,-
        <Counter />
      </div>
      <button onClick={onBack}>tilbage</button>
      <button onClick={onNext}>Videre videre videre </button>
    </main>
  );
}
