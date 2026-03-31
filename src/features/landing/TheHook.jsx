export default function TheHook() {
  return (
    <section className="py-24 bg-zinc-950/50 border-y border-zinc-900 overflow-hidden relative">
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] rounded-full" />

      <div className="container mx-auto px-6 max-w-4xl space-y-12">
        <div className="space-y-4 timeline-view animate-zoom-in animate-range-[entry_5%_contain_20%]">
          <p className="section-label text-purple-400">El Factor Humano</p>
          <h2 className="font-display text-3xl md:text-5xl text-zinc-100 leading-tight">
            Descubriendo las <span className="italic font-serif">Historias Reales</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%]">
            <blockquote className="space-y-6">
              <p className="text-lg md:text-2xl text-zinc-300 font-serif leading-relaxed italic">
                &quot;Es común ir a entrevistas de trabajo o recibir ghosting, porque &lsquo;no tienes experiencia&rsquo; o tu currículum no refleja todo lo que haces.
                El reto real es que los perfiles híbridos no logran comunicar su verdadero talento. Todos tenemos una historia que merece ser contada.&quot;
              </p>
              <footer className="text-zinc-500 text-sm font-medium tracking-wide border-l-2 border-purple-500 pl-6 space-y-1">
                <p className="text-zinc-300">Daniel Saud</p>
                <p>Fundador de AI&apos;nFold</p>
              </footer>
            </blockquote>
          </div>
          <div className="md:col-span-4 bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-3xl space-y-4 rotate-2 hover:rotate-0 transition-transform duration-500 timeline-view animate-blurred-fade-in animate-range-[entry_5%_contain_20%]">
            <h4 className="text-purple-400 font-bold text-xs uppercase tracking-widest">
              El Propósito
            </h4>
            <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
              El ingeniero telemático dedicado a la repostería o el desarrollador cuya pasión es el filmmaking. AI&apos;nFold analiza tu trayectoria para contar tu historia, devolviendo el factor Humano a lo que llamamos Recursos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
