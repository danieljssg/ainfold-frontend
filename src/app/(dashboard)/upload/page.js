import Navigation from "@/components/layout/Navigation";
import FileDropzone from "@/components/FileDropzone";
import FormFields from "@/components/FormFields";

export const metadata = {
  title: "Subir CV | AI'nFold",
  description: "Sube tu CV para análisis inteligente",
};

export default function UploadPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 container">
      <section id="upload">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileDropzone />
          <FormFields />
        </div>
      </section>
    </div>
  );
}
