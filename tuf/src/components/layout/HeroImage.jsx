import React from 'react'

// Curated set of Unsplash landscape photos for each month
const MONTH_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80', alt: 'Snowy winter landscape' },           // Jan
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80', alt: 'Misty forest in early spring' },     // Feb
  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=900&q=80', alt: 'Cherry blossoms in bloom' },         // Mar
  { url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=900&q=80', alt: 'Spring meadow flowers' },            // Apr
  { url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=900&q=80', alt: 'Bright spring hillside' },           // May
  { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80', alt: 'Sunlit summer mountain' },           // Jun
  { url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=80', alt: 'Warm beach sunset' },               // Jul
  { url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&q=80', alt: 'Golden summer valley' },            // Aug
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80', alt: 'Autumn forest foliage' },           // Sep
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80', alt: 'Fall leaves on water' },            // Oct
  { url: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=900&q=80', alt: 'Late autumn bare trees' },          // Nov
  { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=80', alt: 'Winter snow scene' },               // Dec
]

/**
 * Hero image panel shown at the top (mobile) or left side (desktop).
 * Displays a month-appropriate photo with a wave cut at the bottom/right.
 */
export default function HeroImage({ currentMonth, currentYear, monthName }) {
  const image = MONTH_IMAGES[currentMonth]

  return (
    <div className="relative overflow-hidden bg-gray-900 h-56 md:h-full md:min-h-[480px]">
      {/* Background photo */}
      <img
        src={image.url}
        alt={image.alt}
        className="absolute inset-0 w-full h-full object-cover opacity-90"
        loading="lazy"
      />

      {/* Dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {/* Month label bottom-left
          min-w-0 + pr-10 prevents text from bleeding under the wave edge.
          Month scales from 2xl on mobile up to 3xl on desktop — long names
          like "September" stay contained without wrapping awkwardly. */}
      <div className="absolute bottom-0 left-0 p-5 md:p-6 z-10 min-w-0 pr-10 md:pr-14">
        <p className="text-white/60 text-xs font-medium uppercase tracking-[0.2em]">
          {currentYear}
        </p>
        <h1 className="text-white text-2xl md:text-3xl font-semibold tracking-tight leading-tight mt-0.5 truncate">
          {monthName}
        </h1>
      </div>

      {/* Wave clip at right edge on desktop, bottom on mobile */}
      <WaveEdge />
    </div>
  )
}

/** SVG wave that creates a soft diagonal cut between image and calendar */
function WaveEdge() {
  return (
    <>
      {/* Mobile: bottom wave */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
        <svg
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path d="M0,40 L0,20 Q100,0 200,18 Q300,36 400,14 L400,40 Z" fill="white" />
        </svg>
      </div>

      {/* Desktop: right-side wave */}
      <div className="hidden md:block absolute top-0 right-0 bottom-0 w-12 overflow-hidden">
        <svg
          viewBox="0 0 48 600"
          preserveAspectRatio="none"
          className="absolute top-0 right-0 h-full w-full"
        >
          <path d="M48,0 L20,0 Q0,150 28,300 Q48,440 16,600 L48,600 Z" fill="white" />
        </svg>
      </div>
    </>
  )
}