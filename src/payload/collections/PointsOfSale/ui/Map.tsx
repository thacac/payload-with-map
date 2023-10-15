import * as React from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { type MapOptions } from 'leaflet'
import dynamic from 'next/dynamic'
import { useFormFields } from 'payload/components/forms'
import { type PointField } from 'payload/dist/fields/config/types'

type MapFieldProps = PointField &
  MapOptions & {
    position: [number, number]
    center: [number, number]
    zoom: number
  }

export const Map: React.FC<MapFieldProps> = props => {
  const { name, label } = props
  const { position, zoom } = props
  const mapRef = React.useRef(null)
  //     const [options, setOptions] = React.useState<
  //     {
  //       label: string
  //       value: string
  //     }[]
  //   >([])

  //   React.useEffect(() => {
  //     if (res?.data) {
  //         const fetchedProducts = res.data.reduce(
  //           (acc, item) => {
  //             acc.push({
  //               label: item.name || item.id,
  //               value: item.id,
  //             })
  //             return acc
  //           },
  //           [
  //             {
  //               label: 'Select a product',
  //               value: '',
  //             },
  //           ],
  //         )
  //         setOptions(fetchedProducts)
  //       }

  //   }, [])
  //   React.useEffect(
  //     () => console.log(mapRef.current), // { retry: fn, ... }
  //     [mapRef.current],
  //   )
  // eslint-disable-next-line prettier/prettier
  return (<MapContainer ref={mapRef} zoom={13} scrollWheelZoom={false} style={{ height: "200px", width: "100%" }} >
      <TileLayer
        attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}></Marker>
    </MapContainer>
  )
}
