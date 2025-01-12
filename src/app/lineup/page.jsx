"use client";

import { useEffect, useState } from "react";
import BandCarousel from "../../components/ui/BandCarousel";
import { getAllBands, getSchedule } from "../api/api";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function LineupPage() {
  const [bands, setBands] = useState([]);
  const [filteredBands, setFilteredBands] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedBands = await getAllBands();
        const fetchedSchedule = await getSchedule();

        const updatedBands = fetchedBands.map((band) => {
          let scene = null;
          let start = null;
          let end = null;

          Object.keys(fetchedSchedule).forEach((sceneKey) => {
            Object.values(fetchedSchedule[sceneKey]).forEach((day) => {
              day.forEach((act) => {
                if (act.act === band.name) {
                  scene = sceneKey;
                  start = act.start;
                  end = act.end;
                }
              });
            });
          });

          const slug = band.slug || band.name.toLowerCase().replace(/ /g, "-");

          return { ...band, scene, start, end, slug };
        });

        setBands(updatedBands);
        setFilteredBands(updatedBands);
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = bands;

    if (selectedGenre !== "All") {
      filtered = filtered.filter((band) => band.genre === selectedGenre);
    }

    if (searchQuery) {
      filtered = filtered.filter((band) => band.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredBands(filtered);
  }, [bands, selectedGenre, searchQuery]);

  const genres = ["Choose genre", ...new Set(bands.map((band) => band.genre))];

  return (
    <div className="relative dynamic-bg text-white min-h-screen px-8 py-12 bg-cover bg-center pt-19">
      <h1 className="text-8xl font-gajraj font-bold mb-8">LINE-UP</h1>
      <div className="flex items-center justify-between mb-8">
        <a href="/" className="flex items-center text-4xl font-bold">
          <IoIosArrowRoundBack className="mr-2" />
        </a>

        <div className="flex items-center space-x-4">
          <div>
            <select id="genre-filter" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="bg-white text-black px-6 py-2 rounded-lg">
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input id="search" type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white text-black px-4 py-2 rounded-lg w-full max-w-xs" />
          </div>
        </div>
      </div>

      {filteredBands.length > 0 ? <BandCarousel bands={filteredBands} /> : <p className="text-center mt-8">No bands match your search or selected genre.</p>}
    </div>
  );
}
