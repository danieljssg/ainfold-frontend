import Link from "next/link";

export const NavLinks = () => {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/dashboard"
        className="text-zinc-400 hover:text-purple-300 text-sm transition-all ease-in-out duration-200"
      >
        Demo
      </Link>
      <Link
        href="/auth/login"
        className="text-zinc-400 hover:text-zinc-100 text-sm transition-colors"
      >
        Iniciar sesión
      </Link>
    </div>
  );
};
