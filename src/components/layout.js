/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"

import SiteContext from "../context/SiteContext"
import ReactNotification from "react-notifications-component"
import Header from "./header"
import "../scss/global.scss"

const Layout = ({ children }) => {
  const { showHeader, collapseMenu, currentAnchor, ...site } = useContext(
    SiteContext
  )
  return (
    <>
      <ReactNotification />
      <Header
        theme="dark"
        fixed
        currentAnchor={currentAnchor}
        showHeader={showHeader}
        onShowHeaderClick={site.setShowHeader}
        collapseMenu={collapseMenu}
        onCollapseMenuClick={site.setCollapseMenu}
      />
      <main>{children}</main>
      <footer className="w-full text-center bg-primary text-gray-400 p-6 text-xs">
        <span className="block">Crafted with ♥ by @itsdyeyson</span>
        <span>Made with Gatsby and TailwindCSS</span>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
