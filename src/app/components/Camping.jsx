import useBookingStore from "../globalkurv/useBookingStore";
import Counter from "./Counter";
import Basket from "./Basket";
import { getAllAreas } from "../api/api";
import { useState, useEffect } from "react";

export default function Camping({ onNext, onBack }) {
  const [areas, setAreas] = useState([]); // Liste af områder hentet fra databasen
  const [selectedArea, setSelectedArea] = useState("Vælg Område"); // Standard områdevalg
  const {
    tickets,
    campingSelection,
    packageSelection,
    updateTentQuantity,
    toggleGreenCamping,
    updatePackageSelection,
    removePackageSelection,
  } = useBookingStore();
  const { twoPerson, threePerson } = campingSelection.tents;
  const { greenCamping } = campingSelection;
  const [useRecommended, setUseRecommended] = useState(false); // Tilstand for pakkeløsning
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false); // Om brugeren har forsøgt at klikke på Next
  const [errorMessage, setErrorMessage] = useState(""); // Fejlmeddelelse
  const [areaCapacityError, setAreaCapacityError] = useState(false); // Fejl for ledige pladser

  // Beregn det samlede antal valgte billetter
  const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  useEffect(() => {
    async function fetchData() {
      const fetchedAreas = await getAllAreas();
      setAreas(fetchedAreas);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Sørg for at sætte `useRecommended` til true, hvis en pakkeløsning allerede er valgt
    if (packageSelection) {
      setUseRecommended(true);
    }
  }, [packageSelection]);

  useEffect(() => {
    // Fjern kapacitetsfejlen, når et nyt område vælges
    setAreaCapacityError(false);
  }, [selectedArea]);

  // Dynamisk opdatering af fejlmeddelelse
  useEffect(() => {
    if (hasAttemptedNext) {
      if (!useRecommended && selectedArea === "Vælg Område") {
        setErrorMessage("Vælg en pakkeløsning og et område for at fortsætte.");
      } else if (!useRecommended) {
        setErrorMessage("Vælg en pakkeløsning for at fortsætte.");
      } else if (selectedArea === "Vælg Område") {
        setErrorMessage("Vælg et område for at fortsætte.");
      } else {
        setErrorMessage(""); // Ryd fejlmeddelelsen, hvis alt er opfyldt
      }
    }
  }, [useRecommended, selectedArea, hasAttemptedNext]);

  // Anbefalede telte baseret på antal billetter
  const calculateRecommendedTents = () => {
    let remainingTickets = totalTickets;
    const recommendedTents = { twoPerson: 0, threePerson: 0 };

    // Start med at fylde med 3-personers telte
    if (remainingTickets >= 3) {
      recommendedTents.threePerson = Math.floor(remainingTickets / 3);
      remainingTickets %= 3;
    }

    // Hvis der er 2 eller færre billetter tilbage, brug 2-personers telte
    if (remainingTickets > 0) {
      recommendedTents.twoPerson = Math.ceil(remainingTickets / 2);
      remainingTickets = 0; // Alle billetter er fordelt
    }

    // Særligt tilfælde: Hvis der er præcis 4 billetter, vælg 2x 2-personers telte
    if (totalTickets === 4) {
      recommendedTents.twoPerson = 2;
      recommendedTents.threePerson = 0;
    }

    return recommendedTents;
  };

  const recommendedTents = calculateRecommendedTents();

  // Beregn samlet pris for pakkeløsning
  const recommendedPackagePrice =
    recommendedTents.twoPerson * 799 + recommendedTents.threePerson * 999;

  // Beregn samlet antal telte
  const totalTents =
    (useRecommended ? recommendedTents.twoPerson + recommendedTents.threePerson : 0) +
    twoPerson +
    threePerson;

  // Beregn ledige pladser i det valgte område
  const availableSpots =
    selectedArea !== "Vælg Område"
      ? areas.find((area) => area.area === selectedArea)?.available || 0
      : 0;

  // Overvåg ændringer i totalTents og fjern kapacitetsfejl, hvis de opfylder betingelserne
  useEffect(() => {
    if (totalTents <= availableSpots) {
      setAreaCapacityError(false);
    }
  }, [totalTents, availableSpots]);

  // Handler for checkboxen for pakkeløsning
  const handleRecommendedPackageChange = (checked) => {
    setUseRecommended(checked);
    if (checked) {
      // Tilføj pakkeløsning til kurven
      updatePackageSelection({
        twoPerson: recommendedTents.twoPerson,
        threePerson: recommendedTents.threePerson,
      });
    } else {
      // Fjern pakkeløsningen og nulstil de individuelt valgte telte
      removePackageSelection();
      updateTentQuantity("twoPerson", 0); // Nulstil 2-personers telte
      updateTentQuantity("threePerson", 0); // Nulstil 3-personers telte
    }
  };

  // Handler til teltantal
  const handleTentQuantityChange = (tentType, newQuantity) => {
    updateTentQuantity(tentType, newQuantity);
  };

  // Kontrollér, om brugeren kan gå videre
  const canProceed =
    useRecommended && selectedArea !== "Vælg Område" && totalTents <= availableSpots;

  const handleNextClick = () => {
    setHasAttemptedNext(true); // Marker, at brugeren har forsøgt at klikke på Next
    if (selectedArea === "Vælg Område") {
      setErrorMessage("Vælg et område for at fortsætte.");
      return;
    }
    if (totalTents > availableSpots) {
      setAreaCapacityError(true); // Sæt kapacitetsfejl, hvis der ikke er plads nok
      return;
    }
    if (!canProceed) {
      return; // Stop, hvis betingelserne ikke er opfyldt
    }
    setAreaCapacityError(false); // Fjern kapacitetsfejl
    onNext(); // Fortsæt, hvis alt er korrekt
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
        <label htmlFor="area-filter" className="mr-4 text-lg font-semibold">
          Vælg Område:
        </label>
        <select
          id="area-filter"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="bg-red text-black px-6 py-2 rounded-lg"
        >
          <option value="Vælg Område">Vælg Område</option>
          {areas.map((area) => (
            <option key={area.id} value={area.area}>
              {area.area} (Ledige pladser: {area.available})
            </option>
          ))}
        </select>
      </div>
      

      <div className="mb-4">
        <h2 className="font-semibold text-lg mb-2">Anbefalet pakkeløsning</h2>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="recommendedPackage"
            checked={useRecommended}
            onChange={(e) => handleRecommendedPackageChange(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="recommendedPackage" className="text-black">
            {recommendedTents.twoPerson > 0 && `${recommendedTents.twoPerson} x 2-personers telt`}
            {recommendedTents.twoPerson > 0 && recommendedTents.threePerson > 0 && " og "}
            {recommendedTents.threePerson > 0 && `${recommendedTents.threePerson} x 3-personers telt`}
            {` - ${recommendedPackagePrice},-`}
          </label>
        </div>
      </div>

      {/* Individuelle telte */}
        <>
          <div className="mb-4">
            <h2 className="font-semibold text-lg mb-2">Sammensæt din egen pakkeløsning</h2>
            <div className="flex">
              2-personers telt - 799,-
              <Counter
                initialQuantity={twoPerson}
                onChange={(newQuantity) => handleTentQuantityChange("twoPerson", newQuantity)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex">
              3-personers telt - 999,-
              <Counter
                initialQuantity={threePerson}
                onChange={(newQuantity) => handleTentQuantityChange("threePerson", newQuantity)}
              />
            </div>
          </div>
        </>
      

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
      {hasAttemptedNext && errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {areaCapacityError && selectedArea !== "Vælg Område" && (
        <p className="text-red-500 mt-2">
          Det samlede antal telte overstiger de ledige pladser i det valgte område.
        </p>
      )}
      </div>
      <Basket selectedArea={selectedArea} />
      </div>
      </div>

      <button onClick={onBack} className="mt-4">
        Tilbage
      </button>

      <button
        onClick={handleNextClick}
        className="mt-4 px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
      >
        Next
      </button>

      
    </main>
  );
}
