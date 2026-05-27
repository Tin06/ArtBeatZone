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
  const [isHovering, setIsHovering] = useState(false)
  const safeCards = cards.length > 0 ? cards.slice(0, 3) : []

  if (safeCards.length === 0) return null

  return (
    <div
      className="relative flex h-[390px] w-full items-center justify-center overflow-visible sm:h-[430px] lg:h-full"
      aria-hidden="true"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-[320px] w-[min(100%,320px)] sm:h-[360px] lg:h-[400px] lg:w-[350px]">
        {safeCards.map((card, index) => {
          const isFirst = index === 0
          const xOffset = index === 1 ? -spreadDistance : index === 2 ? spreadDistance : 0
          const rotation = index === 1 ? -rotationAngle : index === 2 ? rotationAngle : 0

          return (
            <motion.div
              key={`${card.image ?? card.accentClass ?? 'card'}-${index}`}
              className={cn('absolute inset-0', isFirst ? 'z-20' : 'z-10')}
              initial={{ x: 0, rotate: 0, scale: 1 }}
              animate={{
                x: isHovering ? xOffset : 0,
                rotate: isHovering ? rotation : 0,
                scale: isHovering && !isFirst ? 0.96 : 1,
                zIndex: isFirst ? 20 : 10 - index,
              }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
                delay: index * animationDelay,
                type: 'spring',
                stiffness: 210,
                damping: 24,
              }}
            >
              <Card image={card.image} accentClass={card.accentClass ?? fallbackAccents[index]} className={isFirst ? 'border-[#00ff88]/45' : ''} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
