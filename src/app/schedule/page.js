"use client";

import { useEffect, useState } from "react";
import Schedule from "../components/Schedule";
import { getAllBands, getSchedule } from "../api/api";

export default function SchedulePage() {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("all");
  const [filterScene, setFilterScene] = useState("all");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBands = await getAllBands();
        const fetchedSchedule = await getSchedule();

        // Opdater bands med scenenavn
        const updatedBands = fetchedBands.map((band) => {
          // Find den første scene, hvor bandet spiller
          const scene = Object.keys(fetchedSchedule).find((sceneKey) => Object.values(fetchedSchedule[sceneKey]).some((day) => day.some((act) => act.act === band.name)));
          return { ...band, scene };
        });

        setBands(updatedBands);
        setSchedule(fetchedSchedule);

        console.log("Updated Bands:", updatedBands);
        console.log("Fetched Schedule:", fetchedSchedule);
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="bg-custom text-white min-h-screen px-8 py-12">
      <h1 className="font-gajraj text-6xl md:text-9xl">PROGRAM</h1>

      <header className="flex flex-wrap gap-4 mb-8">
        {/* Filtrer scene */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="scene-filter" className="block mb-2">
            Vælg scene:
          </label>
          <select id="scene-filter" value={filterScene} onChange={(e) => setFilterScene(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="all">Alle scener</option>
            {Object.keys(schedule).map((scene) => (
              <option key={scene} value={scene}>
                {scene}
              </option>
            ))}
          </select>
        </div>

        {/* Filtrer dag */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="day-filter" className="block mb-2">
            Vælg dag:
          </label>
          <select id="day-filter" value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="all">Alle dage</option>
            <option value="mon">Mandag</option>
            <option value="tue">Tirsdag</option>
            <option value="wed">Onsdag</option>
            <option value="thu">Torsdag</option>
            <option value="fri">Fredag</option>
            <option value="sat">Lørdag</option>
            <option value="sun">Søndag</option>
          </select>
        </div>
      </header>

      {/* Viser filtrerede bands */}
      <Schedule bands={bands} schedule={schedule} filterDay={filterDay} filterScene={filterScene} />
    </div>
  );
}
