import React, { FunctionComponent, useMemo } from 'react'
import { LatLngExpression } from 'leaflet'
import { type LucideProps } from 'lucide-react'

import { config } from '../../config'

export interface CustomMarkerProps {
  position: LatLngExpression
  icon?: FunctionComponent<LucideProps>
  color?: string
  label?: string
  draggable?: boolean
}

const MarkerIconWrapper = ({ icon, color, label }: Partial<CustomMarkerProps>) => {
  const IconFC = useMemo(() => icon ?? null, [icon])

  return (
    <div className="relative inline-flex p-0 m-0">
      {label && (
        <span
          className="absolute -inset-2 rounded-full opacity-80"
          style={{ backgroundColor: color }}
        />
      )}
      <div
        className="p-2 inline-block rounded-full bg-primary text-white relative"
        style={{ backgroundColor: color }}
      >
        {IconFC && <IconFC size={config.ui.markerIconSize} />}
        {label && (
          <span className="flex flex-col absolute -top-2 -right-2 border-2 border-white bg-error rounded-full h-7 w-7 text-xs items-center pt-1">
            {label}
          </span>
        )}
      </div>
      <span className={`absolute ${label ? '-inset-2' : '-inset-1'} rounded-full shadow-md`} />
    </div>
  )
}

export default MarkerIconWrapper
