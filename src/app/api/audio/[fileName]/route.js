import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = "/app/public/uploads";

export async function GET(request, { params }) {
  const { fileName } = await params;

  // Sanitize: solo permitir nombres de archivo simples (sin path traversal)
  if (!fileName || fileName.includes("..") || fileName.includes("/")) {
    return new Response("Invalid file name", { status: 400 });
  }

  const filePath = join(UPLOAD_DIR, fileName);

  if (!existsSync(filePath)) {
    return new Response("Audio file not found", { status: 404 });
  }

  try {
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600",
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error("[audio-route] Error reading file:", err);
    return new Response("Error reading audio file", { status: 500 });
  }
}
