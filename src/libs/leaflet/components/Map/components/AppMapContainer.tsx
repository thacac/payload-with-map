import React, { Children, useMemo, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LatLngExpression, MapOptions } from 'leaflet'

import useMapContext from '../context/useMapContext'

import 'leaflet/dist/leaflet.css'

export type MapProps = {
  center: LatLngExpression
  children?: JSX.Element | JSX.Element[]
  zoom: number
} & MapOptions

export const AppMapContainer: React.FC<MapProps> = ({ children, ...options }) => {
  const { setMap } = useMapContext()

  return (
    <MapContainer ref={setMap} style={{ height: '100%', width: '100%' }} {...options}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  )
}
