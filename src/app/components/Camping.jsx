import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import Basket from "./Basket";
import { getAllAreas } from "../api/api";
import { useState, useEffect } from "react";

export default function Camping({ onNext, onBack }) {
  const {
    campingSelection,
    packageSelection,
    updateTents,
    removePackageSelection,
    toggleGreenCamping,
    calculateRecommendedTents,
    updateCampingArea,
  } = useBookingStore();

  const { twoPerson, threePerson, ownTent } = campingSelection.tents; // Individuelle telte
  const recommendedTents = calculateRecommendedTents(); // Anbefalede telte
  const { greenCamping } = campingSelection;
  const recommendedPackagePrice =
    recommendedTents.twoPerson * 799 + recommendedTents.threePerson * 999;

  const [useRecommended, setUseRecommended] = useState(packageSelection !== null);
  const [errorMessage, setErrorMessage] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaCapacityError, setAreaCapacityError] = useState(false);
  const totalTickets = useBookingStore((state) => state.totalTickets());
  const totalTents = twoPerson + threePerson + ownTent;
  const disableIncrement = totalTents >= totalTickets;

  // Hent campingområder
  useEffect(() => {
    async function fetchData() {
      const fetchedAreas = await getAllAreas();
      setAreas(fetchedAreas);
    }
    fetchData();
  }, []);

  const handleRecommendedPackageChange = (checked) => {
  setUseRecommended(checked);
  setErrorMessage(""); // Fjern fejlmeddelelsen
  if (checked) {
    updateTents(recommendedTents); // Opdater teltene
    useBookingStore.setState({ packageSelection: recommendedTents }); // Opdater packageSelection
  } else {
    updateTents({ twoPerson: 0, threePerson: 0 }); // Nulstil telte
    removePackageSelection(); // Fjern packageSelection
  }
};

  const handleTentQuantityChange = (tentType, newQuantity) => {
  setErrorMessage(""); // Fjern fejlmeddelelsen
  updateTents({ ...campingSelection.tents, [tentType]: Math.max(0, newQuantity) });
};

const handleAreaChange = (area) => {
  setErrorMessage(""); // Nulstil fejlmeddelelse
  updateCampingArea(area); // Opdater område i store
};

  const handleNextClick = () => {
  const errors = []; // Array til at samle fejl
  const totalTentsCount = useRecommended
    ? recommendedTents.twoPerson + recommendedTents.threePerson
    : twoPerson + threePerson + ownTent;

  const availableSpots =
    campingSelection.area &&
    areas.find((area) => area.area === campingSelection.area)?.available || 0;

  // Fejl: Intet område valgt
  if (!campingSelection.area || campingSelection.area === "Vælg Område") {
    errors.push("Vælg venligst et område for at fortsætte.");
  }

  // Fejl: Telte overstiger kapaciteten - tjek kun, hvis et område er valgt
  if (
    campingSelection.area &&
    campingSelection.area !== "Vælg Område" &&
    totalTentsCount > availableSpots
  ) {
    errors.push(
      "Det samlede antal telte overstiger de ledige pladser i det valgte område."
    );
  }

  // Fejl: Ingen telte valgt og ingen pakkeløsning
  if (!useRecommended && totalTentsCount === 0) {
    errors.push("Vælg venligst telte eller pakkeløsning for at fortsætte.");
  }

  // Hvis der er fejl, vis dem alle
  if (errors.length > 0) {
    setErrorMessage(errors.join(" "));
    return;
  }

  // Hvis alt er OK, fortsæt uden fejl
  setErrorMessage(""); // Nulstil fejlmeddelelse
  setAreaCapacityError(false); // Nulstil kapacitetsfejl
  onNext();
};

  return (
    <main>
      <div className="px-4 max-w-5xl mx-auto mb-24">
             <h2 className="flex justify-center text-5xl font-gajraj">Camping tilvalg</h2>
             <div className="flex justify-center items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">1</div>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-80 border-2 border-black text-black font-genos text-4xl">2</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">3</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">4</div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-70 text-white font-genos text-3xl">5</div>
              </div>
              <div className="flex justify-center flex-wrap gap-8 m-20">
                <div className="w-96 border border-black text-black text-center p-8">
                  <div className="mb-4">
          {/* Dropdown-menu til valg af område */}
    <label htmlFor="area-filter" className="block mb-2 font-semibold">
            Vælg Område:
          </label>
          <select
  id="area-filter"
  value={campingSelection.area || "Vælg Område"}
  onChange={(e) => handleAreaChange(e.target.value)}
  className="bg-gray-200 p-2 rounded-lg"
>
  <option value="Vælg Område">Vælg Område</option>
  {areas.map((area) => (
    <option key={area.id} value={area.area}>
      {area.area} (Ledige pladser: {area.available})
    </option>
  ))}
</select>
        </div>

        {/* Anbefalet pakkeløsning */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Anbefalet pakkeløsning</h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recommendedPackage"
              checked={useRecommended}
              onChange={(e) => handleRecommendedPackageChange(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="recommendedPackage">
              {recommendedTents.twoPerson > 0 && `${recommendedTents.twoPerson} x 2-personers telt`}
              {recommendedTents.twoPerson > 0 && recommendedTents.threePerson > 0 && " og "}
              {recommendedTents.threePerson > 0 && `${recommendedTents.threePerson} x 3-personers telt`}
              {` - ${recommendedPackagePrice},-`}
            </label>
          </div>
        </div>

        {/* Individuelle telte */}
        {!useRecommended && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Sammensæt din egen pakkeløsning</h3>
            <div className="flex items-center mb-4">
              2-personers telt - 799,-
              <Counter
                quantity={twoPerson}
                onIncrement={() => handleTentQuantityChange("twoPerson", twoPerson + 1)}
                onDecrement={() => handleTentQuantityChange("twoPerson", twoPerson - 1)}
                disableIncrement={disableIncrement}
              />
            </div>
            <div className="mb-4">
              3-personers telt - 999,-
              <Counter
                quantity={threePerson}
                onIncrement={() => handleTentQuantityChange("threePerson", threePerson + 1)}
                onDecrement={() => handleTentQuantityChange("threePerson", threePerson - 1)}
                disableIncrement={disableIncrement}
              />
            </div>
            <div className="mb-4">
              Eget telt med
              <Counter
                quantity={ownTent}
                onIncrement={() => handleTentQuantityChange("ownTent", ownTent + 1)}
                onDecrement={() => handleTentQuantityChange("ownTent", ownTent - 1)}
                disableIncrement={disableIncrement}
              />
            </div>
            
          </div>
        )}

        

        {/* Checkbox til Green Camping */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="greenCamping"
          checked={greenCamping}
          onChange={toggleGreenCamping}
          className="mr-2"
        />
        <label htmlFor="greenCamping" className="text-black">
          Green Camping
        </label>
      </div>

        {/* Fejlmeddelelse */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {areaCapacityError && campingSelection !== "Vælg Område" && (
          <p className="text-red-500">
            Det samlede antal telte overstiger de ledige pladser i det valgte område.
          </p>
        )}
        </div>

        {/* Basket */}
        <Basket selectedArea={campingSelection.area} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">
            Tilbage
          </button>
          <button onClick={handleNextClick} className="px-4 py-2 bg-blue-500 text-white rounded">
            Reserver
          </button>
        </div>
      </div>
    </main>
  );
}
