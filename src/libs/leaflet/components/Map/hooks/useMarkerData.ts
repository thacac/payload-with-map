import { useEffect, useMemo, useState } from 'react'
import type { LatLngExpression, Map } from 'leaflet'

import { config } from '../config'
import useLeafletWindow from './useLeafletWindow'

interface useMapDataValues {
  locations?: LatLngExpression[]
  center?: LatLngExpression
  map?: Map
  viewportWidth?: number
  viewportHeight?: number
}

interface allMarkerPosValues {
  minZoom: number
  maxZoom?: number
  centerPos: LatLngExpression
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useMarkerData = ({
  locations,
  center,
  map,
  viewportWidth,
  viewportHeight,
}: useMapDataValues) => {
  const leafletWindow = useLeafletWindow()

  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: config.minZoom - 1,
    centerPos: center ?? config.baseCenter,
  })

  // get bounds of all markers
  const allMarkerBounds = useMemo(() => {
    if (!leafletWindow || !locations) return undefined

    const coordsSum: LatLngExpression[] = []
    locations?.forEach(coord => {
      coordsSum.push(coord)
    })
    return leafletWindow.latLngBounds(coordsSum)
  }, [leafletWindow, locations])

  // auto resize map to fit all markers on viewport change
  // useMemo will not work here, because we need to update the map size after the viewport size changes
  useEffect(() => {
    if (!allMarkerBounds || !leafletWindow || !map) return

    const el = map.invalidateSize()
    if (!el) return
    setAllMarkersBoundCenter({
      minZoom: map.getBoundsZoom(allMarkerBounds),
      centerPos: [allMarkerBounds.getCenter().lat, allMarkerBounds.getCenter().lng],
    })
  }, [allMarkerBounds, viewportWidth, viewportHeight])

  return { allMarkersBoundCenter }
}

export default useMarkerData
