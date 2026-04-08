import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MONTH_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=85', alt: 'Snowy winter landscape' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85', alt: 'Misty forest in early spring' },
  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=1200&q=85', alt: 'Cherry blossoms in bloom' },
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=85', alt: 'Spring meadow flowers' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', alt: 'Bright spring hillside' },
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85', alt: 'Sunlit summer mountain' },
  { url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85', alt: 'Warm beach sunset' },
  { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=85', alt: 'Golden summer valley' },
  { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', alt: 'Autumn forest foliage' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=85', alt: 'Fall leaves on water' },
  { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=1200&q=85', alt: 'Late autumn bare trees' },
  { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=85', alt: 'Winter snow scene' },
]

// ── Sub-components ─────────────────────────────────────────────────────────────

function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 z-10 overflow-hidden">
      <svg
        viewBox="0 0 800 32"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        <path
          d="M0,32 L0,18 C120,4 240,28 400,16 C560,4 680,26 800,14 L800,32 Z"
          fill="#faf9f7"
        />
      </svg>
    </div>
  )
}

function MonthBadge({ monthName, currentYear }) {
  return (
    <div className="absolute left-7 z-20" style={{ bottom: '-26px' }}>
      <div className="inline-flex items-baseline gap-2.5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl px-[22px] pt-[13px] pb-[15px] shadow-xl shadow-blue-500/35">
        <span className="text-[2.4rem] font-bold text-white leading-none tracking-tight">
          {monthName}
        </span>
        <span className="text-[12px] font-medium text-blue-200/85 tracking-widest pb-0.5">
          {currentYear}
        </span>
      </div>
    </div>
  )
}

// ── HeroImage ──────────────────────────────────────────────────────────────────

export default function HeroImage({ currentMonth, currentYear, monthName }) {
  const { url, alt } = MONTH_IMAGES[currentMonth]

  return (
    <div className="relative h-[210px] shrink-0">
      {/* Photo container — clips the crossfading images */}
      <div className="absolute inset-0 overflow-hidden rounded-t-[28px]">

        {/* Crossfade layer: new image fades in over the previous one.
            mode="sync" lets the old image fade out while the new one fades in
            simultaneously — creating a smooth dissolve rather than a flash. */}
        <AnimatePresence mode="sync">
          <motion.img
            key={currentMonth}
            src={url}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            loading="lazy"
          />
        </AnimatePresence>

        {/* Overlays sit above the image layer, always visible */}
        <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/10 to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-blue-950/10 mix-blend-multiply pointer-events-none" />
      </div>

      <MonthBadge monthName={monthName} currentYear={currentYear} />
      <WaveDivider />
    </div>
  )
}