import { useScrollPosition } from '../hooks/useScrollPosition'
import { useState } from 'react'

const navLinks = [
  { label: 'Tjänster', target: 'services' },
  { label: 'Projekt', target: 'projects' },
  { label: 'Kontakta oss', target: 'contact' },
]

function Header({ content, layoutUsage }) {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 80
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { company } = content
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  const headerClass = `site-header ${isScrolled ? 'is-scrolled' : 'is-hero'}`
  const menuId = 'header-mobile-menu'
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={headerClass}>
      <div className={`${containerClass} header-inner`}>
        <a href="#top" className="brand header-brand" aria-label={company.name} onClick={closeMenu}>
          <span>{company.name}</span>
        </a>
        <nav className="header-nav" aria-label="Primär navigation">
          {navLinks.map((link) => (
            <a key={link.target} href={`#${link.target}`} onClick={closeMenu}>
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
          <a href="/#tjanster" onClick={closeMenu}>
            Tjänster
          </a>
          <a href="/#projects" onClick={closeMenu}>
            Projekt
          </a>
          <a href="/kontakt" onClick={closeMenu}>
            Kontakta oss
          </a>
        </div>
      ) : null}
    </header>
  )
}

export default Header
