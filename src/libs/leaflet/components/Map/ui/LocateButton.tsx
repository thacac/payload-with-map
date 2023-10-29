import React, { useCallback, useEffect, useState } from 'react'
import { LatLngExpression } from 'leaflet'
import { LocateFixed, PersonStanding } from 'lucide-react'

import { CustomMarker } from '../components/Marker'
import { config } from '../config'
import useMapContext from '../context/useMapContext'

export const LocateButton: React.FC = () => {
  const { map } = useMapContext()
  const [userPosition, setUserPosition] = useState<LatLngExpression | undefined>(undefined)

  const handleClick = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setUserPosition([position.coords.latitude, position.coords.longitude])
      })
    } else {
      setUserPosition(undefined)
    }
  }, [map])

  useEffect(() => {
    if (userPosition) {
      map?.flyTo(userPosition)
    }
  }, [userPosition])

  return (
    <>
      <button
        type="button"
        style={{ zIndex: 400 }}
        className="button absolute rounded top-16 right-3 p-2 shadow-md text-dark bg-white"
        onClick={() => handleClick()}
      >
        <LocateFixed size={config.ui.mapIconSize} />
      </button>
      {userPosition && (
        <CustomMarker color={config.ui.iconColor} icon={PersonStanding} position={userPosition} />
      )}
    </>
  )
}
