"use client";

import { useState } from "react";

export default function FileDropzone({ onFileSelect }) {
  const [hasFile, setHasFile] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e, active) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(active);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-6 transition-all duration-200 group cursor-pointer ${
        isDragActive
          ? "border-purple-400 bg-purple-400/5"
          : "border-zinc-700 hover:border-purple-400/50 hover:bg-zinc-900/50"
      }`}
      style={{ minHeight: "280px" }}
      onDragEnter={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDragOver={(e) => handleDrag(e, true)}
      onDrop={(e) => {
        handleDrag(e, false);
        setHasFile(true);
      }}
    >
      {!hasFile ? (
        <>
          <div
            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all ${
              isDragActive
                ? "border-purple-400 bg-purple-400/10"
                : "border-zinc-700 group-hover:border-purple-400/50"
            }`}
          >
            <svg
              className={`w-7 h-7 transition-colors ${isDragActive ? "text-purple-400" : "text-zinc-500 group-hover:text-purple-400"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.338-2.32 5.75 5.75 0 0 1 1.222 11.095"
              />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <p className="text-zinc-300 text-sm font-semibold">
              Arrastra tu CV aquí
            </p>
            <p className="text-zinc-400 text-xs">o haz clic para seleccionar</p>
            <p className="text-zinc-500 text-xs">PDF · máx. 5MB</p>
          </div>
          <button
            type="button"
            onClick={() => setHasFile(true)}
            className="text-xs text-purple-400 border border-purple-400/30 px-5 py-2 rounded-full hover:bg-purple-400/10 transition-colors font-medium"
          >
            Seleccionar archivo
          </button>
        </>
      ) : null}

      {hasFile && (
        <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4 bg-gradient-to-r from-purple-400/10 to-zinc-900 border border-purple-400/20 rounded-xl p-4">
            <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-purple-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-zinc-300 text-sm font-semibold">
                curriculum_daniel_2025.pdf
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                2.3 MB · Listo para analizar
              </p>
            </div>
            <button
              type="button"
              onClick={() => setHasFile(false)}
              className="flex-shrink-0 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 p-2 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
