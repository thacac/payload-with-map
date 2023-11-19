import React, { useMemo, useRef, useState } from 'react'
import { Marker, Tooltip, useMapEvents } from 'react-leaflet'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'

import useMapContext from '../../context/useMapContext'

export interface LocationMarkerProps {
  position?: LatLngExpression
  draggable?: boolean
  tooltip?: string
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  position,
  draggable = true,
  tooltip,
}) => {
  const [positionState, setPositionState] = useState(position)
  const { setPlaces } = useMapContext() //get position of places in the map context
  const markerRef = useRef(null)

  const map = useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setPlaces([e.latlng])
      map.flyTo(e.latlng)
    },
  })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          // setPositionState(marker.getLatLng())
          setPlaces([marker.getLatLng()])
        }
      },
    }),
    [],
  )

  return positionState ? (
    <Marker
      position={positionState}
      draggable={draggable}
      ref={markerRef}
      eventHandlers={eventHandlers}
    >
      {tooltip && (
        <Tooltip direction="bottom" offset={[-15, 30]} opacity={1}>
          {tooltip}
        </Tooltip>
      )}
    </Marker>
  ) : null
}

export default LocationMarker
