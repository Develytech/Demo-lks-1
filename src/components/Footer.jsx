function Footer({ content, company, layoutUsage }) {
  const year = new Date().getFullYear()
  const text = content.textTemplate.replace('{YEAR}', year).replace('{COMPANY}', company.name)
  const containerClass = `container container-${layoutUsage.width} gutter-${layoutUsage.gutter}`

  return (
    <footer className="site-footer">
      <div className={containerClass}>
        <p>{text}</p>
      </div>
    </footer>
  )
}

export default Footer
