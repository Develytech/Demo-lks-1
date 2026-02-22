import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { resolveAssetPath } from '../content/site'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

const SWIPE_THRESHOLD = 45

function normalizeImages(project) {
  if (Array.isArray(project.images) && project.images.length > 0) {
    return project.images
  }

  if (project.imagePath) {
    return [{ src: project.imagePath, alt: project.title }]
  }

  return []
}

function normalizeTags(project) {
  if (Array.isArray(project.tags) && project.tags.length > 0) {
    return project.tags
  }

  if (typeof project.meta === 'string') {
    return project.meta
      .split('•')
      .map((part) => part.trim())
      .filter(Boolean)
  }

  return []
}

function normalizeLongDescription(project) {
  if (Array.isArray(project.longDescription)) {
    return project.longDescription.filter(Boolean)
  }

  if (typeof project.longDescription === 'string' && project.longDescription.trim()) {
    return [project.longDescription]
  }

  if (typeof project.desc === 'string' && project.desc.trim()) {
    return [project.desc]
  }

  return []
}

function Projects({ content, layoutUsage }) {
  const reducedMotion = useReducedMotion()
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  const items = useMemo(
    () =>
      content.items.slice(0, content.maxItems).map((item, index) => ({
        ...item,
        uid: item.id || `${item.title}-${index}`,
        slug: item.slug || item.id,
        cardText: item.shortDescription || item.desc || '',
        images: normalizeImages(item),
        tags: normalizeTags(item),
        longDescriptionParts: normalizeLongDescription(item),
      })),
    [content.items, content.maxItems],
  )

  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)

  const modalRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)
  const dialogTitleId = useId()

  const activeProject = activeProjectIndex === null ? null : items[activeProjectIndex]
  const totalImages = activeProject ? activeProject.images.length : 0
  const modalCta = activeProject?.cta || {
    label: 'Kontakta oss för offert',
    href: '#contact',
    note: 'Vill du ha en liknande lösning? Vi hjälper dig från planering till installation.',
  }

  const closeModal = useCallback(() => {
    setActiveProjectIndex(null)
    setActiveImageIndex(0)
    setTouchStartX(null)
  }, [])

  const showPreviousImage = useCallback(() => {
    if (!totalImages) return

    setActiveImageIndex((current) => (current - 1 + totalImages) % totalImages)
  }, [totalImages])

  const showNextImage = useCallback(() => {
    if (!totalImages) return

    setActiveImageIndex((current) => (current + 1) % totalImages)
  }, [totalImages])

  const openProject = useCallback((index, triggerElement) => {
    lastTriggerRef.current = triggerElement
    setActiveProjectIndex(index)
    setActiveImageIndex(0)
  }, [])

  useEffect(() => {
    if (activeProjectIndex === null) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      lastTriggerRef.current?.focus()
    }
  }, [activeProjectIndex])

  useEffect(() => {
    if (activeProjectIndex === null) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeModal()
        return
      }

      if (event.key === 'ArrowLeft' && totalImages > 1) {
        event.preventDefault()
        showPreviousImage()
        return
      }

      if (event.key === 'ArrowRight' && totalImages > 1) {
        event.preventDefault()
        showNextImage()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const dialog = modalRef.current
      if (!dialog) {
        return
      }

      const focusableNodes = dialog.querySelectorAll(FOCUSABLE_SELECTOR)
      if (!focusableNodes.length) {
        return
      }

      const firstNode = focusableNodes[0]
      const lastNode = focusableNodes[focusableNodes.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === firstNode || !dialog.contains(activeElement))) {
        event.preventDefault()
        lastNode.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastNode) {
        event.preventDefault()
        firstNode.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [activeProjectIndex, closeModal, showNextImage, showPreviousImage, totalImages])

  const onOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      closeModal()
    }
  }

  const onTouchStart = (event) => {
    const point = event.changedTouches[0]
    setTouchStartX(point.clientX)
  }

  const onTouchEnd = (event) => {
    if (touchStartX === null || totalImages <= 1) {
      return
    }

    const endPoint = event.changedTouches[0]
    const deltaX = endPoint.clientX - touchStartX

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      setTouchStartX(null)
      return
    }

    if (deltaX < 0) {
      showNextImage()
    } else {
      showPreviousImage()
    }

    setTouchStartX(null)
  }

  return (
    <section id="projects" className="section projects">
      <div className={containerClass}>
        <header className="section-header projects-header">
          <h2>{content.sectionTitle}</h2>
          <p>{content.sectionText}</p>
        </header>

        <ul className="projects-grid" role="list">
          {items.map((item, index) => {
            const coverImage = item.images[0]

            return (
              <li
                key={item.uid}
                className={`project-card-item ${reducedMotion ? 'is-static' : 'fade-up'}`}
                style={{ '--item-index': index }}
              >
                <button
                  type="button"
                  className="project-card"
                  onClick={(event) => openProject(index, event.currentTarget)}
                  aria-label={`Öppna projekt: ${item.title}`}
                >
                  <div className="project-card-frame">
                    <div className="project-card-media" aria-hidden="true">
                      {coverImage ? (
                        <img src={resolveAssetPath(coverImage.src)} alt={coverImage.alt || item.title} loading="lazy" />
                      ) : null}
                    </div>
                    <div className="project-card-body">
                      <h3>{item.title}</h3>
                      {item.cardText ? <p className="project-card-summary">{item.cardText}</p> : null}
                      {item.tags.length > 0 ? (
                        <ul className="project-tags" role="list" aria-label="Projektkategorier">
                          {item.tags.map((tag) => (
                            <li key={`${item.uid}-${tag}`}>{tag}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {activeProject ? (
        <div className="project-modal-backdrop" onMouseDown={onOverlayMouseDown}>
          <div
            ref={modalRef}
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            tabIndex={-1}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="project-modal-close"
              onClick={closeModal}
              aria-label="Stäng projekt"
            >
              ×
            </button>

            <div className="project-modal-media" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              {activeProject.images[activeImageIndex] ? (
                <img
                  src={resolveAssetPath(activeProject.images[activeImageIndex].src)}
                  alt={activeProject.images[activeImageIndex].alt || activeProject.title}
                />
              ) : null}

              {totalImages > 1 ? (
                <>
                  <button
                    type="button"
                    className="project-modal-nav project-modal-nav-prev"
                    onClick={showPreviousImage}
                    aria-label="Föregående bild"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="project-modal-nav project-modal-nav-next"
                    onClick={showNextImage}
                    aria-label="Nästa bild"
                  >
                    ›
                  </button>
                  <p className="project-modal-indicator" aria-live="polite">
                    {activeImageIndex + 1}/{totalImages}
                  </p>
                </>
              ) : null}
            </div>

            <div className="project-modal-details">
              <h2 id={dialogTitleId} className="project-modal-title">{activeProject.title}</h2>
              {activeProject.tags.length > 0 ? (
                <ul className="project-tags project-tags-modal" role="list" aria-label="Projektkategorier">
                  {activeProject.tags.map((tag) => (
                    <li key={`modal-${activeProject.uid}-${tag}`}>{tag}</li>
                  ))}
                </ul>
              ) : null}

              <div className="project-modal-text">
                {activeProject.longDescriptionParts.map((paragraph) => (
                  <p key={`${activeProject.uid}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
                ))}
              </div>

              {modalCta ? (
                <div className="project-modal-cta">
                  {modalCta.note ? <p className="project-modal-cta-note">{modalCta.note}</p> : null}
                  <a className="project-modal-cta-button" href="#contact" onClick={closeModal}>
                    {modalCta.label}
                  </a>
                </div>
              ) : null}

              {totalImages > 1 ? (
                <div className="project-modal-dots" aria-label="Välj projektbild">
                  {activeProject.images.map((image, index) => (
                    <button
                      key={`${activeProject.uid}-${image.src}`}
                      type="button"
                      aria-pressed={activeImageIndex === index}
                      aria-label={`Visa bild ${index + 1}`}
                      className={activeImageIndex === index ? 'is-active' : ''}
                      onClick={() => setActiveImageIndex(index)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Projects
