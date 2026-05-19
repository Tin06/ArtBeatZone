'use client'

import { useEffect, useRef } from 'react'

const ANGLE_POOL = [0, 15, 25, 30, 40, 45, 60, -15, -25, -30, -40, -45, -60].map(
  angle => (angle * Math.PI) / 180,
)

interface Line {
  color: string
  speed: number
  width: number
  glow: number
  trailLength: number
  path: { x: number; y: number }[]
  hx: number
  hy: number
  angle: number
  segLeft: number
}

const CONFIGS: Omit<Line, 'path' | 'hx' | 'hy' | 'angle' | 'segLeft'>[] = [
  { color: '#00ff88', speed: 1.65, width: 2.5, glow: 14, trailLength: 340 },
  { color: '#00ffff', speed: 1.45, width: 2,   glow: 11, trailLength: 280 },
  { color: '#ff8800', speed: 1.75, width: 3,   glow: 18, trailLength: 300 },
  { color: '#00ff88', speed: 1.4,  width: 1.5, glow: 9,  trailLength: 200 },
  { color: '#ff8800', speed: 1.55, width: 2,   glow: 15, trailLength: 260 },
  { color: '#00ffff', speed: 1.7,  width: 2.5, glow: 12, trailLength: 320 },
  { color: '#ff00ff', speed: 1.5,  width: 2,   glow: 13, trailLength: 310 },
  { color: '#00ff88', speed: 1.6,  width: 1.5, glow: 10, trailLength: 240 },
  { color: '#00ffff', speed: 1.8,  width: 3,   glow: 16, trailLength: 290 },
  { color: '#ff8800', speed: 1.35, width: 2,   glow: 12, trailLength: 220 },
  { color: '#ff00ff', speed: 1.7,  width: 2.5, glow: 15, trailLength: 330 },
  { color: '#00ff88', speed: 1.45, width: 2,   glow: 11, trailLength: 270 },
]

function pickAngle() {
  return ANGLE_POOL[Math.floor(Math.random() * ANGLE_POOL.length)]
}

function pickSegLen() {
  return 70 + Math.random() * 200
}

export default function NeonLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return
    const contextMaybe = canvasEl.getContext('2d')
    if (!contextMaybe) return
    const context: CanvasRenderingContext2D = contextMaybe
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let animId: number
    let width = 0
    let height = 0
    let isVisible = true

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = canvasEl!.offsetWidth
      height = canvasEl!.offsetHeight
      canvasEl!.width = width * dpr
      canvasEl!.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function makeLine(cfg: (typeof CONFIGS)[0], staggerX: number): Line {
      const hy = height * (0.06 + Math.random() * 0.88)
      return {
        ...cfg,
        hx: staggerX,
        hy,
        angle: pickAngle(),
        segLeft: pickSegLen(),
        path: [{ x: staggerX, y: hy }],
      }
    }

    function resetLine(line: Line) {
      line.hx = -12
      line.hy = height * (0.06 + Math.random() * 0.88)
      line.angle = pickAngle()
      line.segLeft = pickSegLen()
      line.path = [{ x: line.hx, y: line.hy }]
    }

    resize()
    window.addEventListener('resize', resize)

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    observer.observe(canvasEl)

    const onVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    const lines: Line[] = CONFIGS.map((cfg, i) =>
      makeLine(cfg, -(i * 180 + Math.random() * 120)),
    )

    function update() {
      for (const line of lines) {
        line.hx += line.speed * Math.cos(line.angle)
        line.hy += line.speed * Math.sin(line.angle)

        if (line.hy < 8) {
          line.hy = 8
          line.angle = Math.abs(line.angle)
          line.segLeft = pickSegLen()
        } else if (line.hy > height - 8) {
          line.hy = height - 8
          line.angle = -Math.abs(line.angle)
          line.segLeft = pickSegLen()
        }

        line.segLeft -= line.speed
        if (line.segLeft <= 0) {
          line.angle = pickAngle()
          line.segLeft = pickSegLen()
        }

        line.path.push({ x: line.hx, y: line.hy })
        if (line.path.length > 900) line.path.splice(0, 400)
        if (line.hx > width + line.trailLength + 20) resetLine(line)
      }
    }

    function drawLine(line: Line) {
      const { path, trailLength, color, width: lineWidth, glow } = line
      if (path.length < 2) return

      let dist = 0
      let tailIdx = 0
      for (let i = path.length - 1; i > 0; i--) {
        const dx = path[i].x - path[i - 1].x
        const dy = path[i].y - path[i - 1].y
        dist += Math.sqrt(dx * dx + dy * dy)
        if (dist >= trailLength) {
          tailIdx = i
          break
        }
      }

      const visLen = path.length - tailIdx
      if (visLen < 2) return

      // Halo — single stroke, reduced blur
      context.save()
      context.strokeStyle = color
      context.lineWidth = lineWidth + 6
      context.shadowColor = color
      context.shadowBlur = glow
      context.globalAlpha = 0.12
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.beginPath()
      context.moveTo(path[tailIdx].x, path[tailIdx].y)
      for (let i = tailIdx + 1; i < path.length; i++) context.lineTo(path[i].x, path[i].y)
      context.stroke()
      context.restore()

      // Core — 8 alpha steps instead of per-segment stroke
      context.save()
      context.strokeStyle = color
      context.lineWidth = lineWidth
      context.shadowColor = color
      context.shadowBlur = glow
      context.lineCap = 'round'
      context.lineJoin = 'round'
      const STEPS = 8
      const segPerStep = Math.ceil(visLen / STEPS)
      for (let step = 0; step < STEPS; step++) {
        const s = tailIdx + step * segPerStep
        if (s >= path.length - 1) break
        const e = Math.min(s + segPerStep, path.length - 1)
        context.globalAlpha = ((step + 1) / STEPS) * 0.8
        context.beginPath()
        context.moveTo(path[s].x, path[s].y)
        for (let i = s + 1; i <= e; i++) context.lineTo(path[i].x, path[i].y)
        context.stroke()
      }
      context.restore()

      // Head dot
      context.save()
      const head = path[path.length - 1]
      context.globalAlpha = 0.95
      context.shadowColor = color
      context.shadowBlur = glow * 2
      context.fillStyle = '#ffffff'
      context.beginPath()
      context.arc(head.x, head.y, lineWidth * 0.9, 0, Math.PI * 2)
      context.fill()
      context.restore()
    }

    function draw() {
      if (!isVisible) {
        animId = requestAnimationFrame(draw)
        return
      }

      context.clearRect(0, 0, width, height)
      update()
      for (const line of lines) drawLine(line)
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50"
    />
  )
}
