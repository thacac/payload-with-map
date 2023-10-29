import React, { createContext, useState } from 'react'
import { ZoomControl } from 'react-leaflet'
import Leaflet from 'leaflet'

export interface MapContextValues {
  map: Leaflet.Map | undefined
  setMap: (e: Leaflet.Map | undefined) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)

  return <MapContext.Provider value={{ map, setMap }}>{children}</MapContext.Provider>
}

export default MapContextProvider
