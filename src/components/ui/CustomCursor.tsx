'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse), (max-width: 768px)').matches) return

    let mx = -100, my = -100, rx = -100, ry = -100
    let rafId: number | null = null

    function stopAnim() {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!rafId) rafId = requestAnimationFrame(anim)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      const hoverable = target.closest('a, button, [data-hoverable]')
      document.body.classList.toggle('cursor-hover', !!hoverable)
    }

    const onLeave = () => {
      document.body.classList.remove('cursor-hover')
    }

    const onVisibilityChange = () => {
      if (document.hidden) stopAnim()
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)

    function anim() {
      if (!dot || !ring) return
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      rafId = document.hidden ? null : requestAnimationFrame(anim)
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      stopAnim()
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
