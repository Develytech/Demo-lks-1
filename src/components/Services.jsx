import { useReducedMotion } from '../hooks/useReducedMotion'

function Services({ content, layoutUsage }) {
  const reducedMotion = useReducedMotion()
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  return (
    <section id="services" className="section services">
      <div className={containerClass}>
        <header className="section-header">
          <h2>{content.sectionTitle}</h2>
          <p>{content.sectionText}</p>
        </header>
        <ul className="services-list" role="list">
          {content.items.map((item, index) => (
            <li
              key={item.title}
              className={`service-item ${reducedMotion ? 'is-static' : 'fade-up'}`}
              style={{ '--item-index': index }}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
