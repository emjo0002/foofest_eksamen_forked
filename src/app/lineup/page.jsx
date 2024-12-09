"use client";

import { useEffect, useState } from "react";
import { getAllBands } from "../lib/api";
import BandCarousel from "../components/BandCarousel";

export default function LineupPage() {
  const [bands, setBands] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedBands = await getAllBands();
      setBands(fetchedBands);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-blue-900 text-white min-h-screen px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">LINE-UP</h1>
      {bands.length > 0 ? (
        <BandCarousel bands={bands} />
      ) : (
        <p className="text-center mt-8">Loading bands...</p>
      )}
    </div>
  );
}