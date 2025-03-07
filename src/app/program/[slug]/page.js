"use client";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://trapezoidal-prickle-stocking.glitch.me/";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function ArtistPage() {
  const { slug } = useParams();
  const [band, setBand] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [performance, setPerformance] = useState({ scene: "", start: "", end: "" });
  const [isExpanded, setIsExpanded] = useState(false); // LÆS MERE FUNKTIONEN

  useEffect(() => {
    async function fetchData() {
      try {
        // FETCHER BAND DATA
        const bandRes = await fetch(`${baseURL}/bands/${slug}`);
        const bandData = await bandRes.json();
        setBand(bandData);

        // FETCHER SCHEDULE DATA
        const scheduleRes = await fetch(`${baseURL}/schedule`);
        const scheduleData = await scheduleRes.json();
        setSchedule(scheduleData);

        // FINDER OG HENTER DAG OG SCENE
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

  if (!band) return <p className="text-black">Loading...</p>;

  //BEGRÆNSER BESKRIVELSEN TIL MAX 300 TEGN
  const truncatedBio = band?.bio?.length > 300 ? `${band.bio.slice(0, 300)}...` : band?.bio || "Ingen beskrivelse tilgængelig";

  return (
    <div className="relative dynamic-bg min-h-screen text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-gajraj font-bold mb-8 mt-10 text-center">{band.name.toUpperCase()}</h1>{" "}
        <a href="/schedule" className="text-white text-4xl hover:scale-110 hover:text-blue-400 transition-transform duration-200">
          <IoIosArrowRoundBack />
        </a>
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="max-w-lg">
            <Image src={`/logos/${band.logo}`} alt={band.name} width={500} height={500} className="h-auto object-cover" />
          </div>

          <div className="max-w-lg flex flex-col justify-between">
            <div>
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
      </div>
    </div>
  );
}
