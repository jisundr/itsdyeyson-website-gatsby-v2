import React, { useState } from "react"

const defaultState = {
  title: false,
  setTitle: () => {},
  showHeader: false,
  setShowHeader: () => {},
  collapsMenu: true,
  setCollapseMenu: () => {},
  currentAnchor: false,
  setCurrentAnchor: () => {},
}

const SiteContext = React.createContext(defaultState)

export const SiteProvider = ({ children }) => {
  const [title, setTitle] = useState("Home")
  const [showHeader, setShowHeader] = useState(false)
  const [collapseMenu, setCollapseMenu] = useState(true)
  const [currentAnchor, setCurrentAnchor] = useState("")

  return (
    <SiteContext.Provider
      value={{
        title,
        setTitle,
        showHeader,
        setShowHeader,
        collapseMenu,
        setCollapseMenu,
        currentAnchor,
        setCurrentAnchor,
      }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export const SiteConsumer = SiteContext.Consumer
export default SiteContext
