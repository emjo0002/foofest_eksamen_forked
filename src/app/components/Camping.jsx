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
    totalTickets 
  } = useBookingStore();

  const { twoPerson, threePerson, ownTent, greenCamping } = campingSelection.tents;
  const recommendedTents = calculateRecommendedTents();
  const recommendedPackagePrice = recommendedTents.twoPerson * 799 + recommendedTents.threePerson * 999;
  const [useRecommended, setUseRecommended] = useState(packageSelection !== null);
  const [errorMessage, setErrorMessage] = useState("");
  const [areas, setAreas] = useState([]);
  const [areaCapacityError, setAreaCapacityError] = useState(false);
  const totalTents = twoPerson + threePerson + ownTent;
  const disableIncrement = totalTents >= totalTickets();

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
    // Opdater til den anbefalede løsning
    updateTents({
      twoPerson: recommendedTents.twoPerson,
      threePerson: recommendedTents.threePerson,
      ownTent: 0, // Nulstil eget telt
    });
    useBookingStore.setState({ packageSelection: recommendedTents }); // Opdater packageSelection
  } else {
    // Nulstil alle telte, når den anbefalede løsning fjernes
    updateTents({ twoPerson: 0, threePerson: 0, ownTent: 0 });
    removePackageSelection(); // Fjern packageSelection
  }
};

  const handleTentQuantityChange = (tentType, newQuantity) => {
    setErrorMessage(""); // Fjern fejlmeddelelsen
    updateTents({ ...campingSelection.tents, [tentType]: Math.max(0, newQuantity) });
  };

  const handleAreaChange = (area) => {
  setErrorMessage(""); // Nulstil fejlmeddelelse
  updateCampingArea(area); // Gem det valgte område i store
};

  const handleNextClick = () => {
    const errors = []; // Array til at samle fejl
    const totalTentsCount = useRecommended ? recommendedTents.twoPerson + recommendedTents.threePerson : twoPerson + threePerson + ownTent;

    const availableSpots = (campingSelection.area && areas.find((area) => area.area === campingSelection.area)?.available) || 0;

    // Fejl: Intet område valgt
    if (!campingSelection.area || campingSelection.area === "Vælg Område") {
      errors.push("Vælg venligst et område for at fortsætte.");
    }

    // Fejl: Telte overstiger kapaciteten - tjek kun, hvis et område er valgt
    if (campingSelection.area && campingSelection.area !== "Vælg Område" && totalTentsCount > availableSpots) {
      errors.push("Det samlede antal telte overstiger de ledige pladser i det valgte område.");
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
      <div className="max-w-6xl mx-auto pb-5">
        <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap">
          <div className="border border-white text-black text-center lg:w-full p-8">
            <div className="mb-4">
              {/* Dropdown-menu til valg af område */}
              <h2 className="font-gajraj text-5xl text-white">Tilvalg</h2>
              <p className="font-genos text-xl text-white p-6">Bemærk: Prisen inkluderer opsætning af dit telt af vores team</p>
              <label htmlFor="area-filter" className="mb-2 font-extrabold font-genos text-3xl text-white flex flex-col">
                Campingområde:
              </label>
              <select id="area-filter" value={campingSelection.area || "Vælg område"} onChange={(e) => handleAreaChange(e.target.value)} className="bg-white p-2 rounded-3xl border-none font-genos text-center appearance-none mt-3">
                <option value="Vælg Område">Vælg område</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.area}>
                    {area.area} (Ledige pladser: {area.available})
                  </option>
                ))}
              </select>
            </div>

            {/* Individuelle telte */}
            {!useRecommended && (
              <div>
                <h3 className="font-extrabold font-genos text-3xl text-white mb-2">Sammensæt din egen pakkeløsning</h3>
                <div className="flex justify-between font-genos text-2xl font-black text-white">
                  <h4>Tilvalg</h4>
                  <h4>Pris</h4>
                  <h4 className="pr-5">Antal</h4>
                </div>
                <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-2xl mt-3">
                  <p>2-pers telt</p>
                  <p className="pr-3">799,-</p>
                  <Counter quantity={twoPerson} onIncrement={() => handleTentQuantityChange("twoPerson", twoPerson + 1)} onDecrement={() => handleTentQuantityChange("twoPerson", twoPerson - 1)} disableIncrement={disableIncrement} />
                </div>
                <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-2xl mt-3">
                  <p>3-pers telt</p>
                  <p className="pr-3">999,-</p>
                  <Counter quantity={threePerson} onIncrement={() => handleTentQuantityChange("threePerson", threePerson + 1)} onDecrement={() => handleTentQuantityChange("threePerson", threePerson - 1)} disableIncrement={disableIncrement} />
                </div>
                <div className="flex items-center mb-4 justify-between text-white font-genos font-extralight text-2xl mt-3">
                  <p>Eget telt med </p>
                  <p className="pr-10">GRATS</p>
                  <Counter quantity={ownTent} onIncrement={() => handleTentQuantityChange("ownTent", ownTent + 1)} onDecrement={() => handleTentQuantityChange("ownTent", ownTent - 1)} disableIncrement={disableIncrement} />
                </div>
              </div>
            )}

            {/* Anbefalet pakkeløsning */}
            <div className="mb-4">
              <h3 className="font-extrabold font-genos text-3xl text-white mb-2">Anbefalet pakkeløsning</h3>
              <div className="flex items-end justify-between font-genos text-2xl text-white mt-3">
                <label htmlFor="recommendedPackage" className="flex items-end">
                  <div>
                    {recommendedTents.twoPerson > 0 && (
                      <span className="block">{recommendedTents.twoPerson} x 2-personers telt</span>
                    )}
                    {recommendedTents.threePerson > 0 && (
                      <span className="block">{recommendedTents.threePerson} x 3-personers telt</span>
                    )}
                  </div>
                  <span className="pl-6">Pris {recommendedPackagePrice},-</span>
                </label>

                <div className="flex">
                  <input
                    type="checkbox"
                    id="recommendedPackage"
                    checked={useRecommended}
                    onChange={(e) => handleRecommendedPackageChange(e.target.checked)}
                    className="items-end appearance-none w-5 h-5 border border-white checked:border-white relative 
                  checked:after:content-['✔'] checked:after:absolute checked:after:top-[-6px] checked:after:left-[3px] checked:after:text-white"
                  />
                </div>
              </div>
            </div>

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
            {errorMessage && <p className="font-genos text-2xl text-red-500">{errorMessage}</p>}
            {areaCapacityError && campingSelection !== "Vælg Område" && <p className="font-genos text-2xl text-red-500">Det samlede antal telte overstiger de ledige pladser i det valgte område.</p>}
          </div>

          {/* Basket */}
          <Basket selectedArea={campingSelection.area} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="font-gajraj px-4 py-2 text-3xl text-white lg:text-5xl">
            Tilbage
          </button>
          <button onClick={handleNextClick} className="font-gajraj px-4 py-2 text-3xl text-white lg:text-5xl">
            Reserver
          </button>
        </div>
      </div>
    </main>
  );
}