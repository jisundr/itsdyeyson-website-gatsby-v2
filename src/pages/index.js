import React, { useContext } from "react"

// import Image from "../components/image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HeaderSection from "./landing/header-section"
import SiteContext from "../context/SiteContext"
import AboutSection from "./landing/about-section"
import ProjectSection from "./landing/project-section"
import ContactSection from "./landing/contact-section"

const IndexPage = () => {
  const { currentAnchor, ...site } = useContext(SiteContext)

  return (
    <Layout>
      <SEO title={site.title} />
      <HeaderSection />
      <AboutSection />
      <ProjectSection />
      <ContactSection />
    </Layout>
  )
}

export default IndexPage
