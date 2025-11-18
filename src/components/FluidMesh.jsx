import { useEffect, useRef } from 'react'

// Simple WebGL-ish background using canvas with gradient mesh + grain overlay
export default function FluidMesh({ scrollProgress = 0 }) {
  const canvasRef = useRef(null)
  const grainRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let animationId
    let t0 = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t) => {
      const time = (t - t0) / 1000
      const { innerWidth: w, innerHeight: h } = window

      // Base radial gradient hunter green to charcoal, morph slightly with time
      const cx = w * 0.65 + Math.sin(time / 45) * 40
      const cy = h * 0.5 + Math.cos(time / 45) * 40
      const r = Math.max(w, h)

      const grad = ctx.createRadialGradient(cx, cy, r * 0.05, cx, cy, r * 0.9)
      grad.addColorStop(0, 'rgba(44,95,77,0.55)')
      grad.addColorStop(0.4, 'rgba(26,26,26,0.85)')
      grad.addColorStop(1, 'rgba(26,26,26,1)')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Add subtle organic blobs by drawing translucent circles that move slowly
      const blobCount = 4
      for (let i = 0; i < blobCount; i++) {
        const bx = cx + Math.sin(time / 15 + i) * (120 + i * 30)
        const by = cy + Math.cos(time / 18 + i) * (90 + i * 22)
        const br = (180 + i * 40) * (1 - scrollProgress * 0.2)
        const alpha = 0.06
        ctx.fillStyle = `rgba(44,95,77,${alpha})`
        ctx.beginPath()
        ctx.arc(bx, by, br, 0, Math.PI * 2)
        ctx.fill()
      }

      // Grain overlay
      if (!grainRef.current) {
        const g = document.createElement('canvas')
        const gctx = g.getContext('2d')
        const gw = 200, gh = 200
        g.width = gw
        g.height = gh
        const imgData = gctx.createImageData(gw, gh)
        for (let i = 0; i < imgData.data.length; i += 4) {
          const v = Math.random() * 255
          imgData.data[i] = v
          imgData.data[i + 1] = v
          imgData.data[i + 2] = v
          imgData.data[i + 3] = 8 // 5% opacity when tiled
        }
        gctx.putImageData(imgData, 0, 0)
        grainRef.current = g
      }
      const pattern = ctx.createPattern(grainRef.current, 'repeat')
      if (pattern) {
        ctx.globalCompositeOperation = 'overlay'
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, w, h)
        ctx.globalCompositeOperation = 'source-over'
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [scrollProgress])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  )
}
