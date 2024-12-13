// const url = "https://gxwufcmxyiedsoihyobo.supabase.co/rest/v1/subscriptions";
// const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4d3VmY214eWllZHNvaWh5b2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MzQ3ODQsImV4cCI6MjA0ODExMDc4NH0.C2S_n3gjBykDcQe8zyvyd6qq31n9K-PVVMvDl3t1hKU";

// const headersList = {
//   "Content-Type": "application/json",
//   apikey: key,
//   Prefer: "return=representation",
// };

// // Hent alle subscribers
// export async function getSubs() {
//   const response = await fetch(url, {
//     method: "GET",
//     headers: headersList,
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch subscribers: ${response.status}`);
//   }

//   const data = await response.json();
//   return data;
// }

// // Hent subscriber efter ID
// export async function getSubById(id) {
//   const response = await fetch(`${url}?id=eq.${id}`, {
//     method: "GET",
//     headers: headersList,
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch subscriber by ID: ${response.status}`);
//   }

//   const data = await response.json();
//   return data[0]; // Returnér første resultat
// }

// // Opret ny subscriber
// export async function postSub(subdata) {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: headersList,
//     body: JSON.stringify(subdata),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to create subscriber: ${response.status}`);
//   }

//   const data = await response.json();
//   return data;
// }

// // Opdater subscriber
// export async function updateSub(id, subdata) {
//   const response = await fetch(`${url}?id=eq.${id}`, {
//     method: "PATCH",
//     headers: headersList,
//     body: JSON.stringify(subdata),
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to update subscriber: ${response.status}`);
//   }

//   const data = await response.json();
//   return data;
// }
