"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-neutral-200">
      <div className="flex items-center justify-between px-6 sm:px-10 py-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900"
        >
          Jaredmumber
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-8 text-sm text-neutral-600">
          <Link
            href="/about"
            className="relative py-1 hover:text-neutral-900 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative py-1 hover:text-neutral-900 transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
          >
            Contact
          </Link>
          <Link
            href="/upload"
            className="text-xs uppercase tracking-wide border border-neutral-300 rounded-full px-4 py-1.5 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
          >
            Upload
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="sm:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
        >
          <span
            className={`block h-px bg-neutral-900 transition-transform ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-px bg-neutral-900 transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px bg-neutral-900 transition-transform ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-6 pb-6 text-sm text-neutral-600">
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-neutral-900"
          >
            Contact
          </Link>
          <Link
            href="/upload"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-wide border border-neutral-300 rounded-full px-4 py-1.5 w-fit hover:border-neutral-900 hover:text-neutral-900"
          >
            Upload
          </Link>
        </div>
      </div>
    </nav>
  );
}
