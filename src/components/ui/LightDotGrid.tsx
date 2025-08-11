"use client";

export default function LightDotGrid() {
  // Light mode only overlay (hidden in dark mode)
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[12] block dark:hidden"
      style={{
        WebkitMaskImage:
          "radial-gradient(900px 600px at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)",
        maskImage:
          "radial-gradient(900px 600px at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 70%, rgba(0,0,0,1) 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.35 }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1.1" fill="#94a3b8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
    </div>
  );
}
