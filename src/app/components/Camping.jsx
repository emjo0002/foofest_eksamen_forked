import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import Basket from "./Basket";
import { getAllAreas } from "../api/api";
import { useState, useEffect } from "react";

export default function Camping({ onNext, onBack }) {
  const { campingSelection, packageSelection, updateTents, removePackageSelection, toggleGreenCamping, calculateRecommendedTents, updateCampingArea, totalTickets } = useBookingStore();

  const { twoPerson, threePerson, ownTent, greenCamping } = campingSelection.tents;
  const recommendedTents = calculateRecommendedTents();
  const recommendedPackagePrice = recommendedTents.twoPerson * 799 + recommendedTents.threePerson * 999;
  const [useRecommended, setUseRecommended] = useState(packageSelection !== null);
  const [errorMessage, setErrorMessage] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaCapacityError, setAreaCapacityError] = useState(false);
  const totalTents = twoPerson + threePerson + ownTent;
  const disableIncrement = totalTents >= totalTickets();

  // HENT ALLE CAMPINGOMRÅDER
  useEffect(() => {
    async function fetchData() {
      const fetchedAreas = await getAllAreas();
      setAreas(fetchedAreas);
    }
    fetchData();
  }, []);

  const handleRecommendedPackageChange = (checked) => {
    setUseRecommended(checked);
    setErrorMessage("");
    if (checked) {
      // OPDATER TIL DEN ANBEFALEDE LØSNING
      updateTents({
        twoPerson: recommendedTents.twoPerson,
        threePerson: recommendedTents.threePerson,
        ownTent: 0, // NULSTILLER EGET TELT
      });
      useBookingStore.setState({ packageSelection: recommendedTents });
    } else {
      //NULSTIL ALLE TELTE, NÅR DEN ANBEFALEDE LØSNING FJERNES
      updateTents({ twoPerson: 0, threePerson: 0, ownTent: 0 });
      removePackageSelection();
    }
  };

  const handleTentQuantityChange = (tentType, newQuantity) => {
    setErrorMessage("");
    updateTents({ ...campingSelection.tents, [tentType]: Math.max(0, newQuantity) });
  };

  const handleAreaChange = (area) => {
  setErrorMessage(""); // Reset fejlmeddelelse
  if (area !== campingSelection.area) {
    updateCampingArea(area); // Opdater kun, hvis området ændres
  }
};

  const handleNextClick = () => {
    const errors = [];
    const totalTentsCount = useRecommended ? recommendedTents.twoPerson + recommendedTents.threePerson : twoPerson + threePerson + ownTent;

    const availableSpots = (campingSelection.area && areas.find((area) => area.area === campingSelection.area)?.available) || 0;

    // FEJL
    if (!campingSelection.area || campingSelection.area === "Choose area") {
      errors.push("Please select a region to continue.");
    }

    // FEJL
    if (campingSelection.area && campingSelection.area !== "Choose area" && totalTentsCount > availableSpots) {
      errors.push("The total number of tents exceeds the available spaces in the selected area.");
    }

    // FEJL HVIS INGEN PAKKELØSNING ER VALGT
    if (!useRecommended && totalTentsCount === 0) {
      errors.push("Please select a tent and a region to continue.");
    }

    // HVIS DER ER FEJL, VISES ALLE FEJL PÅ SIDEN
    if (errors.length > 0) {
      setErrorMessage(errors.join(" "));
      return;
    }

    setErrorMessage("");
    setAreaCapacityError(false);
    onNext();
  };

  return (
    <main>
      <div className="max-w-6xl mx-auto pb-5">
        <div className="flex justify-center gap-6 mt-6 mr-10 ml-10 mb-2 flex-wrap lg:flex-nowrap lg:min-h-[36rem]">
          <div className="border border-white text-black text-center lg:w-full p-8">
            <div className="mb-3">
              {/* DROPDOWN */}
              <h2 className="font-gajraj text-5xl text-white mb-3">Optional</h2>
              <label htmlFor="area-filter" className="mb-1 font-extrabold font-genos text-2xl text-white flex flex-col">
                Camping area:
              </label>
              <select id={areas.id} value={campingSelection.area || "Choose area"} onChange={(e) => handleAreaChange(e.target.value)} className="bg-white p-2 rounded-3xl border-none font-genos text-center appearance-none mt-1">
                <option value="Choose area">Choose area</option>
                {areas.map((area, index) => (
                <option key={area.id || `area-${index}`} value={area.area}>
                  {area.area} (Available spots: {area.available})
                  </option>
                ))}
              </select>
            </div>

            {/* INDIVIDUELLE TELTE */}
            {!useRecommended && (
              <div>
                <h3 className="font-extrabold font-genos text-2xl text-white mb-2">Mix your own package solution</h3>
                <div className="flex justify-between font-genos text-xl font-black text-white">
                  <h4>Options</h4>
                  <h4>Price</h4>
                  <h4 className="pr-1">Amount</h4>
                </div>
                <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-xl mt-3">
                  <p>2-persons tent</p>
                  <p className="pr-11">799,-</p>
                  <Counter quantity={twoPerson} onIncrement={() => handleTentQuantityChange("twoPerson", twoPerson + 1)} onDecrement={() => handleTentQuantityChange("twoPerson", twoPerson - 1)} disableIncrement={disableIncrement} />
                </div>
                <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-xl mt-3">
                  <p>3-persons tent</p>
                  <p className="pr-11">999,-</p>
                  <Counter quantity={threePerson} onIncrement={() => handleTentQuantityChange("threePerson", threePerson + 1)} onDecrement={() => handleTentQuantityChange("threePerson", threePerson - 1)} disableIncrement={disableIncrement} />
                </div>
                <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-xl mt-3">
                  <p>Your own tent </p>
                  <p className="pr-11">FREE</p>
                  <Counter quantity={ownTent} onIncrement={() => handleTentQuantityChange("ownTent", ownTent + 1)} onDecrement={() => handleTentQuantityChange("ownTent", ownTent - 1)} disableIncrement={disableIncrement} />
                </div>
              </div>
            )}
            

            {/* ANBEFALET PAKKELØSNING */}
            <div className="mb-4">
              <h3 className="font-extrabold font-genos text-2xl text-white mb-2">Recommended Package</h3>
              <div className="flex items-end justify-between font-genos text-xl text-white mt-3">
                <label htmlFor="recommendedPackage" className="flex items-end">
                  <div>
                    {recommendedTents.twoPerson > 0 && <span className="block">{recommendedTents.twoPerson} x 2-personers telt</span>}
                    {recommendedTents.threePerson > 0 && <span className="block">{recommendedTents.threePerson} x 3-personers telt</span>}
                  </div>
                  <span className="pl-6">Price {recommendedPackagePrice},-</span>
                </label>

                <div className="flex">
                  <input
                    type="checkbox"
                    id="recommendedPackage"
                    checked={useRecommended}
                    onChange={(e) => handleRecommendedPackageChange(e.target.checked)}
                    className="items-end appearance-none w-4 h-4 border border-white checked:border-white relative 
                  checked:after:content-['✔'] checked:after:absolute checked:after:top-[-6px] checked:after:left-[3px] checked:after:text-white"
                  />
                </div>
              </div>
            </div>

            {/* CHECKBOX TIL GREENCAMPING */}
            <div className="flex items-center justify-between font-genos text-xl text-white mt-3">
              <label htmlFor="greenCamping" className="text-white">
                Green Camping
              </label>
              <input
                type="checkbox"
                id="greenCamping"
                checked={greenCamping}
                onChange={toggleGreenCamping}
                className="appearance-none w-4 h-4 border border-white checked:border-white relative 
             checked:after:content-['✔'] checked:after:absolute checked:after:top-[-6px] checked:after:left-[3px] checked:after:text-white"
              />
            </div>

            
          </div>

          <Basket selectedArea={campingSelection.area} />
        </div>

        <div className="flex justify-between">
          <button onClick={onBack} className="font-gajraj px-4 py-2 text-3xl text-white lg:text-4xl">
            Back
          </button>
            {/* FEJLMEDDELSE*/}
            {errorMessage && <p className="font-genos text-2xl text-red-500 text-center lg:px-20">{errorMessage}</p>}
            {areaCapacityError && campingSelection !== "Choose area" && <p className="font-genos text-2xl text-red-500">The total number of tents exceeds the available spaces in the selected area.</p>}
          <button onClick={handleNextClick} className="font-gajraj px-4 py-2 text-3xl text-white lg:text-4xl">
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
