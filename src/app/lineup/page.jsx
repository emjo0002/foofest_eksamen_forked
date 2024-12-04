"use client";

import Image from "next/image";
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
    <div className="bg-blue-900 text-white min-h-screen px-8 py-12">
         <h1 className="text-4xl font-bold mb-8">LINE-UP</h1>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {bands.map((band) => (
          <div key={band.id} className="bg-blue-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
            <Image src={`/logos/${band.logo}`} width={250} height={250} alt={band.title} className="w-full h-64 object-cover rounded-md" />
            <h2 className="text-2xl font-semibold mt-4">{band.name}</h2>
            <p className="mt-2">{band.description}</p>
            <button className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg">More Info</button>
          </div>
        ))}
      </div>
    </div>
  );
}
