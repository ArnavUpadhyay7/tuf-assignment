import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MONTH_IMAGES = [
  { url: 'https://i.pinimg.com/1200x/65/a2/29/65a229595af67e8dde70fbe1083f140f.jpg', alt: 'Snowy winter landscape' },
  { url: 'https://i.pinimg.com/1200x/1a/fd/7e/1afd7e13dbf0abca0393fdfadd9487b6.jpg', alt: 'Misty forest in early spring' },
  { url: 'https://i.pinimg.com/1200x/66/62/54/6662544f5a3a7ae049d0879036fe0252.jpg', alt: 'Cherry blossoms in bloom' },
  { url: 'https://i.pinimg.com/736x/94/d3/95/94d395ab58e2fefadf6943870db61145.jpg', alt: 'Spring meadow flowers' },
  { url: 'https://i.pinimg.com/1200x/4e/f8/6c/4ef86c6045c4a04ae1ab0c94d8e07ac8.jpg', alt: 'Bright spring hillside' },
  { url: 'https://i.pinimg.com/1200x/f3/4a/2c/f34a2c2aef5c82f1549bb6ae52579aaf.jpg', alt: 'Sunlit summer mountain' },
  { url: 'https://i.pinimg.com/1200x/88/22/4f/88224fcaf0aa721a312c3bd2ede4345b.jpg', alt: 'Warm beach sunset' },
  { url: 'https://i.pinimg.com/1200x/4b/4e/8e/4b4e8ec4e2c9cb7d0070c31960a8a53c.jpg', alt: 'Golden summer valley' },
  { url: 'https://i.pinimg.com/1200x/56/bc/6b/56bc6b2f4da849b6988a3ceb3ff6d48c.jpg', alt: 'Autumn forest foliage' },
  { url: 'https://i.pinimg.com/1200x/f1/22/4e/f1224ebcc42b44226aa414bce80fd715.jpg', alt: 'Fall leaves on water' },
  { url: 'https://i.pinimg.com/736x/27/d3/70/27d37067f28151e5bb91c9e3cc84a894.jpg', alt: 'Late autumn bare trees' },
  { url: 'https://i.pinimg.com/736x/d2/0e/6c/d20e6cf571d7cbd23eb95cec3282768e.jpg', alt: 'Winter snow scene' },
]


// Binding strip height (px) — the warm-gray band behind the coils
const STRIP_H = 48

// Coil geometry
const C = {
  loopW:   13,   
  loopH:   30,   
  gap:      3,    
  wire:    2.8,   
  edgePad: 44,    
}
C.step = C.loopW + C.gap

// SVG canvas height: enough room for the full coil + hook above + shadow below
const SVG_H = C.loopH + 14
// CY = midpoint of the coil, aligned to the binding strip's vertical centre
const CY = SVG_H / 2 + 1


