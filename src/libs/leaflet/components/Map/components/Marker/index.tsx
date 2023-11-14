import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

import MarkerIconWrapper, { CustomMarkerProps } from './MarkerIconWrapper'

export const CustomMarker: React.FC<CustomMarkerProps> = ({ draggable, position }) => {
  const [draggableState, setDraggableState] = useState(draggable)
  const [positionState, setPositionState] = useState(position)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPositionState(marker.getLatLng())
        }
      },
    }),
    [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggableState(d => !d)
  }, [])

  return (
    <Marker
      draggable={draggableState}
      position={positionState}
      eventHandlers={eventHandlers}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggableState ? 'Marker is draggable' : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  )
}
