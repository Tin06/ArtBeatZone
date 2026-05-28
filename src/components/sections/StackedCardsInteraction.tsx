'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface CardData {
  image?: string
  accentClass?: string
}

const fallbackAccents = [
  'from-[#050505] via-[#151515] to-[#00ff8840]',
  'from-[#050505] via-[#151515] to-[#00ffff35]',
  'from-[#050505] via-[#151515] to-[#ff00ff35]',
]

function Card({
  className,
  image,
  accentClass,
}: {
  className?: string
  image?: string
  accentClass?: string
}) {
  return (
    <div
      className={cn(
        'h-[320px] w-[min(100%,320px)] overflow-hidden border border-white/15 bg-[#050505] shadow-[0_18px_60px_rgba(0,0,0,0.32)] sm:h-[360px] lg:h-[400px] lg:w-[350px]',
        className
      )}
    >
      <div className="m-2 h-[calc(100%-1rem)] overflow-hidden border border-white/10 bg-black">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <div className={cn('h-full w-full bg-gradient-to-br', accentClass)} />
        )}
      </div>
    </div>
  )
}

export default function StackedCardsInteraction({
  cards,
  spreadDistance = 34,
  rotationAngle = 4,
  animationDelay = 0.06,
}: {
  cards: CardData[]
  spreadDistance?: number
  rotationAngle?: number
  animationDelay?: number
}) {
  const safeCards = cards.length > 0 ? cards.slice(0, 3) : []
  const [isHovering, setIsHovering] = useState(false)
  // order[0] = front card index, order[1] = back-left, order[2] = back-right
  const [order, setOrder] = useState(() => safeCards.map((_, i) => i))

  if (safeCards.length === 0) return null

  function cycleCards() {
    setOrder(prev => {
      const next = [...prev]
      const front = next.shift()!
      next.push(front)
      return next
    })
  }

  return (
    <div
      className="relative flex h-[390px] w-full cursor-pointer select-none items-center justify-center overflow-visible sm:h-[430px] lg:h-full"
      aria-hidden="true"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={cycleCards}
    >
      <div className="relative h-[320px] w-[min(100%,320px)] sm:h-[360px] lg:h-[400px] lg:w-[350px]">
        {safeCards.map((card, i) => {
          const slot = order.indexOf(i) // 0=front, 1=back-left, 2=back-right
          const isFirst = slot === 0
          const xOffset = slot === 1 ? -spreadDistance : slot === 2 ? spreadDistance : 0
          const rotation = slot === 1 ? -rotationAngle : slot === 2 ? rotationAngle : 0
          const zIndex = slot === 0 ? 20 : slot === 1 ? 11 : 10

          return (
            <motion.div
              key={`card-${i}`}
              className="absolute inset-0"
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                scale: isHovering && !isFirst ? 0.96 : 1,
                zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 210,
                damping: 24,
                delay: isHovering ? slot * animationDelay : 0,
              }}
            >
              <Card
                image={card.image}
                accentClass={card.accentClass ?? fallbackAccents[i]}
                className={isFirst ? 'border-[#00ff88]/45' : ''}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
