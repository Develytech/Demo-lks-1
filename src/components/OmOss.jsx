import { resolveAssetPath } from '../content/site'

function OmOss({ content, layoutUsage }) {
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`
  const mediaImagePath = content.imagePath || '/assets/brand/hero.jpg'

  return (
    <section id="om-oss" className="section about">
      <div className={containerClass}>
        <div className="about-grid">
          <div className="about-media">
            <div className="about-media-placeholder">
              <img
                className="about-media-image"
                src={resolveAssetPath(mediaImagePath)}
                alt={content.imageAlt || 'Elektriker i Stockholm'}
                loading="lazy"
              />
              <div className="about-media-content">
                <p>STOCKHOLM</p>
                <p>Elinstallation • Service • Projektering</p>
              </div>
            </div>
          </div>

          <div className="about-copy">
            <p className="about-overline">{content.overline}</p>
            <h2>{content.heading}</h2>
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <ul className="about-trust-list" role="list" aria-label="Trygghetspunkter">
              {content.trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <a href={`#${content.cta.target}`} className="about-cta">
              {content.cta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OmOss
