"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getAllBands, getSchedule } from "../api/api";
import useBookingStore from "../globalkurv/useBookingStore";

const Schedule = () => {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("all");
  const [filterScene, setFilterScene] = useState("all");

  // Favorit- og Zustand-logik
  const addFavorite = useBookingStore((state) => state.addFavorite);
  const removeFavorite = useBookingStore((state) => state.removeFavorite);
  const favorites = useBookingStore((state) => state.favorites);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBands = await getAllBands();
        const fetchedSchedule = await getSchedule();

        const updatedBands = fetchedBands.map((band) => {
          const scene = Object.keys(fetchedSchedule).find((sceneKey) => Object.values(fetchedSchedule[sceneKey]).some((day) => day.some((act) => act.act === band.name)));
          return { ...band, scene };
        });

        setBands(updatedBands);
        setSchedule(fetchedSchedule);
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }
    }

    fetchData();
  }, []);

  const filteredBands = bands.filter((band) => {
    if (!band.scene) return false;

    const matchesScene = filterScene === "all" || band.scene === filterScene;

    const stageSchedule = schedule[band.scene];
    if (!stageSchedule) return false;

    const matchesDay = filterDay === "all" || Object.keys(stageSchedule).some((dayKey) => dayKey === filterDay && stageSchedule[dayKey].some((act) => act.act.toLowerCase() === band.name.toLowerCase()));

    return matchesScene && matchesDay;
  });

  const toggleFavorite = (band) => {
    const isFavorited = favorites.some((fav) => fav.slug === band.slug);

    if (isFavorited) {
      removeFavorite(band.slug);
    } else {
      addFavorite(band);
    }
  };

  const getTimeForBand = (band) => {
    const stageSchedule = schedule[band.scene];
    if (!stageSchedule) return null;

    for (const [day, acts] of Object.entries(stageSchedule)) {
      for (const act of acts) {
        if (act.act === band.name) {
          return { start: act.start, end: act.end };
        }
      }
    }
    return null;
  };

  return (
    <div className="relative dynamic-bg text-white min-h-screen px-8 py-12 bg-cover bg-center pt-19">
      <div className="flex items-center justify-between mb-8">
        <a href="/" className="text-5xl font-bold flex items-center">
          <IoIosArrowRoundBack />
        </a>
        <div className="flex items-center space-x-4">
          <select id="scene-filter" value={filterScene} onChange={(e) => setFilterScene(e.target.value)} className="bg-white text-black px-6 py-2 rounded-lg">
            <option value="all">All stages</option>
            {Object.keys(schedule).map((scene) => (
              <option key={scene} value={scene}>
                {scene}
              </option>
            ))}
          </select>
          <select id="day-filter" value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="bg-white text-black px-6 py-2 rounded-lg">
            <option value="all">All days</option>
            <option value="mon">Monday</option>
            <option value="tue">Tuesday</option>
            <option value="wed">Wednesday</option>
            <option value="thu">Thursday</option>
            <option value="fri">Friday</option>
            <option value="sat">Saturday</option>
            <option value="sun">Sunday</option>
          </select>
        </div>
      </div>

      {/* Band-listen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBands.map((band) => {
          const isFavorited = favorites.some((fav) => fav.slug === band.slug);
          const time = getTimeForBand(band);

          return (
            <div key={band.id || `${band.name}-${band.scene}`} className="p-4 border-2 rounded shadow hover:bg-opacity-10 transition-all relative">
              <Image src={band.logo?.startsWith("http") ? band.logo : `/logos/${band.logo}`} width={275} height={250} alt={band.slug || band.name} className="w-full max-w-[200px] h-48 object-cover mb-4 rounded mx-auto" />
              <h3 className="text-2xl font-semibold">{band.name}</h3>
              <p className="text-gray-300">Scene: {band.scene}</p>
              {time && (
                <p className="text-gray-400">
                  Time: {time.start} - {time.end}
                </p>
              )}
              <Link href={`/program/${band.slug}`}>
                <button className="mt-4 px-4 py-2 bg-zinc-300 text-black rounded hover:bg-blue-700 hover:text-white">Read more</button>
              </Link>

              {/* Favorit-knap */}
              <button onClick={() => toggleFavorite(band)} className="absolute bottom-2 right-2 text-2xl" aria-label="Toggle favorite">
                {isFavorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
