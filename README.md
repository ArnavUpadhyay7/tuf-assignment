# 📅 Interactive Wall Calendar

A polished, interactive calendar component built with **React (Vite) + Tailwind CSS**, inspired by a physical wall calendar. This project focuses on delivering a clean UI, intuitive interactions, and strong frontend engineering practices.

---

## ✨ Features

### 🧱 Core Features

* 📆 **Wall Calendar Layout**

  * Hero image paired with calendar grid
  * Clean, minimal, Apple-like aesthetic
  * Balanced layout between visual and functional elements

* 🎯 **Date Range Selection**

  * Select start and end dates
  * Visual states:

    * Start & End → highlighted
    * In-between → range highlight
  * Supports both forward and backward selection

* 🖱️ **Hover Preview (Enhanced UX)**

  * Preview range before selecting end date
  * Works dynamically in both directions

* 📝 **Notes System (Range-Based)**

  * Notes are tied to selected date ranges
  * Each range stores its own note
  * Switching ranges restores corresponding notes

* 💾 **Local Persistence**

  * Notes stored using `localStorage`
  * Data persists across reloads

* 📱 **Responsive Design**

  * Desktop: side-by-side layout
  * Mobile: stacked layout
  * Touch-friendly interactions

---

## 🎨 UI/UX Highlights

* Clean typography and spacing system
* Subtle hover + selection states
* Context-aware notes panel
* Auto-save feedback for notes
* Character counter for input
* Smooth and consistent layout across screen sizes

---

## 🚀 Planned Enhancements (Creative Features)

These features are planned to further enhance UX and demonstrate product thinking:

* 🎬 **Flip Animation (Framer Motion)**

  * Smooth page-flip or slide transition when changing months

* 🎨 **Dynamic Theme Based on Image**

  * Extract dominant color from hero image
  * Apply subtle theme accents to calendar

* 📅 **Today Indicator**

  * Highlight current date with subtle UI marker

* 🏷️ **Holiday / Event Markers**

  * Add visual indicators for important dates

* ⚡ **Micro-interactions**

  * Smooth hover transitions
  * Animated feedback for selections and saving

  * ⚡ **Footer**

  * Simple footer
  * Made with love by Arnav (type some text)

---

## 🛠 Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **Framer Motion** (for animations)
* **LocalStorage** (for persistence)

---

## 📂 Project Structure

```
src/
  components/
    Calendar/
      CalendarGrid.jsx
      DayCell.jsx
      useCalendar.js
      useRangeSelection.js
    Notes/
      NotesPanel.jsx
    Layout/
      HeroImage.jsx
  utils/
    dateUtils.js
  App.jsx
```

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

---

## 🧠 Key Learnings

* Managing complex UI state (range selection, hover preview)
* Designing reusable component architecture
* Building responsive layouts with Tailwind
* Enhancing UX with subtle interactions
* Structuring frontend-only applications cleanly
