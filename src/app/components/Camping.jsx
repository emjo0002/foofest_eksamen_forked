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
      <div className="px-4 max-w-6xl mx-auto mb-24">
              <div className="flex justify-center gap-8 m-10 flex-wrap lg:flex-nowrap">
                <div className="w-96 border border-white text-black text-center p-8 lg:w-full">
                  <div className="mb-4">
          {/* Dropdown-menu til valg af område */}
          <h2 className="font-gajraj text-5xl text-white">Tilvalg</h2>
          <p className="font-genos text-xl text-white p-6">Bemærk: Prisen inkluderer opsætning af dit telt af vores team</p>
    <label htmlFor="area-filter" className="mb-2 font-extrabold font-genos text-3xl text-white flex flex-col">
            Campingområde:
          </label>
          <select
          id="area-filter"
          value={campingSelection.area || "Vælg Område"}
          onChange={(e) => handleAreaChange(e.target.value)}
          className="bg-white p-2 rounded-3xl border-none font-genos text-center appearance-none mt-3">
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
          <h3 className="font-extrabold font-genos text-3xl text-white mb-2">Anbefalet pakkeløsning</h3>
          <div className="flex items-center justify-between font-genos text-2xl text-white mt-3">
            <label htmlFor="recommendedPackage">
              {recommendedTents.twoPerson > 0 && `${recommendedTents.twoPerson} x 2-personers telt`}
              {recommendedTents.twoPerson > 0 && recommendedTents.threePerson > 0 && " og "}
              {recommendedTents.threePerson > 0 && `${recommendedTents.threePerson} x 3-personers telt`}
              {` - ${recommendedPackagePrice},-`}
            </label>
            <input
            type="checkbox"
            id="recommendedPackage"
            checked={useRecommended}
            onChange={(e) => handleRecommendedPackageChange(e.target.checked)}
            className="appearance-none w-5 h-5 border border-white checked:border-white relative 
             checked:after:content-['✔'] checked:after:absolute checked:after:top-[-6px] checked:after:left-[3px] checked:after:text-white"
 />
          </div>
        </div>

        {/* Individuelle telte */}
        {!useRecommended && (
          <div>
            <h3 className="font-extrabold font-genos text-3xl text-white mb-2">Sammensæt din egen pakkeløsning</h3>
            <div className="flex justify-between font-genos text-2xl font-black text-white">
              <h4>Tilvalg</h4>
              <h4>Pris</h4>
              <h4>Antal</h4>
              </div>
            <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-2xl mt-3">
              <p>2-personers telt</p> 
              <p>799,-</p>
              <Counter
                quantity={twoPerson}
                onIncrement={() => handleTentQuantityChange("twoPerson", twoPerson + 1)}
                onDecrement={() => handleTentQuantityChange("twoPerson", twoPerson - 1)}
                disableIncrement={disableIncrement}
              />
            </div>
            <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-2xl mt-3">
              <p>3-personers telt</p> 
              <p>999,-</p>
              <Counter
                quantity={threePerson}
                onIncrement={() => handleTentQuantityChange("threePerson", threePerson + 1)}
                onDecrement={() => handleTentQuantityChange("threePerson", threePerson - 1)}
                disableIncrement={disableIncrement}
              />
            </div>
           <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-2xl mt-3">
              <p>Eget telt med </p> 
              <p>GRATS</p>
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
      <div className="flex items-center justify-between font-genos text-2xl text-white mt-3">
        <label htmlFor="greenCamping" className="text-white">
          Green Camping
        </label>
        <input
          type="checkbox"
          id="greenCamping"
          checked={greenCamping}
          onChange={toggleGreenCamping}
          className="appearance-none w-5 h-5 border border-white checked:border-white relative 
             checked:after:content-['✔'] checked:after:absolute checked:after:top-[-6px] checked:after:left-[3px] checked:after:text-white"
        />
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
          <button onClick={onBack} className="font-gajraj mt-4 px-4 py-2 text-5xl text-white">
            Tilbage
          </button>
          <button onClick={handleNextClick} className="font-gajraj mt-4 px-4 py-2 text-5xl text-white">
            Reserver
          </button>
        </div>
      </div>
    </main>
  );
}
