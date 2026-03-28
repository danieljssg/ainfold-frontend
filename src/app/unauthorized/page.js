import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4 text-destructive">
          <ShieldAlert size={64} />
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Acceso Restringido
        </h1>

        <p className="text-gray-600 mb-8">
          No tienes los permisos necesarios para acceder a esta sección.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