function CoilBinding() {
  const wrapRef = useRef(null)
  const [width, setWidth] = useState(760)

  useEffect(() => {
    if (!wrapRef.current) return
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width || 760)
    })
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  const loopCount = Math.floor((width - C.edgePad * 2) / C.step)
  const totalW    = loopCount * C.step - C.gap
  const startX    = (width - totalW) / 2
  const hcx       = width / 2

  const rx  = C.loopW / 2 - 0.5
  const ry  = C.loopH / 2

  return (

    <div
      ref={wrapRef}
      style={{
        position:     'relative',
        height:        STRIP_H,
        borderRadius: '28px 28px 0 0',
        overflow:     'visible',
        // Warm stone-gray — same family as the card's #faf9f7 off-white
        background:   'linear-gradient(180deg, #dedad4 0%, #cbc5bc 100%)',
        // Top edge highlight — light grazes the ridge top
        boxShadow:    'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.08)',
        // Cast shadow onto the hero image below
        filter:       'drop-shadow(0 4px 8px rgba(0,0,0,0.18))',
        zIndex:        30,
      }}
    >
      {/* Subtle horizontal engraved groove along the strip centre */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        height: 4,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.04) 50%, rgba(255,255,255,0.12) 100%)',
      }} />

      <svg
        style={{ position: 'absolute', top: -(CY - STRIP_H / 2), left: 0, overflow: 'visible' }}
        width={width}
        height={SVG_H}
        viewBox={`0 0 ${width} ${SVG_H}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>

          <linearGradient id="cgFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f0ebe2" />
            <stop offset="18%"  stopColor="#cfc6b8" />
            <stop offset="52%"  stopColor="#9e9388" />
            <stop offset="82%"  stopColor="#6e6560" />
            <stop offset="100%" stopColor="#4a4340" />
          </linearGradient>

          {/* Back arc — darker bronze, recessed plane */}
          <linearGradient id="cgBack" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#6a6058" />
            <stop offset="100%" stopColor="#2e2926" />
          </linearGradient>

          {/* Side rim — mid-stop of front gradient for the lateral edge glints */}
          <linearGradient id="cgRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e0d8cc" />
            <stop offset="100%" stopColor="#8a8078" />
          </linearGradient>

          {/* Hook gradient */}
          <linearGradient id="cgHook" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e8e0d4" />
            <stop offset="100%" stopColor="#6e6560" />
          </linearGradient>
        </defs>

        {/* ── Loops ── */}
        {Array.from({ length: loopCount }).map((_, i) => {
          const cx  = startX + i * C.step + C.loopW / 2
          const lx  = cx - rx
          const rx2 = cx + rx

          return (
            <g key={i}>
              {/* 1. Cast shadow */}
              <ellipse
                cx={cx} cy={CY + 2.5}
                rx={rx} ry={ry}
                fill="none"
                stroke="rgba(0,0,0,0.14)"
                strokeWidth={C.wire + 3}
              />

              {/* 2. Back arc — bottom semicircle (behind the page) */}
              <path
                d={`M ${lx} ${CY} A ${rx} ${ry} 0 0 0 ${rx2} ${CY}`}
                fill="none"
                stroke="url(#cgBack)"
                strokeWidth={C.wire}
                strokeLinecap="round"
              />

              {/* 3. Front ellipse — full loop rendered on top */}
              <ellipse
                cx={cx} cy={CY}
                rx={rx - 0.3} ry={ry}
                fill="none"
                stroke="url(#cgFront)"
                strokeWidth={C.wire}
              />

              {/* 4. Apex gloss — bright crescent where light hits hardest */}
              <ellipse
                cx={cx}
                cy={CY - ry + C.wire * 0.7}
                rx={rx * 0.44}
                ry={C.wire * 0.30}
                fill="rgba(255,255,255,0.70)"
              />

              {/* 5. Nadir shadow */}
              <ellipse
                cx={cx}
                cy={CY + ry - C.wire * 0.65}
                rx={rx * 0.32}
                ry={C.wire * 0.22}
                fill="rgba(0,0,0,0.22)"
              />

              <line
                x1={lx} y1={CY - ry * 0.18}
                x2={lx} y2={CY + ry * 0.18}
                stroke="url(#cgRim)" strokeWidth={0.9} strokeLinecap="round"
              />
              <line
                x1={rx2} y1={CY - ry * 0.18}
                x2={rx2} y2={CY + ry * 0.18}
                stroke="url(#cgRim)" strokeWidth={0.9} strokeLinecap="round"
              />
            </g>
          )
        })}

        {/* ── Hanging hook ── */}
        <HangingHook cx={hcx} cy={CY} wire={C.wire} />
      </svg>
    </div>
  )
}

function HangingHook({ cx, cy, wire }) {
  const archW = 16
  const archH = 22
  const tipR  = 4.8
  const w     = wire + 0.5

  const arch = `
    M ${cx - archW / 2} ${cy}
    C ${cx - archW / 2} ${cy - archH},
      ${cx + archW / 2} ${cy - archH},
      ${cx + archW / 2} ${cy}
    M ${cx} ${cy - archH}
    Q ${cx} ${cy - archH - tipR * 1.6}
      ${cx + tipR} ${cy - archH - tipR}
  `
  const archShadow = `
    M ${cx - archW / 2} ${cy + 2}
    C ${cx - archW / 2} ${cy - archH + 2},
      ${cx + archW / 2} ${cy - archH + 2},
      ${cx + archW / 2} ${cy + 2}
    M ${cx} ${cy - archH + 2}
    Q ${cx} ${cy - archH - tipR * 1.6 + 2}
      ${cx + tipR} ${cy - archH - tipR + 2}
  `

  return (
    <g>
      <path d={archShadow} fill="none" stroke="rgba(0,0,0,0.20)"
        strokeWidth={w + 2.5} strokeLinecap="round" />
      <path d={arch} fill="none" stroke="url(#cgHook)"
        strokeWidth={w} strokeLinecap="round" />
      {/* Gloss at the arch crown */}
      <circle cx={cx} cy={cy - archH + 1.5} r={1.4} fill="rgba(255,255,255,0.58)" />
    </g>
  )
}

function WaveDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 z-10 overflow-hidden">
      <svg viewBox="0 0 800 32" preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full">
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
      <div className="inline-flex items-baseline gap-2.5 bg-linear-to-br from-blue-500 to-blue-700 rounded-2xl px-[22px] pt-[13px] pb-[15px] shadow-xl shadow-blue-500/35">
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


export default function HeroImage({ currentMonth, currentYear, monthName }) {
  const { url, alt } = MONTH_IMAGES[currentMonth]

  return (

    <div className="relative">
      <CoilBinding />

      <div className="relative h-[210px] shrink-0">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentMonth}
              src={url}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              loading="lazy"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-blue-950/10 mix-blend-multiply pointer-events-none" />
        </div>

        <MonthBadge monthName={monthName} currentYear={currentYear} />
        <WaveDivider />
      </div>
    </div>
  )
}