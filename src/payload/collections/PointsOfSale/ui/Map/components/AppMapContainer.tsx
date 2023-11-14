'use client'
import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import L, { LatLngExpression, MapOptions } from 'leaflet'
import { PointField } from 'payload/types'

import useMapContext from '../context/useMapContext'

import 'leaflet/dist/leaflet.css'

type MapFieldProps = PointField & {
  position: LatLngExpression
  center: LatLngExpression
  zoom: number
  children: JSX.Element | JSX.Element[]
} & MapOptions

export const AppMapContainer: React.FC<MapFieldProps> = ({ ...options }) => {
  const { setMap } = useMapContext()

  return (
    <MapContainer
      ref={e => setMap && setMap(e || undefined)}
      style={{ height: '100%', width: '100%' }}
      {...options}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {options.children}
    </MapContainer>
  )
}
