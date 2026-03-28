"use client";

import { useState } from "react";

export default function FormFields() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-2">
          Nombre del candidato
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder-zinc-600"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-2">
          Hobby o pasión
        </label>
        <input
          type="text"
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          required
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-100 text-sm focus:outline-none focus:border-purple-400 transition-colors placeholder-zinc-600"
          placeholder="Ej: cocinar, fotografía, música..."
        />
        <p className="text-zinc-600 text-xs mt-2">
          Tu hobby revela habilidades que el CV no muestra
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-zinc-900 font-medium rounded-xl py-3.5 text-sm transition-all disabled:opacity-75"
        style={{ backgroundColor: "#c084fc" }}
        onMouseEnter={(e) =>
          !isSubmitting && (e.target.style.backgroundColor = "#d8b4fe")
        }
        onMouseLeave={(e) =>
          !isSubmitting && (e.target.style.backgroundColor = "#c084fc")
        }
      >
        {isSubmitting ? "Procesando..." : "Desplegar análisis →"}
      </button>

      <p className="text-zinc-600 text-xs text-center">
        Tiempo estimado: 2-3 minutos
      </p>
    </form>
  );
}
