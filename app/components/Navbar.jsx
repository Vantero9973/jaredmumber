import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="text-[17px] font-semibold tracking-wide text-neutral-900"
      >
        jaredmumber
      </Link>
      <div className="flex items-center gap-7">
        <Link
          href="/about"
          className="text-[15px] text-neutral-900 hover:opacity-50"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-[15px] text-neutral-900 hover:opacity-50"
        >
          Contact
        </Link>
        <Link
          href="/upload"
          className="text-[15px] text-neutral-900 hover:opacity-50"
        >
          Upload
        </Link>
      </div>
    </nav>
  );
}
