"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "About" },
  { href: "/prototype-analysis", label: "Prototype Analysis" },
  { href: "/tool-analysis", label: "Tool Analysis" },
  { href: "/codebook", label: "Codebook" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="bg-[#4E6A8C] border-b border-[#415A78]">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <nav className="flex items-center text-white text-[14px] md:text-[15px] font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-7 py-3 transition-colors ${
                  isActive
                    ? "bg-[#8FB9BE] text-white"
                    : "hover:bg-[#5E7A9B] text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}