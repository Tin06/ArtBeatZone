'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const hoverable = target.closest('a, button, [data-hoverable]')
      document.body.classList.toggle('cursor-hover', !!hoverable)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    function anim() {
      if (!dot || !ring) return
      dot.style.left = mx + 'px'
      dot.style.top = my + 'px'
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      ring.style.left = rx + 'px'
      ring.style.top = ry + 'px'
      rafId = requestAnimationFrame(anim)
    }
    rafId = requestAnimationFrame(anim)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
