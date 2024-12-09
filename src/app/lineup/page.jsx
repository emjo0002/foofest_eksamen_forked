"use client";

import { useEffect, useState } from "react";
import BandCarousel from "../components/BandCarousel";
import { getAllBands } from "../api/api";

export default function LineupPage() {
  const [bands, setBands] = useState([]); // Original liste af bands
  const [filteredBands, setFilteredBands] = useState([]); // Filtrerede bands
  const [selectedGenre, setSelectedGenre] = useState("All"); // Valgt genre
  const [searchQuery, setSearchQuery] = useState(""); // Søgeord

  useEffect(() => {
    async function fetchData() {
      const fetchedBands = await getAllBands();
      setBands(fetchedBands);
      setFilteredBands(fetchedBands); // Default visning viser alle bands
    }
    fetchData();
  }, []);

  // Håndter filtrering baseret på valgt genre og søgeord
  useEffect(() => {
    let filtered = bands;

    // Filtrér efter genre
    if (selectedGenre !== "All") {
      filtered = filtered.filter((band) => band.genre === selectedGenre);
    }

    // Filtrér efter søgeord
    if (searchQuery) {
      filtered = filtered.filter((band) =>
        band.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBands(filtered);
  }, [bands, selectedGenre, searchQuery]);

  // Udtræk unikke genrer fra bands-listen
  const genres = ["All", ...new Set(bands.map((band) => band.genre))];

  return (
    <div className="bg-c text-white min-h-screen px-8 py-12 bg-custom bg-cover bg-center pt-19">
      <h1 className="text-8xl font-gajraj font-bold mb-8">LINE-UP</h1>

      <div className="sm: w-4/5 lg:flex gap-10">

        {/* Genre Filter */}
        <div className="mb-8">
          <label htmlFor="genre-filter" className="mr-4 text-lg font-semibold">Filter by Genre:</label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-white text-black px-6 py-2 rounded-lg "
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Søgefelt */}
        <div className="mb-8 flex items-center">
          <label htmlFor="search" className="mr-4 text-lg font-semibold">Search:</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded-lg w-full max-w-72"
          />
        </div>
      </div>

      {/* Band Carousel */}
      {filteredBands.length > 0 ? (
        <BandCarousel bands={filteredBands} />
      ) : (
        <p className="text-center mt-8">No bands match your search or selected genre.</p>
      )}
    </div>
  );
}
