import { useScrollPosition } from '../hooks/useScrollPosition'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Om oss', target: 'om-oss' },
  { label: 'Tjänster', target: 'services' },
  { label: 'Projekt', target: 'projects' },
  { label: 'Kontakta oss', target: 'contact' },
]

function Header({ content, layoutUsage }) {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 80
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTarget, setActiveTarget] = useState('')
  const { company } = content
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  const headerClass = `site-header ${isScrolled ? 'is-scrolled' : 'is-hero'}`
  const menuId = 'header-mobile-menu'
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const ratioById = new Map()
    const sections = navLinks
      .map((link) => document.getElementById(link.target))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratioById.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        let bestTarget = ''
        let bestRatio = 0

        navLinks.forEach((link) => {
          const ratio = ratioById.get(link.target) || 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestTarget = link.target
          }
        })

        setActiveTarget(bestRatio > 0 ? bestTarget : '')
      },
      {
        root: null,
        rootMargin: '-120px 0px -45% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={headerClass}>
      <div className={`${containerClass} header-inner`}>
        <a href="#top" className="brand header-brand" aria-label={company.name} onClick={closeMenu}>
          <span>{company.name}</span>
        </a>
        <nav className="header-nav" aria-label="Primär navigation">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={closeMenu}
              className={activeTarget === link.target ? 'active' : undefined}
              aria-current={activeTarget === link.target ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="header-hamburger"
          aria-label="Öppna meny"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {isMenuOpen ? (
        <div id={menuId} className="header-mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={closeMenu}
              className={activeTarget === link.target ? 'active' : undefined}
              aria-current={activeTarget === link.target ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  )
}

export default Header
