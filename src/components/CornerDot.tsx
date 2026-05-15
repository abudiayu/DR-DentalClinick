interface CornerDotProps {
  position: 'tl' | 'tr' | 'bl' | 'br'
}

export default function CornerDot({ position }: CornerDotProps) {
  const base = 'absolute w-1.5 h-1.5 rounded-full bg-[#94A3B8]'
  const pos = {
    tl: 'top-3 left-3',
    tr: 'top-3 right-3',
    bl: 'bottom-3 left-3',
    br: 'bottom-3 right-3',
  }[position]

  return <span className={`${base} ${pos}`} />
}
