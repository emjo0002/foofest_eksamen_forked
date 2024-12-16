import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import Basket from "./Basket";
import { getAllAreas } from "../api/api";
import { useState, useEffect } from "react";

export default function Camping({ onNext, onBack }) {
  const {
    campingSelection,
    packageSelection,
    updateTentQuantity,
    updatePackageSelection,
    removePackageSelection,
    calculateRecommendedTents, // Vi kalder denne direkte
  } = useBookingStore();

  const { twoPerson, threePerson } = campingSelection.tents;

  // Vi bruger calculateRecommendedTents fra useBookingStore
  const recommendedTents = calculateRecommendedTents();
  const recommendedPackagePrice =
    recommendedTents.twoPerson * 799 + recommendedTents.threePerson * 999;

  const [useRecommended, setUseRecommended] = useState(packageSelection !== null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedArea, setSelectedArea] = useState("Vælg Område");
  const [areas, setAreas] = useState([]);
  const [areaCapacityError, setAreaCapacityError] = useState(false);

  // Fetch available camping areas
  useEffect(() => {
    async function fetchData() {
      const fetchedAreas = await getAllAreas();
      setAreas(fetchedAreas);
    }
    fetchData();
  }, []);

  // Reset error on area selection
  useEffect(() => {
    setAreaCapacityError(false);
  }, [selectedArea]);

  // Calculate total tents dynamically
  const totalTentsCount =
    (useRecommended ? recommendedTents.twoPerson + recommendedTents.threePerson : 0) +
    twoPerson +
    threePerson;

  // Check available spots in the selected area
  const availableSpots =
    selectedArea !== "Vælg Område"
      ? areas.find((area) => area.area === selectedArea)?.available || 0
      : 0;

  useEffect(() => {
    if (totalTentsCount <= availableSpots) {
      setAreaCapacityError(false);
    }
  }, [totalTentsCount, availableSpots]);

  const handleRecommendedPackageChange = (checked) => {
    setUseRecommended(checked);
    if (checked) {
      updatePackageSelection(recommendedTents);
      updateTentQuantity("twoPerson", 0); // Reset individual tents
      updateTentQuantity("threePerson", 0);
    } else {
      removePackageSelection();
    }
  };

  const handleTentQuantityChange = (tentType, newQuantity) => {
    updateTentQuantity(tentType, newQuantity);
  };

  const handleNextClick = () => {
    if (selectedArea === "Vælg Område") {
      setErrorMessage("Vælg et område for at fortsætte.");
      return;
    }
    if (totalTentsCount > availableSpots) {
      setAreaCapacityError(true);
      return;
    }
    if (!useRecommended && totalTentsCount === 0) {
      setErrorMessage("Vælg venligst telte eller pakkeløsning for at fortsætte.");
      return;
    }
    setErrorMessage("");
    setAreaCapacityError(false);
    onNext();
  };

  return (
    <main>
      <div className="px-4 max-w-5xl mx-auto mb-24">
        <h2 className="text-center text-5xl font-bold">Camping tilvalg</h2>
        <div className="flex">
        <div>
        

        {/* Area Selection */}
        <div className="mb-6">
          <label htmlFor="area-filter" className="block mb-2 font-semibold">
            Vælg Område:
          </label>
          <select
            id="area-filter"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
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
            <div className="mb-4">
              2-personers telt - 799,-
              <Counter
                quantity={twoPerson}
                onIncrement={() => handleTentQuantityChange("twoPerson", twoPerson + 1)}
                onDecrement={() => handleTentQuantityChange("twoPerson", twoPerson - 1)}
              />
            </div>
            <div className="mb-4">
              3-personers telt - 999,-
              <Counter
                quantity={threePerson}
                onIncrement={() => handleTentQuantityChange("threePerson", threePerson + 1)}
                onDecrement={() => handleTentQuantityChange("threePerson", threePerson - 1)}
              />
            </div>
          </div>
        )}

        {/* Fejlmeddelelse */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {areaCapacityError && selectedArea !== "Vælg Område" && (
          <p className="text-red-500">
            Det samlede antal telte overstiger de ledige pladser i det valgte område.
          </p>
        )}
        </div>

        {/* Basket */}
        <Basket selectedArea={selectedArea} />
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
