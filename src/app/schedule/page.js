"use client";

import Schedule from "../components/Schedule";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function SchedulePage() {
  return (
    <div className="relative dynamic-bg text-white h-auto px-8 py-12">
      <h1 className="font-gajraj text-6xl md:text-9xl">PROGRAM</h1>
      <a href="/" className="block mb-4 text-5xl font-bold w-fit">
        <IoIosArrowRoundBack />
      </a>
      <Schedule />
    </div>
  );
}
