import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"

import SiteContext from "../../context/SiteContext"
import Header from "../../components/header"

const HeaderSection = () => {
  const site = useContext(SiteContext)
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "header-bg.jpg" }) {
        publicURL
      }
    }
  `)

  return (
    <>
      <section
        id="header-section"
        className="bg-scroll h-screen text-white"
        style={{
          backgroundImage: `url(${data.bg.publicURL})`,
          backgroundSize: "cover",
        }}
      >
        <Header
          collapseMenu={site.collapseMenu}
          onCollapseMenuClick={site.setCollapseMenu}
        />
      </section>
    </>
  )
}

export default HeaderSection
