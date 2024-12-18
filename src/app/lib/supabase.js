const url = "https://cgyglgjzhgchgdeffffj.supabase.co/rest/v1/incomingData";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNneWdsZ2p6aGdjaGdkZWZmZmZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NDYzMDMsImV4cCI6MjA1MDEyMjMwM30.7eoKVN_1CHvja9px0fUW0QuVqdDGwwuO4dHPr6slzuI";

const headersList = {
  "Content-Type": "application/json",
  apikey: key,
  Prefer: "return=representation",
};

// Hent alle subscribers
export async function getSubs() {
  const response = await fetch(url, {
    method: "GET",
    headers: headersList,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch subscribers: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Hent subscriber efter ID
export async function getSubById(id) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "GET",
    headers: headersList,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch subscriber by ID: ${response.status}`);
  }

  const data = await response.json();
  return data[0]; // Returnér første resultat
}

// Opret ny subscriber
export async function postSub(subdata) {
  const response = await fetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  if (!response.ok) {
    throw new Error(`Failed to create subscriber: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

// Opdater subscriber
export async function updateSub(id, subdata) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  if (!response.ok) {
    throw new Error(`Failed to update subscriber: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
