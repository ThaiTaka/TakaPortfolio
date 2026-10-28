import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Props {
  src: string
  className?: string
  /** Mirror vertically (used by the footer). */
  flip?: boolean
  /** Wait until the element is near the viewport before loading anything. */
  lazy?: boolean
}

/**
 * Muted looping HLS background. A dark textured fallback is always rendered
 * underneath, so a blocked, slow or failed stream never leaves an empty section.
 * hls.js is imported on demand and destroyed on unmount.
 */
export function VideoBackground({ src, className = '', flip = false, lazy = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const [near, setNear] = useState(!lazy)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!lazy || near) return
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [lazy, near])

  useEffect(() => {
    const video = videoRef.current
    if (!near || reduced || !video) return

    let cancelled = false
    let destroy: (() => void) | undefined
    const onPlaying = () => setPlaying(true)
    const onError = () => setPlaying(false)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('error', onError)

    const start = () => void video.play().catch(() => setPlaying(false))

    void (async () => {
      try {
        // hls.js first: recent Chrome builds answer "maybe" to the native HLS probe
        // yet fail to play the stream, so native playback is only the fallback.
        const { default: Hls } = await import('hls.js')
        if (cancelled) return
        if (Hls.isSupported()) {
          const hls = new Hls({ maxBufferLength: 12, capLevelToPlayerSize: true })
          hls.on(Hls.Events.ERROR, (_e, data) => {
            if (data.fatal) {
              setPlaying(false)
              hls.destroy()
            }
          })
          hls.on(Hls.Events.MANIFEST_PARSED, start)
          hls.loadSource(src)
          hls.attachMedia(video)
          destroy = () => hls.destroy()
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = src
          start()
        }
      } catch {
        setPlaying(false)
      }
    })()

    // Pause when scrolled away to save CPU/battery.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (entry.isIntersecting) start()
      else video.pause()
    })
    io.observe(video)

    return () => {
      cancelled = true
      io.disconnect()
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('error', onError)
      destroy?.()
      video.removeAttribute('src')
      video.load()
    }
  }, [near, reduced, src])

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden bg-bg ${className}`} aria-hidden="true">
      {/* Fallback texture: always present, never depends on the network */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 70% 20%, rgba(78,133,191,0.22), transparent 70%), radial-gradient(50% 60% at 15% 80%, rgba(137,170,204,0.12), transparent 70%)',
        }}
      />
      {!reduced && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            playing ? 'opacity-100' : 'opacity-0'
          } ${flip ? '-scale-y-100' : ''}`}
        />
      )}
    </div>
  )
}
