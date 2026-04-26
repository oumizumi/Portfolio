import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Oumer Gharad | CS Student & Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top label */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#A8C5DA', marginRight: '14px' }} />
          <span style={{ color: '#A8C5DA', fontSize: '14px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 400 }}>
            oumizumi.vercel.app
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            color: '#F6F6F6',
            fontSize: '80px',
            fontWeight: 300,
            lineHeight: 1.05,
            margin: '0 0 28px',
            letterSpacing: '-0.03em',
          }}
        >
          Oumer Gharad
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: 'rgba(246,246,246,0.55)',
            fontSize: '26px',
            fontWeight: 300,
            margin: '0 0 48px',
            lineHeight: 1.4,
          }}
        >
          CS student at uOttawa · building clean interfaces &amp; reliable systems
        </p>

        {/* Bottom row */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Software', 'Machine Learning', 'Research'].map((tag) => (
            <div
              key={tag}
              style={{
                border: '1px solid rgba(168,197,218,0.3)',
                borderRadius: '999px',
                padding: '8px 20px',
                color: '#A8C5DA',
                fontSize: '14px',
                letterSpacing: '0.04em',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
