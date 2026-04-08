import React, { useState } from "react";
import { isToday } from "../utils/dateUtils";

export default function DayCell({
  date,
  isCurrentMonth,
  isStart,
  isEnd,
  inRange,
  isRangeStart,
  isRangeEnd,
  isInPreviewRange,
  isPreviewStart,
  isPreviewEnd,
  holidayName,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const [hovered, setHovered] = useState(false);
  const today = isToday(date);
  const dayNumber = date.getDate();
  const isEndpoint = isStart || isEnd;
  const isSingleDay = isStart && isEnd;
  const isPreviewEndpoint = (isPreviewStart || isPreviewEnd) && !isEndpoint;

  const getBand = () => {
    const CONFIRMED = "#dbeafe"; 
    const PREVIEW = "#eff6ff";

    if (!isSingleDay) {
      if (isStart) return { bg: CONFIRMED, left: "50%", right: "0" };
      if (isEnd) return { bg: CONFIRMED, left: "0", right: "50%" };
      if (inRange) return { bg: CONFIRMED, left: "0", right: "0" };
    }

    if (isPreviewStart && !isEndpoint)
      return { bg: PREVIEW, left: "50%", right: "0" };
    if (isPreviewEnd && !isEndpoint)
      return { bg: PREVIEW, left: "0", right: "50%" };
    if (isInPreviewRange && !isEndpoint)
      return { bg: PREVIEW, left: "0", right: "0" };

    return null;
  };

  const band = getBand();

  const bubbleBase =
    "relative z-10 flex items-center justify-center shrink-0 w-[34px] h-[34px] rounded-full text-[13px] transition-all duration-150";

  const bubbleVariant = (() => {
    if (isEndpoint)
      return "bg-gradient-to-br from-blue-500 to-blue-700 text-white font-semibold shadow-md shadow-blue-500/35 scale-105";
    if (isPreviewEndpoint)
      return "ring-1 ring-blue-300 bg-white text-blue-500 font-medium";
    if (inRange) return "text-blue-700 font-medium";
    if (isInPreviewRange) return "text-blue-400";
    if (today) return "text-blue-600 font-semibold";
    if (!isCurrentMonth) return "text-stone-300 font-light";
    if (hovered) return "bg-stone-100 text-stone-800 scale-[1.04]";
    return "text-stone-600";
  })();

  const holidayDotColor = isEndpoint ? "bg-amber-200" : "bg-amber-400";

  return (
    <div
      className={`relative flex items-center justify-center h-9 select-none ${isCurrentMonth ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => isCurrentMonth && onClick(date)}
      onMouseEnter={() => {
        setHovered(true);
        onMouseEnter?.(date);
      }}
      onMouseLeave={() => {
        setHovered(false);
        onMouseLeave?.();
      }}
      role="button"
      tabIndex={isCurrentMonth ? 0 : -1}
      aria-label={`${date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}${holidayName ? `, ${holidayName}` : ""}`}
      aria-pressed={isEndpoint}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          isCurrentMonth && onClick(date);
        }
      }}>
      {/* Band — full cell width, no gaps, no per-cell rounding */}
      {band && (
        <div
          style={{
            position: "absolute",
            top: 3,
            bottom: 3,
            left: band.left,
            right: band.right,
            background: band.bg,
            zIndex: 0,
          }}
        />
      )}

      {/* Today dot */}
      {today && !isEndpoint && !holidayName && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 z-20" />
      )}

      {/* Holiday dot */}
      {holidayName && isCurrentMonth && (
        <span
          className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full z-20 ${holidayDotColor}`}
        />
      )}

      {/* Holiday tooltip */}
      {holidayName && isCurrentMonth && hovered && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50
            whitespace-nowrap px-2 py-1 rounded-md
            text-[10px] font-medium tracking-wide
            bg-stone-800 text-stone-100 pointer-events-none"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
          {holidayName}
          <span
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
            style={{ borderTopColor: "#292524" }}
          />
        </span>
      )}

      {/* Bubble — always above the band */}
      <span className={`${bubbleBase} ${bubbleVariant}`}>{dayNumber}</span>
    </div>
  );
}
