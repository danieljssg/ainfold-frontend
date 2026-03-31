import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-zinc-accent backdrop-blur-lg hover:bg-purple-950/15 transition-all ease-in-out duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <p className="text-[10px] text-zinc-400 font-medium tracking-[0.2em] opacity-70">
            El contenido generado con IA puede cometer errores. Verifica la
            información importante.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-400">
          <div className="text-[10px] md:text-xs font-medium order-2 md:order-1 text-center md:text-left">
            <span className="text-purple-100 opacity-80">Hackaton</span> ·
            <a
              href="https://midu.dev/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 transition-colors p-1"
            >
              MiduDev
            </a>{" "}
            /{" "}
            <a
              href="https://cubepath.com/"
              target="_blank"
              rel="noreferrer"
              className="text-green-400 transition-colors p-1"
            >
              CubePath
            </a>
          </div>

          <div className="text-[10px] md:text-xs font-medium order-3 md:order-2 opacity-50">
            © {new Date().getFullYear()} AI'nFold
          </div>

          <div className="flex items-center gap-4 order-1 md:order-3">
            <span className="text-xs font-semibold text-zinc-300 inline ">
              Daniel Saud
            </span>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/danieljssg"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors p-1"
                aria-label="Github"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/danielsaud/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="mailto:danieljssg@gmail.com"
                className="hover:text-purple-400 transition-colors p-1"
                aria-label="Email"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
