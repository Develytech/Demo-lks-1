import { useScrollPosition } from '../hooks/useScrollPosition'

const navLinks = [
  { label: 'Tjänster', target: 'services' },
  { label: 'Projekt', target: 'projects' },
  { label: 'Kontakta oss', target: 'contact' },
]

function Header({ content, layoutUsage }) {
  const scrollY = useScrollPosition()
  const isScrolled = scrollY > 80
  const { company } = content
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  const headerClass = `site-header ${isScrolled ? 'is-scrolled' : 'is-hero'}`

  return (
    <header className={headerClass}>
      <div className={`${containerClass} header-inner`}>
        <a href="#top" className="brand" aria-label={company.name}>
          <span>{company.name}</span>
        </a>
        <nav className="header-nav" aria-label="Primär navigation">
          {navLinks.map((link) => (
            <a key={link.target} href={`#${link.target}`}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
