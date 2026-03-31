import {
  Server,
  Layers,
  Database,
  Cpu,
  Globe,
  ShieldCheck,
} from "lucide-react";

const STACK = [
  {
    icon: Globe,
    title: "Frontend",
    desc: "Next.js, Tailwind v4, Recharts, Framer Motion.",
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Node.js, Express, MongoDB as NoSQL.",
  },
  {
    icon: Layers,
    title: "IA & Voz",
    desc: "OpenRouter & Kokoro-TTS (Self-hosted).",
  },
  {
    icon: Database,
    title: "Message Broker",
    desc: "Valkey (Fork Open Source de Redis) & BullMQ.",
  },
];

export default function TechStack() {
  return (
    <section className="py-24 bg-zinc-950/40 relative">
      <div className="container mx-auto px-6 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-xl timeline-view animate-zoom-in animate-range-[entry_5%_contain_20%]">
            <p className="section-label">Obras de ingeniería</p>
            <h2 className="font-display text-4xl md:text-5xl text-zinc-100">
              Stack Tecnológico <span className="text-purple-400">&</span>{" "}
              Infraestructura
            </h2>
            <p className="text-zinc-400">
              Un ecosistema completo orquestado sobre una sola instancia
              GP.Micro de CubePath.
            </p>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 timeline-view animate-zoom-in animate-range-[entry_5%_contain_20%]">
            <Cpu className="w-5 h-5 text-purple-400" />
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                Server Instance
              </span>
              <span className="text-zinc-100 text-sm font-bold">
                GP.Micro (2 vCPU / 4 GB RAM)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STACK.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/30 hover:bg-zinc-900 transition-all group timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%]"
            >
              <item.icon className="w-8 h-8 text-zinc-500 group-hover:text-purple-400 transition-colors mb-6" />
              <h4 className="text-zinc-100 font-bold mb-3">{item.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-br from-purple-500/10 to-transparent border border-purple-500/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative timeline-view animate-zoom-in animate-range-[entry_10%_contain_30%]">
          <ShieldCheck className="absolute top-8 right-8 w-24 h-24 text-purple-500/5 -rotate-12" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-display text-zinc-100 italic">
                El corazón de la infraestructura
              </h3>
              <p className="text-zinc-400 leading-relaxed max-w-lg">
                Combinamos <strong>Valkey</strong> (Fork Open Source de Redis)
                para asegurar el procesamiento asíncrono y{" "}
                <strong>Dokploy</strong> para la orquestación. La instancia
                Cubepath de 4GB de RAM utiliza 4GB de Swap para garantizar la
                estabilidad durante el procesamiento de voz por Kokoro-TTS.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-purple-300 text-xs font-bold">
                  TTL Automático (1h)
                </span>
                <span className="px-4 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-purple-300 text-xs font-bold">
                  Sequential Workers
                </span>
                <span className="px-4 py-2 rounded-xl bg-zinc-950/80 border border-zinc-800 text-purple-300 text-xs font-bold">
                  Dockerized Stack
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Uptime", val: "99.9%" },
                { label: "Latency", val: "~45ms" },
                { label: "Data TTL", val: "1 Hour" },
                { label: "TTS Concurrency", val: "Queue: 1" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-950/50 border border-zinc-800 text-center"
                >
                  <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-zinc-100 text-xl font-display">
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 col-span-1 lg:col-span-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm text-zinc-400">
                  <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-300 font-display">
                    <tr>
                      <th className="px-4 md:px-6 py-3 font-medium">
                        Servicio
                      </th>
                      <th className="px-4 md:px-6 py-3 font-medium">CPU</th>
                      <th className="px-4 md:px-6 py-3 font-medium">RAM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {[
                      { s: "frontend (Next.js)", c: "0.75 vCPU", r: "768 MB" },
                      { s: "api (Express)", c: "0.5 vCPU", r: "512 MB" },
                      {
                        s: "worker (BullMQ + analysis)",
                        c: "1 vCPU",
                        r: "1 GB",
                      },
                      { s: "kokoro-tts", c: "1 vCPU", r: "2 GB" },
                      { s: "MongoDB", c: "0.25 vCPU", r: "512 MB" },
                      { s: "Valkey/Redis", c: "0.15 vCPU", r: "256 MB" },
                      { s: "worker-monitor", c: "0.15 vCPU", r: "128 MB" },
                    ].map((row) => (
                      <tr
                        key={row.s}
                        className="hover:bg-zinc-900/50 transition-colors"
                      >
                        <td className="px-4 md:px-6 py-3 font-medium text-zinc-300">
                          {row.s}
                        </td>
                        <td className="px-4 md:px-6 py-3 font-mono text-zinc-500">
                          {row.c}
                        </td>
                        <td className="px-4 md:px-6 py-3 font-mono text-purple-300">
                          {row.r}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
