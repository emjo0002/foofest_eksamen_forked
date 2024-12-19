"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";

export default function Header() {
  return (
    <header className="absolute z-10 w-full flex justify-between items-center p-4 text-white">
      <a href="/">
        <div className="text-xs font-bold">
          <b className="text-4xl font-gajraj">F</b>oofest
        </div>
      </a>

      <Sheet>
        <SheetTrigger asChild>
          <button className="flex flex-col justify-center items-center">
            <span className="bg-white block h-0.5 w-6 rounded-sm mb-1"></span>
            <span className="bg-white block h-0.5 w-6 rounded-sm mb-1"></span>
            <span className="bg-white block h-0.5 w-6 rounded-sm"></span>
          </button>
        </SheetTrigger>

        <SheetContent side="right">
          <nav className="flex flex-col font-gajraj items-center py-4 text-4xl space-y-4">
            <a href="/booking" className="block px-4 py-2 hover:text-blue-700">
              TICKETS
            </a>
            <a href="/lineup" className="block px-4 py-2 hover:text-blue-700">
              LINE-UP
            </a>
            <a href="/schedule" className="block px-4 py-2 hover:text-blue-700">
              PROGRAM
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
