'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function formatNumber(value: number, decimals: number): string {
  if (decimals > 0) {
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(
      value,
    );
  }
  return new Intl.NumberFormat(undefined).format(Math.round(value));
}

export default function CountUp({
  value,
  durationMs = 1200,
  className,
}: {
  value: string | number;
  durationMs?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState<string>(String(value));

  const { target, decimals, prefix, suffix, isNumeric } = useMemo(() => {
    const raw = String(value).trim();
    const numMatch = raw.match(/[0-9.,]+/);
    const before = raw.slice(0, numMatch?.index ?? 0);
    const numberPart = numMatch ? numMatch[0] : '';
    const after = numMatch ? raw.slice((numMatch.index ?? 0) + numberPart.length) : '';
    const normalized = numberPart.replace(/,/g, '');
    const hasDecimal = /\./.test(normalized);
    const parsed = normalized ? parseFloat(normalized) : NaN;
    const numeric = !Number.isNaN(parsed);
    return {
      target: numeric ? parsed : 0,
      decimals: numeric && hasDecimal ? (normalized.split('.')[1]?.length ?? 0) : 0,
      prefix: before,
      suffix: after,
      isNumeric: numeric,
    };
  }, [value]);

  useEffect(() => {
    if (!inView || !isNumeric) {
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      setDisplay(prefix + formatNumber(current, decimals) + suffix);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, target, prefix, suffix, decimals, durationMs]);

  return (
    <span ref={containerRef} className={className}>
      {display}
    </span>
  );
}