"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ArtistPage() {
  const { slug } = useParams();
  const [band, setBand] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [performance, setPerformance] = useState({ scene: "", start: "", end: "" });
  const [isExpanded, setIsExpanded] = useState(false); // Tilføjet "Læs mere"-funktion

  useEffect(() => {
    async function fetchData() {
      try {
        // Hent band data
        const bandRes = await fetch(`http://localhost:8080/bands/${slug}`);
        const bandData = await bandRes.json();
        setBand(bandData);

        // Hent schedule data
        const scheduleRes = await fetch(`http://localhost:8080/schedule`);
        const scheduleData = await scheduleRes.json();
        setSchedule(scheduleData);

        // Find bandets scene og tidspunkt
        let foundPerformance = null;

        for (const scene in scheduleData) {
          for (const day in scheduleData[scene]) {
            const acts = scheduleData[scene][day];
            acts.forEach((act) => {
              if (act.act === bandData.name) {
                foundPerformance = {
                  scene,
                  start: act.start,
                  end: act.end,
                };
              }
            });
          }
        }

        if (foundPerformance) {
          setPerformance(foundPerformance);
        }
      } catch (error) {
        console.error("Fejl ved hentning af data:", error);
      }
    }

    fetchData();
  }, [slug]);

  if (!band) return <p className="text-white">Indlæser...</p>;

  // Begræns beskrivelsen til 300 tegn
  const truncatedBio = band.bio.length > 300 ? `${band.bio.slice(0, 300)}...` : band.bio;

  return (
    <div className="relative dynamic-bg min-h-screen text-white p-8">
      <a href="schedule" className="block mt-4 text-2xl font-bold">
        Tilbage
      </a>
      {/* Indhold */}
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-12">
        {/* Billede */}
        <div className="max-w-md">
          <Image src={`/logos/${band.logo}`} alt={band.name} width={500} height={500} className="h-auto object-cover" />
        </div>

        {/* Tekst */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-6 tracking-wider">{band.name.toUpperCase()}</h1>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">DESCRIPTION</h2>
            <p className="text-gray-300 leading-relaxed">{isExpanded ? band.bio : truncatedBio}</p>
            {band.bio.length > 300 && (
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 hover:underline mt-2">
                {isExpanded ? "Læs mindre" : "Læs mere"}
              </button>
            )}
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
            <p className="text-gray-300">{performance.scene ? `${performance.scene} fra ${performance.start} til ${performance.end}` : "Ingen scene eller tidspunkt tilgængeligt"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
