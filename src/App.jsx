import Header from './components/Header'
import Hero from './components/Hero'
import OmOss from './components/OmOss'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { siteContent } from './content/site'
import { projectsContent } from './content/projects'

function App() {
  const { branding, layout, layoutUsage, aboutSection, services, contactSection } = siteContent

  const rootStyle = {
    '--accent-color': branding.accentColor,
    '--header-height': `${layout.headerHeightPx}px`,
    '--radius': `${layout.borderRadiusPx}px`,
    '--section-pad-mobile': `${layout.sectionPaddingYMobilePx}px`,
    '--section-pad-desktop': `${layout.sectionPaddingYDesktopPx}px`,
    '--gutter-tight': layout.gutterTight,
    '--gutter-standard': layout.gutterStandard,
    '--gutter-wide': layout.gutterWide,
    '--container-standard-max': `${layout.containerMaxWidthPx}px`,
    '--container-standard-fluid': `${layout.containerFluidVw}vw`,
    '--container-wide-max': `${layout.wideContainerMaxWidthPx}px`,
    '--container-wide-fluid': `${layout.wideContainerFluidVw}vw`,
    '--container-narrow-max': `${layout.narrowContainerMaxWidthPx}px`,
    '--container-narrow-fluid': `${layout.narrowContainerFluidVw}vw`,
    '--motion-duration': `${siteContent.motion.durationMs}ms`,
    '--motion-stagger': `${siteContent.motion.staggerMs}ms`,
    '--header-transition': '180ms',
  }

  return (
    <div className="site" style={rootStyle}>
      <Header content={siteContent} layoutUsage={layoutUsage.header} />
      <main>
        <Hero content={siteContent} layoutUsage={layoutUsage.hero} />
        <OmOss content={aboutSection} layoutUsage={layoutUsage.about} />
        <Services content={services} layoutUsage={layoutUsage.services} />
        <Projects content={projectsContent} layoutUsage={layoutUsage.projects} />
        <Contact
          company={siteContent.company}
          contact={siteContent.contact}
          content={contactSection}
          layoutUsage={layoutUsage.contact}
        />
      </main>
      <Footer content={siteContent.footer} company={siteContent.company} layoutUsage={layoutUsage.footer} />
    </div>
  )
}

export default App
