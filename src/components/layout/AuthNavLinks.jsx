import Link from "next/link";

export const AuthNavLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/upload"
        className="text-zinc-400 hover:text-purple-300 text-sm transition-all ease-in-out duration-200"
      >
        Nuevo análisis
      </Link>
      <Link
        href="/dashboard"
        className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors"
      >
        Mis análisis
      </Link>
      <button className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
        Salir
      </button>
    </div>
  );
};
