# COMPANY SITE TEMPLATE — CODEX SPEC (DO NOT REFORMAT)

This README is the single source of truth for Codex.
Codex must generate/update the entire website based on this file.

---

## 0) GLOBAL RULES (MUST FOLLOW)

- Treat this README as the only input source.
- Do NOT invent missing values. If a field is empty, keep it empty.
- Only JavaScript (no TypeScript).
- React + Vite project.
- Use plain CSS (no Tailwind). No extra libs.
- Keep components reusable and content-driven (no company text hardcoded in components).
- All visible website content must be written in Swedish when CONFIG.language.content is "sv-SE".
- Must be responsive (mobile-first) and accessible.
- ALL text/content files must be UTF-8 encoded (ÅÄÖ must render correctly).
- Motion must respect prefers-reduced-motion.
- Premium constraint: keep UI minimal. Avoid “app UI” patterns (glassy buttons, heavy cards, strong shadows).
- No placeholder lorem content; use provided text only.

---

## 1) CONFIG (EDIT THIS PER COMPANY) — YAML
IMPORTANT: Do not change the key names.

```yaml
language:
  content: "sv-SE"
  codeComments: "en"

company:
  name: "Ljus & Kraft Stockholm AB"
  domain: "lksgroup.se"
  location: "Stockholm med kranskommuner"
  tagline: "Ert elinstallationsföretag med det lilla extra"
  description: "Ljus & kraft Stockholm utför alla typer av elinstallationer."

contact:
  email: "oscar@lksgroup.se"
  phone: "+46 73 655 41 98"

branding:
  accentColor: "#ee9c21"
  logoPath: "/src/assets/brand/logo.svg"
  fontFamily: "system" # allowed: system


layout:
  # WIDTHS (caps)
  containerMaxWidthPx: 1360
  wideContainerMaxWidthPx: 1760
  fullBleedMaxWidthPx: 9999

  # FLUID MODE (laptop-friendly)
  containerFluidVw: 92
  wideContainerFluidVw: 98
  narrowContainerMaxWidthPx: 1120
  narrowContainerFluidVw: 92

  # VERTICAL RHYTHM
  sectionPaddingYMobilePx: 72
  sectionPaddingYDesktopPx: 104

  # SHAPE / DEPTH
  borderRadiusPx: 8
  shadowStyle: "soft"
  headerHeightPx: 72

  # FLUID GUTTERS
  gutterTight: "clamp(18px, 2.0vw, 44px)"
  gutterStandard: "clamp(26px, 3.2vw, 80px)"
  gutterWide: "clamp(34px, 4.8vw, 120px)"

layoutUsage:
  header:   { width: "wide",     gutter: "tight" }
  hero:     { width: "standard", gutter: "wide" }
  services: { width: "standard",   gutter: "standard" }
  projects: { width: "wide",     gutter: "tight" }
  contact:  { width: "standard", gutter: "standard" }
  footer:   { width: "wide",     gutter: "tight" }



motion:
  preset: "fade-up" # allowed: fade-up
  durationMs: 520
  staggerMs: 90

hero:
  imagePath: "/src/assets/brand/hero.jpg"
  badge: "Elinstallation • Ljusdesign • Styrsystem • Projektering"
  headline: "Elinstallationer av högsta kvalitet."
  subtext: "För privatpersoner och företag i Stockholm med kranskommuner."
  primaryAction: null
  secondaryAction:
    label: "Kontakta oss"
    target: "contact"


services:
  presentation: "textual" # NOT cards
  sectionTitle: "Tjänster"
  sectionText: "Elinstallationer och tekniska lösningar med fokus på kvalitet, säkerhet och långsiktig funktion."
  items:
    - title: "Elinstallation"
      desc: "Elinstallationer för både privatpersoner och företag, utförda enligt gällande regler och med hög yrkesstandard."

    - title: "Eldesign & Ljusdesign"
      desc: "Planering och utformning av el- och ljuslösningar anpassade efter funktion, estetik och energieffektivitet."

    - title: "Projektering"
      desc: "Strukturerad projektering som säkerställer rätt lösning från tidigt skede till färdig installation."

    - title: "Styrsystem"
      desc: "Installation och anpassning av styrsystem för belysning och tekniska funktioner i fastigheter."

    - title: "Belysning"
      desc: "Installation av funktionell och energieffektiv belysning för bostäder, kommersiella lokaler och industri."

    - title: "Energioptimering"
      desc: "Åtgärder för energioptimering och energieffektivisering genom smarta el- och belysningslösningar."


projects:
  sectionTitle: "Projekt"
  sectionText: "Vi arbetar med elinstallationer i olika miljöer, anpassade efter varje kunds behov och förutsättningar."
  layout: "editorial-stack"
  flow: "vertical"
  widthPattern: ["wide", "narrow", "wide"]
  maxItems: 3
  imageDominance: "high"
  cardStyle: "flat"
  rhythm: "asymmetric" # IMPORTANT
  items:
    - title: "Privatbostäder"
      meta: "Elinstallation • Belysning"
      desc: "Elinstallationer och belysningslösningar för villor, lägenheter och fritidshus."
      imagePath: "/src/assets/areas/private.jpg"

    - title: "Företag & kommersiella lokaler"
      meta: "Projektering • Styrsystem"
      desc: "Tekniska el- och styrsystem anpassade för kontor, butiker och verksamhetslokaler."
      imagePath: "/src/assets/areas/commercial.jpg"

    - title: "Skärgård & specialmiljöer"
      meta: "Installation • Driftssäkerhet"
      desc: "Elinstallationer i krävande miljöer med fokus på driftsäkerhet och hållbarhet."
      imagePath: "/src/assets/areas/archipelago.jpg"


contactSection:
  sectionTitle: "Kontakt"
  sectionText: "Hör av dig med frågor eller underlag, så återkommer vi."
  form:
    enabled: true
    submitBehavior: "mock"
    fields:
      nameLabel: "Namn"
      emailLabel: "E-post"
      messageLabel: "Meddelande"
      namePlaceholder: "Ditt namn"
      emailPlaceholder: "din@mail.se"
      messagePlaceholder: "Berätta kort..."
      submitText: "Skicka"
    disclaimerText: "Formuläret är en mock just nu. Vi kopplar det till e-post/API senare."

footer:
  textTemplate: "© {YEAR} {COMPANY}. Alla rättigheter förbehållna."
``` 

