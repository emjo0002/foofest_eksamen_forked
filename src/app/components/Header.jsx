"use client";

import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="absolute z-10 w-full flex justify-between items-center p-4 text-white">
      <a href="/">
        <div className="text-xl font-bold">Foofest</div>
      </a>

      <button onClick={handleClick} className="flex flex-col justify-center items-center">
        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}></span>
        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
        <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}></span>
      </button>

      <nav className={`absolute top-14 left-0 w-full bg-gray-800 text-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col items-center py-4 space-y-2">
          <li>
            <a href="/tickets" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Tickets!
            </a>
          </li>
          <li>
            <a href="/lineup" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Line-ups
            </a>
          </li>
          <li>
            <a href="/schedule" className="block px-4 py-2 hover:bg-gray-700 rounded">
              Program
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
