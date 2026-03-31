"use client";

import { useState } from "react";

export default function FormFields({
  name,
  setName,
  hobby,
  setHobby,
  isSubmitting,
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs text-zinc-300 uppercase tracking-widest block mb-2">
          Nombre y Apellido
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder-zinc-600 disabled:opacity-50"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label className="text-xs text-zinc-300 uppercase tracking-widest block mb-2">
          Hobby o pasión
        </label>
        <input
          type="text"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder-zinc-600 disabled:opacity-50"
          placeholder="Ej: cocinar, fotografía, música..."
        />
        <p className="text-zinc-400 text-xs mt-2">
          Tu hobby revela habilidades que el CV no muestra
        </p>
      </div>

      <p className="text-muted-foreground text-xs italic">
        Asegúrate de completar todos los campos y soltar tu CV en la zona
        derecha.
      </p>
    </div>
  );
}
