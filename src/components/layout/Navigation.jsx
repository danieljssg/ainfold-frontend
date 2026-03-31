"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-100 flex justify-center pointer-events-none">
      <nav
        className={cn(
          "w-full px-4 md:px-12 py-3 md:py-4 flex items-center justify-between transition-all duration-500 ease-in-out shadow-2xl pointer-events-auto hover:bg-purple-950/15",
          scrolled || isMobileMenuOpen
            ? "backdrop-blur-xl bg-black/60 border-b "
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl text-zinc-100  hover:text-purple-400 transition-all duration-300"
          >
            AI'nFold
          </Link>
          <span className="text-zinc-700 text-sm hidden sm:block">|</span>
          <Link
            href="#"
            className="text-zinc-500 text-[10px]  hover:text-zinc-300 transition-colors tracking-widest hidden sm:block"
          >
            by Spotz Labs
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                href="/"
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Inicio
              </Link>
              <Link
                href="/demo"
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Demo
              </Link>
              <Link
                href="/auth/login"
                className="bg-zinc-100 text-zinc-950 text-xs font-bold px-5 py-2 rounded-full hover:bg-purple-400 hover:text-zinc-950 transition-all active:scale-95"
              >
                Iniciar sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/analysis/create"
                className="text-sm font-medium text-zinc-400 hover:text-purple-400 transition-colors"
              >
                Crear Análisis
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Mis Análisis
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-rose-400 hover:text-destructive transition-colors flex items-center gap-2 pl-4 border-l border-zinc-500"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>

        <MobileMenu
          isAuthenticated={isAuthenticated}
          logout={logout}
          isOpen={isMobileMenuOpen}
          setIsOpen={setIsMobileMenuOpen}
        />
      </nav>
    </header>
  );
}
