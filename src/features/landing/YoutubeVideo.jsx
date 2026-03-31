export default function YoutubeVideo() {
  return (
    <section className="py-24 bg-zinc-950/40 relative">
      <div className="container mx-auto px-6 max-w-5xl text-center space-y-12">
        <div className="space-y-4 timeline-view animate-zoom-in animate-range-[entry_5%_contain_20%]">
          <p className="section-label">Demo General</p>
          <h2 className="font-display text-3xl md:text-5xl text-zinc-100">
            Descubre <span className="text-purple-400">cómo funciona</span>
          </h2>
        </div>
        
        <div className="w-full aspect-video bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden timeline-view animate-blurred-fade-in animate-range-[entry_10%_contain_30%]">
          {/* Iframe Placeholder */}
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/placeholder" 
            title="AI&#39;nFold Demo" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
