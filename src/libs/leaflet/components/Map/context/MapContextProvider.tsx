import React, { createContext, useState } from 'react'
import Leaflet, { LeafletMouseEvent } from 'leaflet'

export interface MapContextValues {
  map: Leaflet.Map | undefined
  setMap: (e: Leaflet.Map | undefined) => void
  places: Leaflet.LatLngExpression[] | undefined
  setPlaces: (e: Leaflet.LatLngExpression[]) => void
}

export const MapContext = createContext<MapContextValues | undefined>(undefined)

interface MapContextProviderProps {
  children: React.ReactNode
}

const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const [map, setMap] = useState<Leaflet.Map | undefined>(undefined)
  const [places, setPlaces] = useState<Leaflet.LatLngExpression[] | undefined>(undefined)

  return (
    <MapContext.Provider value={{ map, setMap, places, setPlaces }}>{children}</MapContext.Provider>
  )
}

export default MapContextProvider
