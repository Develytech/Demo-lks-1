function Contact({ company, contact, content, layoutUsage }) {
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  const onSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section id="contact" className="section contact">
      <div className={containerClass}>
        <div className="contact-grid">
          <div className="contact-copy">
            <h2>{content.sectionTitle}</h2>
            <p>{content.sectionText}</p>
            <p>{company.description}</p>
            <ul className="contact-list" role="list">
              <li>
                <span>E-post</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <span>Telefon</span>
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a>
              </li>
              <li>
                <span>Område</span>
                <p>{company.location}</p>
              </li>
            </ul>
          </div>
          {content.form.enabled && (
            <form className="contact-form" onSubmit={onSubmit}>
              <label htmlFor="name">{content.form.fields.nameLabel}</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={content.form.fields.namePlaceholder}
                required
              />

              <label htmlFor="email">{content.form.fields.emailLabel}</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={content.form.fields.emailPlaceholder}
                required
              />

              <label htmlFor="message">{content.form.fields.messageLabel}</label>
              <textarea
                id="message"
                name="message"
                placeholder={content.form.fields.messagePlaceholder}
                rows={5}
                required
              />

              <button type="submit">{content.form.fields.submitText}</button>
              <p className="disclaimer">{content.form.disclaimerText}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
