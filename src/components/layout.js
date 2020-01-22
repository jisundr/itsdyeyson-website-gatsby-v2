/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "../scss/global.scss"

const Layout = ({ children, site }) => {
  return (
    <>
      <Header
        theme="dark"
        fixed
        showHeader={site.showHeader}
        collapseMenu={site.collapseMenu}
        onCollapseMenuClick={site.setCollapseMenu}
      />
      <main>{children}</main>
      <footer className="container text-sm">{`Crafted with <3 by @itsdyeyson`}</footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  site: PropTypes.object.isRequired,
}

export default Layout
