import { resolveAssetPath } from '../content/site'

function Hero({ content, layoutUsage }) {
  const { company, hero } = content
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  return (
    <section id="top" className="hero full-bleed">
      <div className="hero-bg" aria-hidden="true">
        <img src={resolveAssetPath(hero.imagePath)} alt="" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className={`${containerClass} hero-content`}>
        <p className="hero-badge">{hero.badge}</p>
        <h1>{hero.headline}</h1>
        <p className="hero-subtext">{hero.subtext}</p>
        {hero.secondaryAction && (
          <a href={`#${hero.secondaryAction.target}`} className="text-link">
            {hero.secondaryAction.label}
          </a>
        )}
        <p className="hero-tagline">{company.tagline}</p>
      </div>
    </section>
  )
}

export default Hero
