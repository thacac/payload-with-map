import React from 'react'
import { Marker } from 'react-leaflet'

import { config } from '../../config'
import useMapContext from '../../context/useMapContext'
import LeafletDivIcon from '../LeafletDivIcon'
import MarkerIconWrapper, { CustomMarkerProps } from './MarkerIconWrapper'

export const CustomMarker: React.FC<{
  position: CustomMarkerProps['position']
  icon: CustomMarkerProps['icon']
  color: CustomMarkerProps['color']
}> = ({ position, icon, color }: CustomMarkerProps) => {
  const { map } = useMapContext()

  const handleMarkerClick = () => map?.panTo(position)

  return (
    <Marker
      position={position}
      icon={LeafletDivIcon({
        source: <MarkerIconWrapper color={color} icon={icon} />,
        anchor: [(config.ui.markerIconSize + 16) / 2, (config.ui.markerIconSize + 16) / 2],
      })}
      eventHandlers={{ click: handleMarkerClick }}
    />
  )
}
