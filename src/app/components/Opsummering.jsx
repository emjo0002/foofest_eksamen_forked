import React, { useEffect, useState } from "react";
import { getSubsByIds, deleteSub } from "../lib/supabase"; // Import funktion til at hente data fra Supabase
import Basket from "./Basket";

export default function Opsummering({ onNext, onBack, postedIds }) {
  const [userInfo, setUserInfo] = useState([]); // Til at gemme hentede data
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Indlæsningsstatus

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSubsByIds(postedIds); // Hent data fra Supabase med `postedIds`
        setUserInfo(data); // Gem de hentede data i state
      } catch (err) {
        setError("Failed to load user information.");
        console.error(err); // Log fejl, hvis der opstår problemer
      } finally {
        setIsLoading(false); // Stop indlæsningsindikatoren
      }
    }

    fetchData();
  }, [postedIds]);

  const handleBack = async () => {
    try {
      // Sletning af hver post ved hjælp af deres ID
      await Promise.all(postedIds.map((id) => deleteSub(id)));
      console.log("Successfully deleted all posted data.");
    } catch (err) {
      console.error("Failed to delete posted data:", err);
    }
    onBack("information");
  };

  return (
    <main className="max-w-6xl mx-auto pb-5">
      <div className="flex justify-center gap-8 mt-10 mr-10 ml-10 mb-5 flex-wrap lg:flex-nowrap">
        <div className="relative border border-white text-white lg:w-full lg:min-h-[29rem] p-8 flex flex-col">
          <h2 className="font-bold text-4xl mb-4 font-gajraj self-center">
            User Information
          </h2>

          {/* Håndtering af indlæsningsstatus og fejl */}
          {isLoading ? (
            <p className="font-genos text-2xl">Loading...</p>
          ) : error ? (
            <p className="font-genos text-2xl text-red-500">{error}</p>
          ) : (
            <div className="mb-8">
              {/* Vis data, hvis det er hentet */}
              {userInfo.length > 0 ? (
                userInfo.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 border-b border-white font-genos text-2xl pb-4"
                  >
                    <p>
                      <strong className="font-extrabold">Name:</strong> {item.name}
                    </p>
                    <p>
                      <strong className="font-extrabold">Last name:</strong> {item.lastname}
                    </p>
                    <p>
                      <strong className="font-extrabold">Telephone number:</strong> {item.number}
                    </p>
                    <p>
                      <strong className="font-extrabold">Email:</strong> {item.email}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-genos text-2xl">No user information found.</p>
              )}
            </div>
          )}
        </div>

        {/* Eventuelt andet indhold som Basket */}
        <Basket />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button onClick={handleBack} className="font-gajraj px-6 py-2 text-3xl text-white">
          Back
        </button>
        <button onClick={onNext} className="font-gajraj px-6 py-2 text-3xl text-white">
          Next
        </button>
      </div>
    </main>
  );
}
