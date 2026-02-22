import { Link, useParams } from 'react-router-dom'
import { projectsContent } from '../content/projects'
import { resolveAssetPath, siteContent } from '../content/site'

function getLongDescriptionParts(project) {
  if (Array.isArray(project?.longDescription)) {
    return project.longDescription.filter(Boolean)
  }

  if (typeof project?.longDescription === 'string' && project.longDescription.trim()) {
    return [project.longDescription]
  }

  if (typeof project?.desc === 'string' && project.desc.trim()) {
    return [project.desc]
  }

  return []
}

function getProjectTags(project) {
  if (Array.isArray(project?.tags)) {
    return project.tags
  }

  if (typeof project?.meta === 'string') {
    return project.meta
      .split('â€¢')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  return []
}

function getProjectImage(project) {
  if (Array.isArray(project?.images) && project.images.length > 0) {
    return project.images[0]
  }

  if (project?.imagePath) {
    return { src: project.imagePath, alt: project.title }
  }

  return null
}

function ProjectPage() {
  const { slug = '' } = useParams()
  const project = projectsContent.items.find((item) => (item.slug || item.id) === slug)

  if (!project) {
    return (
      <main className="section projects">
        <div className="container container-wide gutter-tight">
          <h1>Projekt hittades inte</h1>
          <p>
            <Link to="/projects">Tillbaka till /projects</Link>
          </p>
        </div>
      </main>
    )
  }

  const longDescriptionParts = getLongDescriptionParts(project)
  const tags = getProjectTags(project)
  const image = getProjectImage(project)

  return (
    <main className="section projects">
      <article className="container container-wide gutter-tight">
        <header className="section-header projects-header">
          <h1>{project.title}</h1>
        </header>

        {image ? (
          <figure className="project-media">
            <img src={resolveAssetPath(image.src)} alt={image.alt || project.title} />
          </figure>
        ) : null}

        {tags.length > 0 ? (
          <ul className="project-tags" role="list" aria-label="Projektkategorier">
            {tags.map((tag) => (
              <li key={`${project.id || project.title}-${tag}`}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <div className="project-modal-text">
          {longDescriptionParts.map((paragraph) => (
            <p key={`${project.id || project.title}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
          ))}
        </div>

        <p>
          <Link className="project-modal-cta-button" to="/kontakt">
            Kontakta oss
          </Link>
        </p>
      </article>
    </main>
  )
}

export default ProjectPage
