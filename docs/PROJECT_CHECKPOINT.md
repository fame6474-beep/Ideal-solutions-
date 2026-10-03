# IDEAL SOLUTIONS — FRONTEND FOUNDATION FROZEN

**STATUS:** The frontend foundation is officially FROZEN. No further structural, visual, or architectural changes should be made unless explicitly authorized.

---

## 1. Current Architecture
- **Frameworks:** Next.js 16 (App Router) & React 19.
- **Styling:** Tailwind CSS with a strict design-token architecture (`globals.css` CSS variables mapping to semantic Tailwind classes).
- **Component Strategy:** Maximum adherence to Server Components. Only highly isolated, interactive elements (`Navbar`, `ThemeToggle`, `Reveal`, `ParallaxImage`) are Client Components.
- **Theme Architecture:** `next-themes` manages the `class` injection at the HTML root. Light Mode is default. Local storage persistence is enabled, and hydration flash is suppressed via the `suppressHydrationWarning` tag.
- **Motion Architecture:** Powered by `gsap`, `ScrollTrigger`, and `@gsap/react`.
- **Accessibility:** Governed by strict semantic HTML, proper ARIA labels, semantic `<label>` / `htmlFor` bindings, and a custom `useReducedMotion` hook.

---

## 2. Completed Phases
- **Phase 1-4:** Clean Restart, Static Website Foundation, Image Reorganization, and Mobile QA. *(Completed)*
- **Phase 5-6:** Theme System (Light/Dark), Contact Form Refinement, and Navbar ThemeToggle. *(Completed)*
- **Phase 6/7:** GSAP Editorial Motion Architecture, Reduced-Motion Support. *(Completed)*
- **Phase 8:** Construction Asset Audit. *(Completed)*

---

## 3. Current Design System
- **Light Theme (Default):** Background `#F5F3EE`, Surface `#FFFFFF`, Foreground `#171717`.
- **Dark Theme:** Background `#111111`, Surface `#181818`, Foreground `#EAEAEA`.
- **Accents:** Copper `#B76532` (used for CTAs, focus rings, hover indicators).
- **Typography:** Architectural, confident, and highly legible. Headings are tight and bold; body text is spacious and relaxed.
- **Spacing/Responsive Philosophy:** Generous padding (`py-20 md:py-32`). Mobile relies on stacked grids with comfortable touch-targets.

---

## 4. Motion System
- **Libraries:** `gsap`, `ScrollTrigger`, `@gsap/react`. (Lenis is explicitly excluded).
- **Behavior:** "Less, but better." Motion is strictly limited to macro-level composition reveals (`opacity` and subtle `translateY`) and extremely slow, 15% image parallax.
- **Wrappers:** The `<Reveal>` and `<ParallaxImage>` Client Components abstract the GSAP lifecycle entirely away from the main UI content.
- **Reduced Motion:** If a user requests reduced motion at the OS level, all GSAP hooks silently exit without initializing ScrollTriggers. Mobile devices (< 768px) automatically disable Parallax calculations.

---

## 5. Construction Experience
**STATUS: BLOCKED**
**Reason:** Authentic construction footage/sequence has not yet been supplied. 

**Future Production Pipeline (Pending):**
1. Real construction footage captured (locked camera).
2. Source analysis & stabilization (if necessary).
3. Curated 60-frame extraction.
4. AVIF/WebP optimization.
5. `Canvas` client component rendering.
6. `GSAP ScrollTrigger` mapping scroll progress to frame index.

---

## 6. Invalid Legacy Assets
The images currently located at `public/images/construction/roof-001.jpg` through `roof-040.jpg` have been audited and determined to be **fabricated duplicate assets**. They are strictly forbidden from production use and must not be connected to the application. 

---

## 7. Production Audit Highlights
During the final hardening pass, the following critical updates were made:
- Added a functional mobile overlay menu to the `Navbar`.
- Injected `metadataBase`, `openGraph`, and `twitter` tags into `layout.tsx` for SEO.
- Repaired `htmlFor` and `id` bindings in the Contact form.
- Escaped all typography quotes across the application.
- Suppressed the `react-hooks/set-state-in-effect` lint warning on the hydration-safe `ThemeToggle` to guarantee strict CI build success.
- **Note:** The `backup/` directory contains legacy errors but is intentionally ignored as deprecated code.

---

## 8. Verification
- **Build Status:** `npm run build` completes with **0 errors**.
- **Responsive QA:** Verified layout and contrast scaling across `375px → 1920px`.
