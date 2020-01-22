import React from "react"
import { SiteProvider } from "./context/SiteContext"

export const wrapRootElement = ({ element }) => (
  <SiteProvider>{element}</SiteProvider>
)
