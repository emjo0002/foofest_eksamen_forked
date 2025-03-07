const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://trapezoidal-prickle-stocking.glitch.me/";

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

    const bands = await response.json();

    return bands;
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
  const bodyContent = JSON.stringify({
    area: area,
    amount: amount,
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
    timeout: data.timeout,
  };
}

// POST Fuldfør reservation
export async function fullfillReservation(reservationId) {
  const bodyContent = JSON.stringify({
    id: reservationId,
  });
  const response = await fetch(`${baseURL}/fullfill-reservation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyContent,
  });

  const data = await response.json();
  return data;
}
