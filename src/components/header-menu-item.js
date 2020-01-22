import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"

const HeaderMenuItem = ({ children, onNavigate, to, className }) => {
  const handleClick = () => onNavigate(to)
  const buttonClassName = clsx(
    className || "block mt-4 lg:inline-block lg:mr-4 mx-auto",
    "focus:outline-none"
  )

  return (
    <button onClick={handleClick} className={buttonClassName}>
      {children}
    </button>
  )
}

HeaderMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  onNavigate: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
}

export default HeaderMenuItem
