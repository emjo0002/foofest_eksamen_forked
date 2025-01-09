"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { AiOutlineHeart } from "react-icons/ai";
import useBookingStore from "../globalkurv/useBookingStore";

export default function Header() {
  const favorites = useBookingStore((state) => state.favorites);

  return (
    <header className="absolute z-10 w-full flex justify-between items-center p-4 text-white">
      <a href="/">
        <div className="text-xs font-bold">
          <b className="text-4xl font-gajraj">F</b>oofestival
        </div>
      </a>

      <div className="flex items-center gap-4">
        {/* Favorit-knap med Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="relative">
              <AiOutlineHeart className="text-3xl" />
              {favorites.length > 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{favorites.length}</div>}
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col font-genos items-center py-4 text-2xl space-y-4">
              <h2 className="text-lg px-4 py-2 font-bold">Your Favorite bands</h2>
              {favorites.length === 0 ? (
                <p className="text-sm text-gray-500">No favorites yet.</p>
              ) : (
                <ul className="w-full">
                  {favorites.map((fav) => (
                    <li key={fav.slug} className="flex items-center justify-between p-2 border-b">
                      <span>{fav.name}</span>
                      <a href={`/program/${fav.slug}`} className="text-blue-500 hover:underline text-sm">
                        Info
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Burger-menu */}
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
      </div>
    </header>
  );
}
