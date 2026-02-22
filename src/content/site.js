export const siteContent = {
  language: {
    content: 'sv-SE',
    codeComments: 'en',
  },
  company: {
    name: 'Ljus & Kraft Stockholm AB',
    domain: 'lksgroup.se',
    location: 'Stockholm med kranskommuner',
    tagline: 'Ert elinstallationsföretag med det lilla extra',
    description: 'Ljus & kraft Stockholm utför alla typer av elinstallationer.',
  },
  contact: {
    email: 'oscar@lksgroup.se',
    phone: '+46 73 655 41 98',
  },
  branding: {
    accentColor: '#ee9c21',
    logoPath: '/src/assets/brand/logo.svg',
    fontFamily: 'system',
  },
  layout: {
    containerMaxWidthPx: 1360,
    wideContainerMaxWidthPx: 1760,
    fullBleedMaxWidthPx: 9999,
    containerFluidVw: 92,
    wideContainerFluidVw: 98,
    narrowContainerMaxWidthPx: 1120,
    narrowContainerFluidVw: 92,
    sectionPaddingYMobilePx: 72,
    sectionPaddingYDesktopPx: 104,
    borderRadiusPx: 8,
    shadowStyle: 'soft',
    headerHeightPx: 72,
    gutterTight: 'clamp(18px, 2.0vw, 44px)',
    gutterStandard: 'clamp(26px, 3.2vw, 80px)',
    gutterWide: 'clamp(34px, 4.8vw, 120px)',
  },
  layoutUsage: {
    header: { width: 'wide', gutter: 'tight' },
    hero: { width: 'standard', gutter: 'wide' },
    services: { width: 'standard', gutter: 'standard' },
    projects: { width: 'wide', gutter: 'tight' },
    contact: { width: 'standard', gutter: 'standard' },
    footer: { width: 'wide', gutter: 'tight' },
  },
  motion: {
    preset: 'fade-up',
    durationMs: 520,
    staggerMs: 90,
  },
  hero: {
    imagePath: '/src/assets/brand/hero.jpg',
    badge: 'Elinstallation • Ljusdesign • Styrsystem • Projektering',
    headline: 'Elinstallationer av högsta kvalitet.',
    subtext: 'För privatpersoner och företag i Stockholm med kranskommuner.',
    primaryAction: null,
    secondaryAction: {
      label: 'Kontakta oss',
      target: 'contact',
    },
  },
  services: {
    presentation: 'textual',
    sectionTitle: 'Tjänster',
    sectionText:
      'Elinstallationer och tekniska lösningar med fokus på kvalitet, säkerhet och långsiktig funktion.',
    items: [
      {
        title: 'Elinstallation',
        desc: 'Elinstallationer för både privatpersoner och företag, utförda enligt gällande regler och med hög yrkesstandard.',
      },
      {
        title: 'Eldesign & Ljusdesign',
        desc: 'Planering och utformning av el- och ljuslösningar anpassade efter funktion, estetik och energieffektivitet.',
      },
      {
        title: 'Projektering',
        desc: 'Strukturerad projektering som säkerställer rätt lösning från tidigt skede till färdig installation.',
      },
      {
        title: 'Styrsystem',
        desc: 'Installation och anpassning av styrsystem för belysning och tekniska funktioner i fastigheter.',
      },
      {
        title: 'Belysning',
        desc: 'Installation av funktionell och energieffektiv belysning för bostäder, kommersiella lokaler och industri.',
      },
      {
        title: 'Energioptimering',
        desc: 'Åtgärder för energioptimering och energieffektivisering genom smarta el- och belysningslösningar.',
      },
    ],
  },
  contactSection: {
    sectionTitle: 'Kontakt',
    sectionText: 'Hör av dig med frågor eller underlag, så återkommer vi.',
    form: {
      enabled: true,
      submitBehavior: 'mock',
      fields: {
        nameLabel: 'Namn',
        emailLabel: 'E-post',
        messageLabel: 'Meddelande',
        namePlaceholder: 'Ditt namn',
        emailPlaceholder: 'din@mail.se',
        messagePlaceholder: 'Berätta kort...',
        submitText: 'Skicka',
      },
      disclaimerText: 'Formuläret är en mock just nu. Vi kopplar det till e-post/API senare.',
    },
  },
  footer: {
    textTemplate: '© {YEAR} {COMPANY}. Alla rättigheter förbehållna.',
  },
}

export function resolveAssetPath(path) {
  if (!path) return ''
  if (path.startsWith('/src/')) {
    return new URL(`../${path.slice(5)}`, import.meta.url).href
  }
  return path
}
