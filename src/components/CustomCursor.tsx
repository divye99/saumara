'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const ringXRaw = useMotionValue(-100)
  const ringYRaw = useMotionValue(-100)

  const ringX = useSpring(ringXRaw, { damping: 28, stiffness: 180, mass: 0.5 })
  const ringY = useSpring(ringYRaw, { damping: 28, stiffness: 180, mass: 0.5 })

  const ringScale = useMotionValue(1)
  const dotOpacity = useMotionValue(1)
  const isTouch = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) {
      isTouch.current = true
      return
    }

    document.body.classList.add('cursor-none')

    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringXRaw.set(e.clientX)
      ringYRaw.set(e.clientY)
    }

    const onEnterInteractive = () => {
      ringScale.set(2)
      dotOpacity.set(0)
    }

    const onLeaveInteractive = () => {
      ringScale.set(1)
      dotOpacity.set(1)
    }

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    window.addEventListener('mousemove', moveCursor)
    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.classList.remove('cursor-none')
      observer.disconnect()
    }
  }, [dotOpacity, dotX, dotY, ringScale, ringXRaw, ringYRaw])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          opacity: dotOpacity,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-forest-green pointer-events-none z-[9999]"
      />
      {/* Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ scale: { duration: 0.2 } }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-gold pointer-events-none z-[9999]"
      />
    </>
  )
}
