import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import clsx from "clsx"

const Header = ({ fixed, showHeader, collapseMenu, onCollapseMenuClick }) => {
  const handleCollapseMenuClick = () => onCollapseMenuClick(!collapseMenu)
  const data = useStaticQuery(graphql`
    query {
      defaultThemeLogo: file(
        relativePath: { eq: "itsdyeyson-logo-default.png" }
      ) {
        publicURL
      }

      darkThemeLogo: file(relativePath: { eq: "itsdyeyson-logo-dark.png" }) {
        publicURL
      }
    }
  `)

  const headerClassName = clsx("w-full p-6", {
    fixed: fixed,
    "bg-white border-b": !collapseMenu,
    block: showHeader,
    hidden: !showHeader,
  })

  const menuButtonClassName = clsx(
    "flex items-center px-3 py-2 border rounded text-white border-white hover:bg-teal-500",
    { "block text-primary border-primary bg-white": fixed || !collapseMenu }
  )

  const menuContainerClassName = clsx(
    "container flex justify-between mx-auto lg:hidden",
    { hidden: collapseMenu, "text-primary": !collapseMenu }
  )

  const menuContent = (
    <div className="text-sm lg:flex-grow">
      <Link to="/" className="inline-block mt-0 mr-4">
        HOME
      </Link>
      <a href="#about-section" className="inline-block mt-0 mr-4">
        ABOUT
      </a>
      <a href="#project-section" className="inline-block mt-0 mr-4">
        PROJECTS
      </a>
      <a
        href="#contact-section"
        className="inline-block text-sm px-4 py-2 leading-none border border-transparent rounded-full lg:mt-0 bg-teal-500 text-white hover:bg-teal-600 hover:border-white"
      >
        SAY HI!
      </a>
    </div>
  )

  return (
    <header className={headerClassName}>
      <nav className="container flex justify-between mx-auto">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/">
            <img
              className="h-5"
              src={
                data[`${fixed || !collapseMenu ? "dark" : "default"}ThemeLogo`]
                  .publicURL
              }
              alt="logo"
            />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className={menuButtonClassName}
            onClick={handleCollapseMenuClick}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full hidden lg:flex lg:items-center lg:w-auto ">
          {menuContent}
        </div>
      </nav>
      <div className={menuContainerClassName}>{menuContent}</div>
    </header>
  )
}

Header.propTypes = {
  fixed: PropTypes.bool,
  showHeader: PropTypes.bool,
  collapseMenu: PropTypes.bool.isRequired,
  onCollapseMenuClick: PropTypes.func.isRequired,
}

Header.defaultProps = {
  fixed: false,
  showHeader: true,
}

export default Header