## 2) WEBSITE SPEC

### Scope
- Build a single-page website.
- The site must feel premium: calm, minimal, consistent.
- Portfolio-first: projects must look like a showcase, not app cards.
- Section widths are controlled by layoutUsage (header/hero/services/projects/contact/footer).


### Sections (order is mandatory)
1. Hero
2. Services
3. Projects
4. Contact
5. Footer

### Header behavior
- Header is fixed.
- Over hero: transparent background.
- After scrolling more than 40px:
  - Background becomes solid (white or near-white).
  - Subtle shadow.
  - Smooth transition 150ms–220ms.
- Only ONE header CTA (Contact).

### Hero section
- Full viewport height.
- Large background image + dark overlay for readability.
- Content: badge, headline, subtext.
- CTA rules:
  - No primary CTA in hero.
  - Optional secondary text-link/button that scrolls to Contact.
- Hero background (image + overlay) spans full width; only the text content follows layoutUsage.hero

### Services section
- Minimal grid/list.
- No icons unless provided in content.
- Uses motion preset with stagger.
- Services should read as capabilities, not features.
- No bordered cards; use typographic list/grid with subtle dividers.

### Projects section (premium portfolio)
- Desktop: editorial stack (single column flow), with alternating image/text alignment and varying content widths
- Mobile: 1 column.
- Cards must be large with generous spacing.
- Image should dominate; text is short.
- Hover: minimal (tiny translate + subtle overlay), avoid heavy shadows.
- Project cards must not resemble UI cards.
- They should feel editorial and content-first.
- Project layout must avoid perfect symmetry.
- Cards may vary slightly in vertical offset or spacing to create an editorial rhythm.
- The section should feel curated, not grid-generated.
- Projects are stacked vertically with varying widths.
- They must not resemble cards or grids.

### Contact section
- Left: contact info.
- Right: form (if enabled).
- Form is calm and minimal.

### Typography + spacing constraints
- Use layout config values for container width and section paddings.
- Avoid strong borders, heavy shadows, glassmorphism.
- Avoid rounded UI aesthetics. Corners must be subtle.

### Layout width rules
- The site must use wide layouts to avoid a boxed “template” look.
- Use layout.wideContainerMaxWidthPx for most sections (Header/Services/Projects/Contact/Footer).
- Hero background is full-bleed. Hero content uses layoutUsage.hero width/gutter.
- Only constrain text blocks (paragraphs) for readability; do NOT center the entire section in a narrow container.
- Background colors/gradients may span full width while content aligns to the wide container.
- Avoid a single global container for all sections.
- Each section must use layoutUsage.{section}.width and .gutter.
- Implement gutters as fluid clamp() values from layout.gutter*.
- Do not use pure vw widths for main content; use max-width containers + fluid gutters.
- Wide content must cap at layout.wideContainerMaxWidthPx (do not expand beyond).
- Do not make text paragraphs span the full wide width; keep long text blocks in standard/narrow.
- Fluid container widths:
  - standard uses min(layout.containerMaxWidthPx, layout.containerFluidVw vw)
  - wide uses min(layout.wideContainerMaxWidthPx, layout.wideContainerFluidVw vw)
  - narrow uses min(layout.narrowContainerMaxWidthPx, layout.narrowContainerFluidVw vw)




---

## 3) FILE MAP

### Root
- README.md
- package.json
- vite.config.js

### Source structure
src/
- App.jsx
- main.jsx

src/content/
- site.js
- projects.js

src/components/
- Header.jsx
- Hero.jsx
- Services.jsx
- Projects.jsx
- Contact.jsx
- Footer.jsx

src/hooks/
- useScrollPosition.js
- useReducedMotion.js

src/styles/
- global.css

### Rules
- All listed files must exist.
- Components must import content from src/content/.
- No company-specific strings hardcoded in components.
- Styling in src/styles/global.css.