'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const TOTAL = 51
const BG = '#050505'

function frameSrc(i: number) {
  return `/hero-scroll/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
}

export default function ScrollSequence() {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(false)
  const frameRef = useRef(0)
  const [loaded, setLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const ctaOpacity = useTransform(scrollYProgress, [0.88, 0.96, 1], [0, 1, 1])
  const ctaY = useTransform(scrollYProgress, [0.88, 1], [28, 0])
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14], [1, 1, 0])

  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = imagesRef.current[idx]
    if (!img?.complete || !img.naturalWidth) return

    const dpr = window.devicePixelRatio || 1
    const CW = canvas.width / dpr
    const CH = canvas.height / dpr
    const scale = Math.max(CW / img.naturalWidth, CH / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    const x = (CW - w) / 2
    const y = (CH - h) / 2

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, CW, CH)
    ctx.drawImage(img, x, y, w, h)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      if (loadedRef.current) draw(frameRef.current)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [draw])

  useEffect(() => {
    const imgs: HTMLImageElement[] = new Array(TOTAL)
    let count = 0

    for (let i = 0; i < TOTAL; i++) {
      const img = new Image()
      img.src = frameSrc(i)
      const idx = i
      const finish = () => {
        imgs[idx] = img
        count++
        if (count === TOTAL) {
          imagesRef.current = imgs
          loadedRef.current = true
          setLoaded(true)
          draw(0)
        }
      }
      img.onload = finish
      img.onerror = finish
    }
  }, [draw])

  useEffect(() => {
    return scrollYProgress.on('change', p => {
      if (!loadedRef.current) return
      const idx = Math.min(Math.round(p * (TOTAL - 1)), TOTAL - 1)
      if (idx !== frameRef.current) {
        frameRef.current = idx
        draw(idx)
      }
    })
  }, [scrollYProgress, draw])

  return (
    <>
      {!loaded && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-[#050505]">
          <div className="h-10 w-10 rounded-full border-2 border-white/15 border-t-[#00ff88] animate-spin" />
        </div>
      )}

      <section
        id="hero"
        ref={containerRef}
        className="relative h-[400vh] w-full bg-[#050505]"
      >
        <div className="sticky top-[60px] h-[calc(100vh-60px)] w-full overflow-hidden bg-[#050505]">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <motion.div
            style={{ opacity: scrollHintOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <div className="w-[22px] h-[36px] rounded-[11px] border border-[#00ff88]/45 flex justify-center pt-[6px]">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[2px] h-[6px] rounded-full bg-[#00ff88]"
              />
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-0 flex items-center justify-center px-6 text-center"
          >
            <a
              href="#contact"
              className="border border-[#00ff88]/60 bg-black/60 px-10 py-5 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#00ff88] backdrop-blur-md transition-colors duration-200 hover:border-[#00ffff] hover:text-[#00ffff]"
            >
              Javi se
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
