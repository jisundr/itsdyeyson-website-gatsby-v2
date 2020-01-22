import React, { useEffect, useContext } from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import HeaderSection from "./landing/header-section"
import SiteContext from "../context/SiteContext"
import AboutSection from "./landing/about-section"
import ProjectSection from "./landing/project-section"
import ContactSection from "./landing/contact-section"

const IndexPage = () => {
  const site = useContext(SiteContext)
  const handleScroll = () => {
    const scrollPositionY = window.scrollY
    if (scrollPositionY >= 100) {
      site.setShowHeader(true)
    } else if (scrollPositionY < 100) {
      site.setShowHeader(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
  })

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
