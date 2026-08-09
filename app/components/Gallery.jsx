"use client";

import { useState, useEffect } from "react";

export default function Gallery({ photos }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <main className="columns-1 sm:columns-2 md:columns-3 gap-4 p-6">
        {photos.map((photo) => (
          <img
            key={photo.key}
            src={photo.url}
            alt=""
            loading="lazy"
            onClick={() => setSelected(photo)}
            className="w-full mb-4 break-inside-avoid cursor-pointer"
          />
        ))}
      </main>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 cursor-zoom-out"
        >
          <img
            src={selected.url}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  );
}
