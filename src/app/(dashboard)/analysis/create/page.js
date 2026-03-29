import FileDropzone from "@/components/FileDropzone";
import FormFields from "@/components/FormFields";
import { BackButton } from "@/components/shared/BackButton";

export const metadata = {
  title: "Subir CV | AI'nFold",
  description: "Sube tu CV para análisis inteligente",
};

export default function UploadPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 container">
      <div id="analysis">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <p className="section-label">Generar análisis </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormFields />
          <FileDropzone />
        </div>
      </div>
    </div>
  );
}
