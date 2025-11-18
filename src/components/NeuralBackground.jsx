import { useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'

export default function NeuralBackground({ scrollProgress = 0 }) {
  const containerRef = useRef(null)

  // Apply scroll-based transforms (scale down and move up)
  const scale = 1 - scrollProgress * 0.3 // down to ~0.7
  const translateY = -150 * scrollProgress // up to -150px

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 h-screen w-[60vw] min-w-[640px] max-w-[1100px] pointer-events-auto"
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        transformOrigin: 'right center',
        transition: 'transform 0.1s linear',
      }}
    >
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/yji5KWXyD-xKVkWj/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
