interface Props {
  src: string
  alt: string
  size?: number
  className?: string
}

/** Circular logo with the accent-gradient ring and a thin dark inner ring. */
export function GradientBorder({ src, alt, size = 40, className = '' }: Props) {
  return (
    <span
      className={`accent-gradient group relative inline-flex shrink-0 rounded-full p-[2px] transition-transform duration-300 hover:scale-110 ${className}`}
      style={{ width: size, height: size, backgroundSize: '200% 200%' }}
    >
      <span className="block h-full w-full rounded-full bg-bg p-[2px]">
        <img
          src={src}
          alt={alt}
          width={size * 2}
          height={size * 2}
          decoding="async"
          className="h-full w-full rounded-full object-cover"
        />
      </span>
    </span>
  )
}
