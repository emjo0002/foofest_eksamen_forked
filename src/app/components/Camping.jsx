import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import { useState, useEffect } from "react";

export default function Camping({ onNext, onBack }) {
  const {
    campingSelection,
    packageSelection,
    updateTentQuantity,
    updatePackageSelection,
    removePackageSelection,
    calculateRecommendedTents,
    totalTickets,
    totalTents,
  } = useBookingStore();
  const { twoPerson, threePerson } = campingSelection.tents;
  const recommendedTents = calculateRecommendedTents();
  const recommendedPackagePrice =
    recommendedTents.twoPerson * 799 + recommendedTents.threePerson * 999;

  const [useRecommended, setUseRecommended] = useState(packageSelection !== null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRecommendedPackageChange = (checked) => {
    setUseRecommended(checked);
    if (checked) {
      updatePackageSelection(recommendedTents);
    } else {
      removePackageSelection();
    }
  };

  const handleTentQuantityChange = (tentType, newQuantity) => {
    updateTentQuantity(tentType, newQuantity);
  };

  const canProceed = useRecommended || totalTents > 0;

  const handleNextClick = () => {
    if (!canProceed) {
      setErrorMessage("Vælg venligst en pakkeløsning eller sammensæt dine egne telte.");
      return;
    }
    setErrorMessage("");
    onNext();
  };

  return (
    <main>
      <div className="px-4 max-w-5xl mx-auto mb-24">
        <h2 className="text-center text-5xl font-bold">Camping tilvalg</h2>

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

        {/* Navigation */}
        <button onClick={onBack} className="mr-4 px-4 py-2 bg-gray-300 rounded">
          Tilbage
        </button>
        <button
          onClick={handleNextClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reserver
        </button>
      </div>
    </main>
  );
}
