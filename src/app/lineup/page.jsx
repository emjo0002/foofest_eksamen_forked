"use client";

import { useEffect, useState } from "react";
import BandCarousel from "../components/BandCarousel";
import { getAllBands, getSchedule } from "../api/api";

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

        // Tilføj scene, start og slut til hvert band
        const updatedBands = fetchedBands.map((band) => {
          let scene = null;
          let start = null;
          let end = null;

          Object.keys(fetchedSchedule).forEach((sceneKey) => {
            Object.values(fetchedSchedule[sceneKey]).forEach((day) => {
              day.forEach((act) => {
                if (act.act === band.name) {
                  scene = sceneKey;
                  start = act.start; // Starttidspunkt
                  end = act.end; // Sluttidspunkt
                }
              });
            });
          });

          return { ...band, scene, start, end };
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

  const genres = ["All", ...new Set(bands.map((band) => band.genre))];

  return (
    <div className="relative dynamic-bg text-white min-h-screen px-8 py-12 bg-custom bg-cover bg-center pt-19">
      <h1 className="text-8xl font-gajraj font-bold mb-8">LINE-UP</h1>

      <div className="sm:w-4/5 lg:flex gap-10">
        <div className="mb-8">
          <label htmlFor="genre-filter" className="mr-4 text-lg font-semibold">
            Filter by Genre:
          </label>
          <select id="genre-filter" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="bg-white text-black px-6 py-2 rounded-lg">
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8 flex items-center">
          <label htmlFor="search" className="mr-4 text-lg font-semibold">
            Search:
          </label>
          <input id="search" type="text" placeholder="Search by name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white text-black px-4 py-2 rounded-lg w-full max-w-72" />
        </div>
      </div>

      {filteredBands.length > 0 ? <BandCarousel bands={filteredBands} /> : <p className="text-center mt-8">No bands match your search or selected genre.</p>}
    </div>
  );
}
