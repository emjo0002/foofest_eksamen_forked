"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ArtistPage() {
  const { slug } = useParams();
  const [band, setBand] = useState(null);

  useEffect(() => {
    async function fetchBand() {
      const res = await fetch(`http://localhost:8080/bands/${slug}`);
      const data = await res.json();
      setBand(data);
    }

    fetchBand();
  }, [slug]);

  if (!band) return <p className="text-white">Indlæser...</p>;

  return (
    <div className="relative dynamic-bg min-h-screen text-white p-8">
      <a href="schedule" className="block mt-4 text-2xl font-bold">
        Tilbage
      </a>
      {/* Indhold */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-12">
        {/* Billede */}
        <div className="max-w-md">
          <Image src={`/logos/${band.logo}`} alt={band.name} width={500} height={500} className="w-full h-auto object-cover" />
        </div>

        {/* Tekst */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-6 tracking-wider">{band.name.toUpperCase()}</h1>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">DESCRIPTION</h2>
            <p className="text-gray-300 leading-relaxed">{band.bio}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">GENRE</h2>
            <p className="text-gray-300">{band.genre}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">MEMBER</h2>
            <p className="text-gray-300">{band.members.join(", ")}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">PLAYING</h2>
            <p className="text-gray-300">
              {band.scene} at {band.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
