"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllBands } from "../api/api.js";

export default function Schedule() {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});

  // State til filtre
  const [filterDay, setFilterDay] = useState("all");
  const [filterScene, setFilterScene] = useState("all");

  const [days, setDays] = useState([]);
  const [scenes, setScenes] = useState([]);

  const dayNames = {
    all: "Alle dage",
    mon: "Mandag",
    tue: "Tirsdag",
    wed: "Onsdag",
    thu: "Torsdag",
    fri: "Fredag",
    sat: "Lørdag",
    sun: "Søndag",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBands = await getAllBands();
        const response = await fetch("http://localhost:8080/schedule");
        const fetchedSchedule = await response.json();

        setBands(fetchedBands);
        setSchedule(fetchedSchedule);

        // Hent alle dage og scener og sæt schedule til "all" som default
        const scheduleDays = ["all", ...new Set(Object.values(fetchedSchedule).flatMap((stage) => Object.keys(stage)))];
        setDays(scheduleDays);

        const scheduleScenes = ["all", ...Object.keys(fetchedSchedule)];
        setScenes(scheduleScenes);

        console.log("Fetched Bands:", fetchedBands);
        console.log("Fetched Schedule:", fetchedSchedule);
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }
    }

    fetchData();
  }, []);

  // Filtreringslogik
  const filteredBands = bands.filter((band) => {
    if (!band.stage) return false;

    // Find den korrekte scene i schedule (case-insensitive)
    const stageKey = Object.keys(schedule).find((key) => key.toLowerCase() === band.stage.toLowerCase());
    if (!stageKey) return false;

    const bandSchedule = schedule[stageKey];
    if (!bandSchedule) return false;

    // Matcher scene-filteret
    const matchesScene = filterScene === "all" || stageKey.toLowerCase() === filterScene.toLowerCase();

    // Matcher dag-filteret
    const matchesDay =
      filterDay === "all" ||
      Object.entries(bandSchedule).some(([dayKey, acts]) => {
        const dayMatches = dayNames[filterDay]?.toLowerCase().startsWith(dayKey.toLowerCase());
        return dayMatches && acts.some((act) => act.act.toLowerCase() === band.name.toLowerCase() && !act.cancelled);
      });

    return matchesScene && matchesDay;
  });

  return (
    <div className="bg-gray-600 text-white min-h-screen px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">PROGRAM</h1>

      <header className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Filtrer scene */}
        <div className="w-full md:w-1/2">
          <label htmlFor="scene-filter" className="block mb-2">
            Vælg scene:
          </label>
          <select id="scene-filter" value={filterScene} onChange={(e) => setFilterScene(e.target.value)} className="w-full p-2 rounded text-black">
            {scenes.map((scene) => (
              <option key={scene} value={scene}>
                {scene === "all" ? "Alle scener" : scene}
              </option>
            ))}
          </select>
        </div>

        {/* Filtrer dag */}
        <div className="w-full md:w-1/2">
          <label htmlFor="day-filter" className="block mb-2">
            Vælg dag:
          </label>
          <select id="day-filter" value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="w-full p-2 rounded text-black">
            {days.map((day) => (
              <option key={day} value={day}>
                {dayNames[day]}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Viser filtrerede bands */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {filteredBands.length > 0 ? (
          filteredBands.map((band) => (
            <div key={band.id} className="p-4 rounded-lg shadow-lg bg-gray-800">
              <Image src={`/logos/${band.logo}`} width={250} height={250} alt={band.slug} className="w-full h-64 object-cover rounded-md" />
              <h2 className="text-2xl font-semibold mt-4">{band.name}</h2>
              <p className="mt-2">{band.description}</p>
              <Link href={`/artist/${band.slug}`}>
                <button className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg">More Info</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4 text-xl">Ingen bands fundet.</p>
        )}
      </div>
    </div>
  );
}
