"use client";

import { useEffect, useState } from "react";
import Schedule from "../components/Schedule";
import { getAllBands, getSchedule } from "../api/api";
import Footer from "../components/Footer";
import { IoIosArrowRoundBack } from "react-icons/io";

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

        // OPDATERER BAND MED SCENE
        const updatedBands = fetchedBands.map((band) => {
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
    <div className="relative dynamic-bg text-white h-auto px-8 py-12">
      <h1 className="font-gajraj text-6xl md:text-9xl">PROGRAM</h1>
      <a href="/" className="block mb-4 text-5xl font-bold">
        <IoIosArrowRoundBack />
      </a>

      <header className="flex flex-wrap gap-4 mb-8">
        {/* FILTRERER SCENE */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="scene-filter" className="block mb-2"></label>
          <select id="scene-filter" value={filterScene} onChange={(e) => setFilterScene(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="all">Alle stages</option>
            {Object.keys(schedule).map((scene) => (
              <option key={scene} value={scene}>
                {scene}
              </option>
            ))}
          </select>
        </div>

        {/* FILTRERER SCENE */}
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="day-filter" className="block mb-2"></label>
          <select id="day-filter" value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="w-full p-2 rounded text-black">
            <option value="all">All days</option>
            <option value="mon">Monday</option>
            <option value="tue">Thursday</option>
            <option value="wed">Wensday</option>
            <option value="thu">Thursday</option>
            <option value="fri">Friday</option>
            <option value="sat">Saturday</option>
            <option value="sun">Sunday</option>
          </select>
        </div>
      </header>

      <Schedule bands={bands} schedule={schedule} filterDay={filterDay} filterScene={filterScene} />
    </div>
  );
}
