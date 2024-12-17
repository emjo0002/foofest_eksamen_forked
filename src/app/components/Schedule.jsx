import React from "react";
import Image from "next/image";
import Link from "next/link";

const Schedule = ({ bands, schedule, filterScene, filterDay }) => {
  const filteredBands = bands.filter((band) => {
    if (!band.scene) return false;

    const matchesScene = filterScene === "all" || band.scene === filterScene;

    const stageSchedule = schedule[band.scene];
    if (!stageSchedule) return false;

    const matchesDay =
      filterDay === "all" ||
      Object.keys(stageSchedule).some((dayKey) => {
        return dayKey === filterDay && stageSchedule[dayKey].some((act) => act.act.toLowerCase() === band.name.toLowerCase());
      });

    return matchesScene && matchesDay;
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBands.map((band) => {
          const stageSchedule = schedule[band.scene];

          let bandSchedule = null;
          let isCancelled = false;

          if (stageSchedule) {
            bandSchedule = Object.entries(stageSchedule).find(([day, acts]) =>
              acts.some((act) => {
                if (act.act.toLowerCase() === band.name.toLowerCase()) {
                  if (act.cancelled) {
                    isCancelled = true;
                  }
                  return true;
                }
                return false;
              })
            );
          }

          const bandTime = bandSchedule && bandSchedule[1].find((act) => act.act.toLowerCase() === band.name.toLowerCase());

          return (
            <div key={band.id} className="p-4 border-2 rounded shadow hover:bg-opacity-10 transition-all">
              <Image src={`/logos/${band.logo}`} width={275} height={250} alt={band.slug} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-2xl font-semibold">{band.name}</h3>
              <p className="text-gray-300">Scene: {band.scene}</p>
              {bandTime && (
                <p className="text-gray-400">
                  Time: {bandTime.start} - {bandTime.end}
                </p>
              )}
              {isCancelled && <p className="text-red-500 font-bold">Cancelled</p>}

              {/* Læs mere link til slug-siden */}
              <Link href={`/program/${band.slug}`}>
                <button className="mt-4 px-4 py-2 bg-zinc-300 text-black rounded hover:bg-zinc-500">Læs mere</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
