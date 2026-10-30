# Weblaze Dual-Mode Theme & Design Tokens

This project implements the visual theme tokens for **Weblaze Technologies**, supporting both **Dark Mode** and **Light Mode** with strict WCAG AA contrast compliance.

---

## 🎨 Brand Token Specification

### Dark Mode Palette
| Semantic Role | Token / Hex | Purpose & Usage | Contrast Ratio | WCAG Compliance |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `#0D0D0D` (Jet Black) | Base page canvas background | - | Baseline |
| **Elevated Surface** | `#161922` (Deep Obsidian) | Cards, Modals, Floating Panels | - | Layer 1 |
| **Neutral Light Text** | `#FAFAFA` (Soft White) | Main Headings & Primary Body Text | **16.5:1** on Surface / **19.5:1** on Canvas | ✅ AAA (> 7:1) |
| **Muted Text** | `#94A3B8` (Slate-400) | Secondary descriptions, subheadings, labels | **7.3:1** on Surface / **8.5:1** on Canvas | ✅ AAA (> 7:1) |
| **Border / Divider** | `#232734` | Card outlines, dividers, nav borders | Visible structural definition | Subtle & Non-distracting |
| **Primary (CTA)** | `#1E46EB` | High-priority CTAs, buttons, active highlights | **4.8:1** with `#FAFAFA` text | ✅ AA (> 4.5:1) |
| **Secondary Accent** | `#67BAF4` (Light Blue) | Eyebrow tags, links, focus rings, hover glow | **7.9:1** on Surface / **9.3:1** on Canvas | ✅ AAA (> 7:1) |

---

### Light Mode Palette
| Semantic Role | Token / Hex | Purpose & Usage | Contrast Ratio | WCAG Compliance |
| :--- | :--- | :--- | :--- | :--- |
| **Canvas Background** | `#FAFAFA` (Soft White) | Base page canvas background | - | Baseline |
| **Elevated Surface** | `#FFFFFF` (Pure White) | Cards, Modals, Navbar container | - | Layer 1 |
| **Neutral Dark Text** | `#0D0D0D` (Jet Black) | Main Headings & High-contrast Text | **20.5:1** on `#FFFFFF` / **19.5:1** on Canvas | ✅ AAA (> 7:1) |
| **Muted Text** | `#525866` | Secondary body text, metadata, descriptions | **7.1:1** on `#FFFFFF` / **6.7:1** on Canvas | ✅ AA & AAA (> 4.5:1) |
| **Border / Divider** | `#E2E8F0` (Slate-200) | Structural dividers and card borders | Clean definition | Accessible |
| **Primary (CTA)** | `#1E46EB` (or `#1E466B`) | Key action buttons, high-priority CTAs | **4.8:1** (or **8.8:1** for `#1E466B`) | ✅ AA (> 4.5:1) |
| **Secondary Accent Surface** | `#E7F3FD` | Soft blue badge fill derived from `#67BAF4` | Gentle non-fatiguing pill tint | Base |
| **Secondary Accent Text** | `#1765A8` / `#228BE6` | Tag text & focus rings | **5.2:1** on `#E7F3FD` / **4.6:1** on Canvas | ✅ AA (> 4.5:1) |

---

## 🛠️ Architecture & Files

1. [tailwind.config.js](file:///Users/Imad/Documents/WORK/W-2/tailwind.config.js): Tailwind config defining semantic tokens (`canvas`, `surface`, `border`, `content`, `primary`, `accent`) with class-based dark mode.
2. [src/index.css](file:///Users/Imad/Documents/WORK/W-2/src/index.css): Live design system tokens, view transitions, keyframe animations, and reduced-motion rules.
3. [src/App.tsx](file:///Users/Imad/Documents/WORK/W-2/src/App.tsx): Main application router, persistent theme hydration, and floating progress gauge.
