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
