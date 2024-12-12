import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import Basket from "./Basket";
import { getAllAreas } from "../api/api";
import { useState, useEffect } from "react";

export default function Camping({ onNext, onBack }) {
  const [areas, setAreas] = useState([]); // Liste af områder hentet fra databasen
  const [selectedArea, setSelectedArea] = useState("Område"); // Valgt område
  const { campingSelection, updateTentQuantity, toggleGreenCamping } = useBookingStore();
  const { twoPerson, threePerson } = campingSelection.tents;
  const { greenCamping } = campingSelection; // Hent greenCamping korrekt

  useEffect(() => {
    async function fetchData() {
      const fetchedAreas = await getAllAreas();
      setAreas(fetchedAreas);
    }
    fetchData();
  }, []);

  // Filtrering af områder baseret på det valgte område
  const availableAreas = selectedArea === "Område" ? areas : areas.filter((area) => area.area === selectedArea);

  return (
    <main>
      <div className="mb-4">
        <label htmlFor="area-filter" className="mr-4 text-lg font-semibold">
          Vælg Område:
        </label>
        <select id="area-filter" value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="bg-red text-black px-6 py-2 rounded-lg">
          <option value="Område">Vælg Område</option>
          {areas.map((area) => (
            <option key={area.id} value={area.area}>
              {area.area} (Ledige pladser: {area.available})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <div>
          2-personers telt - 799,-
          <Counter initialQuantity={twoPerson} onChange={(newQuantity) => updateTentQuantity("twoPerson", newQuantity)} />
        </div>
      </div>

      <div className="mb-4">
        <div>
          3-personers telt - 999,-
          <Counter initialQuantity={threePerson} onChange={(newQuantity) => updateTentQuantity("threePerson", newQuantity)} />
        </div>
      </div>

      {/* Checkbox til Green Camping */}
      <div className="flex items-center mb-4">
        <input type="checkbox" id="greenCamping" checked={greenCamping} onChange={toggleGreenCamping} className="mr-2" />
        <label htmlFor="greenCamping" className="text-black">
          Green Camping
        </label>
      </div>

      <button onClick={onBack} className="mt-4">
        Tilbage
      </button>

      <button onClick={onNext} className="mt-4">
        Next
      </button>

      <Basket selectedArea={selectedArea} />
    </main>
  );
}
