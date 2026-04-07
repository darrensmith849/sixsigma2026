interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Pure-CSS infinite horizontal scroller. Children are rendered TWICE so that
 * the -50% translation in the marquee keyframe creates a seamless loop.
 */
export default function Marquee({ children, className = "" }: MarqueeProps) {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center gap-16 py-2">
        <div className="flex items-center gap-16 shrink-0">{children}</div>
        <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
