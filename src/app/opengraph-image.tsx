import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 72,
          background: '#000',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: '#00ff88', fontWeight: 700 }}>
          ZAGREB / DESIGN / WEB
        </div>
        <div style={{ marginTop: 44, fontSize: 128, lineHeight: 0.9, fontWeight: 900 }}>
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 32, fontSize: 48, color: '#00ffff', fontWeight: 800 }}>
          Dizajniramo. Razvijamo. Realiziramo.
        </div>
      </div>
    ),
    size,
  )
}
