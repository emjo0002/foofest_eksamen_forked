"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      <div className="wrapper grid overflow-x-auto overscroll-contain scrollbar-hide scroll-snap-x mandatory py-8">
        <div className="items flex gap-4 pl-[calc(50vw-12rem)] pr-[calc(50vw-12rem)]">
          {bands.map((band) => (
            <div key={band.id} className="bg-blue-800 grid place-content-center rounded-lg shadow-lg hover:shadow-2xl transition duration-300 scroll-snap-center w-96">
              <Image src={`/logos/${band.logo}`} width={275} height={250} alt={band.slug} className="h-64 object-fill rounded-md" />
              <h2 className="text-2xl font-semibold mt-4">{band.name}</h2>
              <p className="mt-2">{band.description}</p>
              <Link href={`/artist/${band.slug}`} name={band.name}>
                <button className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg">More Info</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
