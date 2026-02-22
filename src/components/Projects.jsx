import { useReducedMotion } from '../hooks/useReducedMotion'
import { resolveAssetPath } from '../content/site'

const widthClassMap = {
  wide: 'project-width-wide',
  narrow: 'project-width-narrow',
  standard: 'project-width-standard',
}

function Projects({ content, layoutUsage }) {
  const reducedMotion = useReducedMotion()
  const items = content.items.slice(0, content.maxItems)
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  return (
    <section id="projects" className="section projects">
      <div className={containerClass}>
        <header className="section-header projects-header">
          <h2>{content.sectionTitle}</h2>
          <p>{content.sectionText}</p>
        </header>
        <div className="projects-stack">
          {items.map((item, index) => {
            const widthKey = content.widthPattern[index % content.widthPattern.length]
            const sideClass = index % 2 === 0 ? 'media-left' : 'media-right'

            return (
              <article
                key={item.title}
                className={`project-item ${widthClassMap[widthKey]} ${sideClass} ${reducedMotion ? 'is-static' : 'fade-up'}`}
                style={{ '--item-index': index }}
              >
                <div className="project-media" aria-hidden="true">
                  <img src={resolveAssetPath(item.imagePath)} alt={item.title} loading="lazy" />
                  <span className="project-overlay" aria-hidden="true" />
                </div>
                <div className="project-copy">
                  <p className="project-meta">{item.meta}</p>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
