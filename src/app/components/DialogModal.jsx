"use client";

export default function DialogModal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // Hvis modalen ikke er åben, renderes intet

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Luk modalen, hvis baggrunden bliver klikket
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 m-5 lg: max-w-2xl"
        onClick={(e) => e.stopPropagation()} // Stop klik på indholdet fra at lukke modalen
      >
        {children} {/* Her vises indholdet, der sendes som children */}
      </div>
    </div>
  );
}
