const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Hent alle bands
export async function getAllBands() {
  try {
    const response = await fetch(`${baseURL}/bands`, {
      method: "GET",
      headers: headersList,
    });
    return await response.json();
  } catch (error) {
    console.error("Fejl ved hentning af bands:", error);
    return [];
  }
}

// Hent hele schedule
export async function getSchedule() {
  try {
    const response = await fetch(`${baseURL}/schedule`, {
      method: "GET",
      headers: headersList,
    });
    return await response.json();
  } catch (error) {
    console.error("Fejl ved hentning af schedule:", error);
    return {};
  }
}

// Hent alle pladser
export async function getAllAreas() {
  try {
    const response = await fetch(`${baseURL}/available-spots`, {
      method: "GET",
      headers: headersList,
    });
    return await response.json();
  } catch (error) {
    console.error("Fejl ved hentning af areas:", error);
    return [];
  }
}

// PUT henter reservetion
export async function reserveSpot(area, amount) {
  console.log("API kald - Area:", area, "Amount (Total Tents):", amount);

  const bodyContent = JSON.stringify({
    area: area,
    amount: amount, // Her sendes KUN totalTents
  });

  const response = await fetch(`${baseURL}/reserve-spot`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyContent,
  });

  const data = await response.json();

  return {
    id: data.id,
    timeout: data.timeout || 300000
  };
}

