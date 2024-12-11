import React from "react";
import Image from "next/image";

const Schedule = ({ bands, schedule, filterScene, filterDay }) => {
  const filteredBands = bands.filter((band) => {
    if (!band.scene) return false;

    const matchesScene = filterScene === "all" || band.scene === filterScene;

    const stageSchedule = schedule[band.scene];
    if (!stageSchedule) return false;

    const matchesDay =
      filterDay === "all" ||
      Object.keys(stageSchedule).some((dayKey) => {
        return dayKey === filterDay && stageSchedule[dayKey].some((act) => act.act.toLowerCase() === band.name.toLowerCase() && !act.cancelled);
      });

    return matchesScene && matchesDay;
  });

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBands.map((band) => {
          const stageSchedule = schedule[band.scene];
          let bandSchedule = null;

          if (stageSchedule) {
            bandSchedule = Object.entries(stageSchedule).find(([day, acts]) => acts.some((act) => act.act.toLowerCase() === band.name.toLowerCase() && !act.cancelled));
          }

          const bandTime = bandSchedule && bandSchedule[1].find((act) => act.act.toLowerCase() === band.name.toLowerCase() && !act.cancelled);

          return (
            <div key={band.id} className="p-4 bg-sky-950 rounded shadow hover:bg-zinc-400 transition-all">
              {/* Kun logo fra databasen vises */}

              <Image src={`/logos/${band.logo}`} width={275} height={250} alt={band.slug} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-2xl font-semibold">{band.name}</h3>
              <p className="text-gray-300">Scene: {band.scene}</p>
              {bandTime && (
                <p className="text-gray-400">
                  Time: {bandTime.start} - {bandTime.end}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
