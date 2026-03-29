"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Rocket,
  LayoutDashboard,
  LogOut,
  Home,
  PlayCircle,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileMenu({ isAuthenticated, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const guestLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/demo", label: "Demo", icon: PlayCircle },
    { href: "/auth/login", label: "Iniciar sesión", icon: LogIn },
  ];

  const authLinks = [
    { href: "/analysis/create", label: "Crear Análisis", icon: Rocket },
    { href: "/dashboard", label: "Mis Análisis", icon: LayoutDashboard },
  ];

  const links = isAuthenticated ? authLinks : guestLinks;

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="p-2 text-zinc-400 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/60 backdrop-blur-md z-40 transition-all duration-300"
          onClick={toggleMenu}
        />
      )}

      {/* Menu Content */}
      <div
        className={cn(
          "fixed top-16 right-0 left-0 bg-linear-to-bl from-card to-transparent  backdrop-blur-3xl border-b border-zinc-800 p-6 z-50 transform transition-transform duration-300 ease-in-out origin-top",
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="flex items-center gap-3 text-lg font-medium text-zinc-300 hover:text-purple-400 p-3 rounded-xl hover:bg-white/5 transition-all"
            >
              <link.icon className="w-5 h-5 opacity-70" />
              {link.label}
            </Link>
          ))}
          <hr />
          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="cursor-pointer flex items-center gap-3 text-lg font-medium text-rose-400 hover:text-rose-500 p-3 rounded-xl hover:bg-red-500/10 transition-all text-left mt-2"
            >
              <LogOut className="w-5 h-5 opacity-70" />
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
