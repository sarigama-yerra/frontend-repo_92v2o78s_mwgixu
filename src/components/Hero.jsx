import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import NeuralBackground from './NeuralBackground'
import FluidMesh from './FluidMesh'

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, y / vh))
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

export default function Hero() {
  const progress = useScrollProgress()

  const headlineLines = [
    'We Engineer',
    'Attention,',
    'Emotion,',
    'Action.'
  ]

  const headlineVariants = {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 8 },
    visible: i => ({
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { delay: 0.5 + i * 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    })
  }

  const subheadDelay = 0.5 + headlineLines.length * 0.8 + 1.2

  // Scroll-affect for headline group
  const headlineScale = 1 - progress * 0.15 // down to ~0.85
  const headlineOpacity = 1 - progress * 0.7 // down to ~0.3

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1A1A1A] text-white">
      {/* Fluid organic background */}
      <FluidMesh scrollProgress={progress} />

      {/* Spline neural network on the right 60% */}
      <NeuralBackground scrollProgress={progress} />

      {/* Left content */}
      <div
        className="relative z-10 max-w-3xl px-6 sm:px-10 md:px-16"
        style={{
          width: '45vw',
          minWidth: 560,
          paddingTop: '15vh',
          paddingBottom: '15vh',
        }}
      >
        <div className="pointer-events-auto">
          <div
            className="mb-8"
            style={{ transform: `scale(${headlineScale})`, transformOrigin: 'left center', opacity: headlineOpacity }}
          >
            {headlineLines.map((line, i) => (
              <motion.h1
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="text-[64px] leading-[1.1] tracking-[-0.02em] text-[#FAFAFA]"
                style={{
                  textRendering: 'optimizeLegibility',
                  fontFamily: '"Playfair Display", serif'
                }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: subheadDelay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-[18px] leading-[1.6] text-[#999999]"
            style={{ maxWidth: '60ch', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
          >
            Psychology-driven design for brands that demand measurable results.
          </motion.p>

          {/* Data ticker */}
          <Ticker startDelay={subheadDelay + 0.6} />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: subheadDelay + 1.6, duration: 0.6 }}
            className="mt-16"
          >
            <a
              href="#framework"
              className="inline-block bg-[#2C5F4D] text-white text-[16px] font-medium px-9 py-4 rounded-[4px] shadow-[0_8px_24px_rgba(44,95,77,0.3)] hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif' }}
            >
              Explore The Framework →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}

function Ticker({ startDelay = 0 }) {
  const items = useMemo(() => ([
    'Currently accepting 3 clients this quarter',
    '127% average conversion lift',
    '50+ brands transformed'
  ]), [])

  const [index, setIndex] = useState(0)
  useEffect(() => {
    const startTimer = setTimeout(() => {
      const id = setInterval(() => setIndex(i => (i + 1) % items.length), 2600)
      // store id on window for cleanup alternative
      window.__tickerId = id
    }, startDelay * 1000)
    return () => {
      clearTimeout(startTimer)
      if (window.__tickerId) clearInterval(window.__tickerId)
    }
  }, [items.length, startDelay])

  return (
    <div className="mt-10 text-[#2C5F4D] text-[14px] h-6 overflow-hidden" style={{ fontFamily: '"Space Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.5 }}
      >
        {items[index]}
      </motion.div>
    </div>
  )
}

function ScrollIndicator() {
  const [hide, setHide] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setHide(true), 3000)
    const onScroll = () => setHide(true)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hide ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-3 text-[#2C5F4D]"
    >
      <span className="text-xs tracking-wide text-[#A3B8B1]">Scroll to see psychology in action</span>
      <div className="relative h-[60px] w-px bg-[#2C5F4D]">
        <motion.span
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#2C5F4D]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
