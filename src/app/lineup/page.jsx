"use client";

import { useEffect, useState } from "react";
import BandCarousel from "../components/BandCarousel";
import { getAllBands } from "../api/api";

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
  )}