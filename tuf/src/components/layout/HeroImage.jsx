import React from 'react'

const MONTH_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=85', alt: 'Snowy winter landscape' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85', alt: 'Misty forest in early spring' },
  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=1200&q=85', alt: 'Cherry blossoms in bloom' },
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=85', alt: 'Spring meadow flowers' },
  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=1200&q=85', alt: 'Bright spring hillside' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', alt: 'Sunlit summer mountain' },
  { url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85', alt: 'Warm beach sunset' },
  { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=85', alt: 'Golden summer valley' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85', alt: 'Autumn forest foliage' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85', alt: 'Fall leaves on water' },
  { url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=85', alt: 'Late autumn bare trees' },
  { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=85', alt: 'Winter snow scene' },
]

export default function HeroImage({ currentMonth, currentYear, monthName }) {
  const image = MONTH_IMAGES[currentMonth]

  return (
    <div className="relative overflow-visible" style={{ height: '220px' }}>
      {/* Photo */}
      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '2rem 2rem 0 0' }}>
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 40%' }}
          loading="lazy"
        />
        {/* Deep gradient — heavy at bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        {/* Subtle warm tint overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(20, 50, 90, 0.12)', mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Month accent badge — bleeds out of hero into the body below */}
      <div
        className="absolute left-7 flex flex-col"
        style={{
          bottom: '-28px',
          zIndex: 20,
        }}
      >
        <div
          className="flex items-end gap-3"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '14px',
            padding: '14px 22px 16px 22px',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.38), 0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          <span
            className="text-white font-bold leading-none tracking-tight"
            style={{ fontSize: '2.6rem', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            {monthName}
          </span>
          <span
            className="text-blue-200 font-medium pb-1"
            style={{ fontSize: '0.8rem', letterSpacing: '0.12em', opacity: 0.85 }}
          >
            {currentYear}
          </span>
        </div>
      </div>

      {/* Curved SVG divider at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: '32px', zIndex: 10 }}>
        <svg
          viewBox="0 0 800 32"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,32 L0,18 C100,6 200,26 400,16 C600,6 700,24 800,14 L800,32 Z"
            fill="#faf9f7"
          />
        </svg>
      </div>
    </div>
  )
}