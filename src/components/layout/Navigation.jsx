"use client";
import { useState, useEffect } from "react";
import { NavLinks } from "./NavLinks";
import { AuthNavLinks } from "./AuthNavLinks";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const auth = true;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center  pointer-events-none">
      <nav
        className={cn(
          "w-full  px-6 py-4 flex items-center justify-between transition-all duration-500 ease-in-out  shadow-2xl pointer-events-auto hover:bg-purple-950/15",
          scrolled ? "backdrop-blur-lg bg-black/60 " : "bg-black/20 ",
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-xl text-primary-foreground hover:text-purple-400 transition-colors duration-300 ease-in-out"
          >
            AI'nFold
          </Link>
          <Link
            href="https://spotzlabs.site"
            className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
          >
            by Spotz Labs
          </Link>
        </div>
        {auth ? <NavLinks /> : <AuthNavLinks />}
      </nav>
    </header>
  );
}
