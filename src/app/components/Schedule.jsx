import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getAllBands, getSchedule } from "../api/api";
import useBookingStore from "../globalkurv/useBookingStore";

const Schedule = () => {
  const [bands, setBands] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [filterDay, setFilterDay] = useState("all");
  const [filterScene, setFilterScene] = useState("all");

  // FAVORIT FUNKTIONER HENTES FRA ZUSTAND
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
      removeFavorite(band.slug); // Fjern bandet fra favoritter
    } else {
      addFavorite(band); // Tilføj bandet til favoritter
    }
  };

  return (
    <div className="container mx-auto px-4 min-w-[320px]">
      {/* Filter-indstillinger */}
      <header className="flex flex-wrap gap-4 mb-8">
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
        <div className="w-full sm:w-1/2 md:w-1/4">
          <label htmlFor="day-filter" className="block mb-2"></label>
          <select id="day-filter" value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="w-full p-2 rounded text-black">
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
      </header>

      {/* Band-listen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBands.map((band) => {
          const isFavorited = favorites.some((fav) => fav.slug === band.slug);

          return (
            <div key={band.id || `${band.name}-${band.scene}`} className="p-4 border-2 rounded shadow hover:bg-opacity-10 transition-all relative">
              <Image src={band.logo?.startsWith("http") ? band.logo : `/logos/${band.logo}`} width={275} height={250} alt={band.slug || band.name} className="w-full max-w-[200px] h-48 object-cover mb-4 rounded mx-auto" />
              <h3 className="text-2xl font-semibold">{band.name}</h3>
              <p className="text-gray-300">Scene: {band.scene}</p>
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
