import { useState, useEffect, memo } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollProgress = memo(() => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible]           = useState(false)

  useEffect(() => {
    const calc = () => {
      const scrolled = document.body.scrollTop || document.documentElement.scrollTop
      const height   = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setScrollProgress((scrolled / height) * 100)
      setIsVisible(scrolled > 80)
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { calc(); ticking = false })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    calc()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Mobile — thin top bar */}
      <div
        className="fixed top-0 left-0 w-full z-[60] md:hidden"
        style={{ height: '2px', background: 'rgba(255,183,3,0.08)' }}
        aria-hidden="true"
      >
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(to right, rgba(255,183,3,0.6), #FFB703)',
          }}
        />
      </div>

      {/* Desktop — circular indicator */}
      <div
        className="hidden md:block fixed bottom-8 right-8 z-50"
        aria-hidden="true"
      >
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" stroke="rgba(255,183,3,0.10)" strokeWidth="2" fill="none" />
            <circle
              cx="24" cy="24" r="20"
              stroke="#FFB703"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-200 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute inset-1.5 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.borderColor = 'rgba(255,183,3,0.25)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)'
              e.currentTarget.style.borderColor = 'var(--border-subtle)'
            }}
            aria-label="Volver arriba"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
})

ScrollProgress.displayName = 'ScrollProgress'
export default ScrollProgress
