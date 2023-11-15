import React, { Children, FC, ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { Marker, Tooltip, useMapEvents } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import Control from 'react-leaflet-custom-control'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import dynamic from 'next/dynamic'

import { config } from '../config'
import { MapContextValues } from '../context/MapContextProvider'
// import MapTopBar from '@components/TopBar'
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

const AppMapContainer = dynamic(async () => (await import('./AppMapContainer')).AppMapContainer, {
  loading: () => <p>loading...</p>,
  ssr: false,
})

const LocationMarker = () => {
  const markerRef = useRef(null)
  const [position, setPosition] = useState<null | LatLngExpression>(null)
  const { setPlaces } = useMapContext()

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current
      if (marker != null) {
        setPosition(marker.getLatLng())
        setPlaces([marker.getLatLng()])
      }
    },
  }

  const map = useMapEvents({
    click: (e: LeafletMouseEvent) => {
      setPosition(e.latlng)
      setPlaces([e.latlng])
      map.flyTo(e.latlng)
    },
  })

  return position === null ? null : (
    <Marker position={position} draggable={true} ref={markerRef} eventHandlers={eventHandlers}>
      <Tooltip direction="bottom" offset={[-15, 30]} opacity={1}>
        Bordel de couille à cul
      </Tooltip>
    </Marker>
  )
}

type MapInnerProps = {
  defaultZoom?: number
  minZoom?: number
  maxZoom?: number
  center?: LatLngExpression
  children?: ReactElement
}

export type MapInnerChildrenProps = {
  mapContext?: Omit<MapContextValues, 'setMap'>
}

export const MapInner: FC<MapInnerProps> = ({
  defaultZoom = config.defaultZoom,
  minZoom = config.minZoom,
  maxZoom = config.maxZoom,
  center = config.baseCenter,
  children,
}) => {
  const leafletWindow = useLeafletWindow()
  const { map, places, setPlaces } = useMapContext()
  const { allMarkersBoundCenter } = useMarkerData({
    locations: places,
    map,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  })

  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return
    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
  }, [allMarkersBoundCenter, map])

  const renderChildren = () => {
    return Children.map(children, child => {
      return React.cloneElement(child as ReactElement<MapInnerChildrenProps>, {
        mapContext: { map, places, setPlaces },
      })
    }) as ReactElement<any, any>[]
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {allMarkersBoundCenter && leafletWindow ? (
        <>
          {renderChildren()}
          <AppMapContainer
            center={center}
            zoom={defaultZoom}
            maxZoom={maxZoom}
            minZoom={minZoom}
            allMarkersBoundCenter={allMarkersBoundCenter}
          >
            <LocationMarker />
            {children}
            <>
              <LeafletCluster chunkedLoading>
                {places?.map((coords, index) => (
                  <Marker draggable={true} key={index} position={coords} />
                ))}
              </LeafletCluster>
            </>
          </AppMapContainer>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  )
}
