import React from 'react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import { LatLngExpression, MapOptions } from 'leaflet'

import useMapContext from '../context/useMapContext'
import { CenterButton } from '../ui/CenterButton'
import { LocateButton } from '../ui/LocateButton'

import 'leaflet/dist/leaflet.css'

export type MapProps = {
  center: LatLngExpression
  allMarkersBoundCenter: {
    centerPos: LatLngExpression
    minZoom: number
  }
  children?: JSX.Element | JSX.Element[]
  zoom: number
} & MapOptions

export const AppMapContainer: React.FC<MapProps> = ({
  children,
  allMarkersBoundCenter,
  ...options
}) => {
  const { setMap } = useMapContext()

  return (
    <MapContainer ref={setMap} style={{ height: '100%', width: '100%' }} {...options}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topleft" />
      <Control position="topright">
        <CenterButton
          center={allMarkersBoundCenter.centerPos}
          zoom={allMarkersBoundCenter.minZoom}
        />
        <LocateButton />
      </Control>
      {children}
    </MapContainer>
  )
}
