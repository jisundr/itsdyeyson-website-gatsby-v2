import React, { useContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import useIntersectionObserver from "@react-hook/intersection-observer"

import SiteContext from "../../context/SiteContext"
import Header from "../../components/header"

const HeaderSection = () => {
  const { currentAnchor, collapseMenu, showHeader, ...site } = useContext(
    SiteContext
  )
  const [entry, observerRef] = useIntersectionObserver({
    threshold: 1,
  })
  const data = useStaticQuery(graphql`
    query {
      bg: file(relativePath: { eq: "header-bg.jpg" }) {
        publicURL
      }
      me: file(relativePath: { eq: "me.jpg" }) {
        publicURL
      }
    }
  `)

  if (entry.isIntersecting && showHeader) {
    site.setShowHeader(false)
  } else if (!entry.isIntersecting && !showHeader) {
    site.setShowHeader(true)
  }

  if (entry.isIntersecting && currentAnchor !== "") {
    site.setCurrentAnchor("")
  }

  return (
    <section
      ref={observerRef}
      className="bg-scroll h-screen text-white"
      style={{
        backgroundImage: `url(${data.bg.publicURL})`,
        backgroundSize: "cover",
      }}
    >
      <Header
        currentAnchor={currentAnchor}
        collapseMenu={collapseMenu}
        onCollapseMenuClick={site.setCollapseMenu}
      />
      <div
        className="flex justify-center items-center py-20"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="text-center">
          <img
            src={data.me.publicURL}
            className="rounded-full h-32 md:h-56 mb-12 mx-auto"
            alt="Jayson De los Reyes"
          />
          <h2 className="font-body text-sm md:text-xl line leading-relaxed">
            My Name is Jayson
          </h2>
          <h1 className="font-heading font-bold text-xl md:text-4xl leading-relaxed">
            I AM A WEB DEVELOPER
          </h1>
        </div>
      </div>
    </section>
  )
}

export default HeaderSection
