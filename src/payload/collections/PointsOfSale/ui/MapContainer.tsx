import React from 'react'
import dynamic from 'next/dynamic'
import { PointField } from 'payload/types'

const LazyMapContainer = dynamic(async () => (await import('./Map')).Map, {
  ssr: false,
  loading: () => <div style={{ height: '400px' }} />,
})

type MapFieldProps = PointField & {
  position: [number, number]
  center: [number, number]
  zoom: number
}

export const MapContainer: React.FC<MapFieldProps> = ({ position, center, zoom, ...props }) => (
  <div id="map">
    <LazyMapContainer {...props} position={position} center={center} zoom={zoom} />
  </div>
)
