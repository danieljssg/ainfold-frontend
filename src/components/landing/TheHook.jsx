export default function TheHook() {
  return (
    <section className="py-24 bg-zinc-950/50 border-y border-zinc-900 overflow-hidden relative">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 max-w-4xl space-y-12">
        <div className="space-y-4">
          <p className="section-label text-purple-400">El Factor Humano</p>
          <h2 className="font-display text-4xl md:text-5xl text-zinc-100 leading-tight">
            Descubriendo las <span className="italic font-serif">Habilidades Transferibles</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8">
            <blockquote className="space-y-6">
              <p className="text-xl md:text-2xl text-zinc-300 font-serif leading-relaxed italic">
                &quot;Uno de los retos en RRHH, sobre todo en Venezuela, es que
                bajo diversas circunstancias… El ingeniero aprendió repostería,
                la contadora es manicurista, el Dev aprendió a ser barista y el
                médico es locutor.&quot;
              </p>
              <footer className="text-zinc-500 text-sm font-medium tracking-wide border-l-2 border-purple-500 pl-6 space-y-1">
                <p className="text-zinc-300">Daniel Saud</p>
                <p>Fundador de AI&apos;nFold</p>
              </footer>
            </blockquote>
          </div>
          <div className="md:col-span-4 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl space-y-4 rotate-2 hover:rotate-0 transition-transform duration-500">
            <h4 className="text-purple-400 font-bold text-sm uppercase tracking-widest">
              El Propósito
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              No basta con la técnica. Son esos detalles que pasan desapercibidos
              los que marcan la diferencia. AI&apos;nFold explora qué te apasiona
              y cómo eso se transfiere a tu trabajo diario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
