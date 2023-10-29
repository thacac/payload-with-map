import React, { useEffect, useState } from 'react'
import { LatLngTuple } from 'leaflet'
import dynamic from 'next/dynamic'

import { config } from '../config'
// import MapTopBar from '@components/TopBar'
import MapContextProvider from '../context/MapContextProvider'
import useMapContext from '../context/useMapContext'
import useLeafletWindow from '../hooks/useLeafletWindow'
import useMarkerData from '../hooks/useMarkerData'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import '../globals.css'

const LeafletCluster = dynamic(
  async () => (await import('./Cluster/LeafletCluster')).LeafletCluster(),
  {
    ssr: false,
  },
)

const CenterToMarkerButton = dynamic(
  async () => (await import('../ui/CenterButton')).CenterButton,
  {
    ssr: false,
  },
)
const CustomMarker = dynamic(async () => (await import('./Marker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('../ui/LocateButton')).LocateButton, {
  ssr: false,
})
const AppMapContainer = dynamic(async () => (await import('./AppMapContainer')).AppMapContainer, {
  loading: () => <p>loading...</p>,
  ssr: false,
})

//TODO: replace with real data
const Places = [
  [43.77533192072405, 1.2916765394663996],
  [43.77533192072425, 1.2916765394664096],
] as LatLngTuple[]

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()

  const { allMarkersBoundCenter } = useMarkerData({
    locations: Places,
    map,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  })

  const isLoading = !leafletWindow

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.setMinZoom(allMarkersBoundCenter.minZoom - 1)
      map.off('moveend', moveEnd)
    }

    map.setMinZoom(0)
    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter])

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {allMarkersBoundCenter && !isLoading ? (
        <AppMapContainer
          center={allMarkersBoundCenter.centerPos}
          zoom={allMarkersBoundCenter.minZoom}
          maxZoom={config.maxZoom}
          minZoom={config.minZoom}
        >
          <>
            <CenterToMarkerButton
              center={allMarkersBoundCenter.centerPos}
              zoom={allMarkersBoundCenter.minZoom}
            />
            <LocateButton />
            {Places && (
              <LeafletCluster
                icon={config.ui.markerIcon}
                color={config.ui.iconColor}
                chunkedLoading
              >
                {Places.map((coords, index) => (
                  <CustomMarker
                    icon={config.ui.markerIcon}
                    color={config.ui.iconColor}
                    key={index}
                    position={coords}
                  />
                ))}
              </LeafletCluster>
            )}
          </>
        </AppMapContainer>
      ) : (
        'Loading...'
      )}
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
