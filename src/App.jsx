import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Hero />

      {/* Placeholder next section to allow scroll behavior demonstration */}
      <section id="framework" className="relative z-10 bg-[#121212] text-white px-6 sm:px-10 md:px-16 py-24">
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
            The Psychology-First Framework
          </h2>
          <p className="text-[#BDBDBD] leading-relaxed max-w-prose" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}>
            We align cognitive biases, motivational triggers, and brand narratives into a cohesive system that engineers attention, emotion, and action. The details below demonstrate the rigor behind every design decision without breaking the spell.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
