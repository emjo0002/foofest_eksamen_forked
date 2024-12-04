"use client";

import { useEffect, useState } from "react";
import { getAllBands } from "../lib/api";

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
    <div>
      <h1>Band Lineup</h1>
      <ul>
        {bands.map((band) => (
          <li key={band.id}>{band.name}</li>
        ))}
      </ul>
    </div>
  );
}
