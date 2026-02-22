import { useScrollPosition } from '../hooks/useScrollPosition'
import { resolveAssetPath } from '../content/site'

function Header({ content, layoutUsage }) {
  const scrollY = useScrollPosition()
  const isSolid = scrollY > 40
  const { company, hero } = content
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  return (
    <header className={`site-header ${isSolid ? 'is-solid' : ''}`}>
      <div className={`${containerClass} header-inner`}>
        <a href="#top" className="brand" aria-label={company.name}>
          <img src={resolveAssetPath(content.branding.logoPath)} alt={company.name} className="brand-logo" />
          <span>{company.name}</span>
        </a>
        <a href={`#${hero.secondaryAction.target}`} className="header-cta">
          {hero.secondaryAction.label}
        </a>
      </div>
    </header>
  )
}

export default Header
