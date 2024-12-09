"use client";

import Image from "next/image";

export default async function ArtistPage({ params }) {
  const { slug } = params;

  const res = await fetch(`http://localhost:8080/bands/${slug}`);
  const band = await res.json();

  return (
    <div>
      <h1>{band.name}</h1>
      <p>{band.description}</p>
      <Image src={`/logos/${band.logo}`} alt={band.name} width={250} height={250} className="w-64 h-64 object-cover" />
    </div>
  );
}
