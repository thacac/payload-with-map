/* eslint-disable import/extensions */
import React, { FunctionComponent } from 'react'
import {
  createElementObject,
  createPathComponent,
  extendContext,
  LeafletContextInterface,
} from '@react-leaflet/core'
import Leaflet, { LeafletMouseEventHandlerFn } from 'leaflet'
import { type LucideProps } from 'lucide-react'

import { config } from '../../config'
import LeafletDivIcon from '../LeafletDivIcon'
import MarkerIconWrapper from '../Marker/MarkerIconWrapper'

import 'leaflet.markercluster'

type ClusterEvents = {
  onClick?: LeafletMouseEventHandlerFn
  onDblClick?: LeafletMouseEventHandlerFn
  onMouseDown?: LeafletMouseEventHandlerFn
  onMouseUp?: LeafletMouseEventHandlerFn
  onMouseOver?: LeafletMouseEventHandlerFn
  onMouseOut?: LeafletMouseEventHandlerFn
  onContextMenu?: LeafletMouseEventHandlerFn
}

type MarkerClusterControl = Leaflet.MarkerClusterGroupOptions & {
  children: React.ReactNode
  icon: FunctionComponent<LucideProps>
  color: string
} & ClusterEvents

const CreateMarkerClusterGroup = (
  props: MarkerClusterControl,
  context: LeafletContextInterface,
) => {
  const markerClusterGroup = new Leaflet.MarkerClusterGroup({
    removeOutsideVisibleBounds: false,
    spiderLegPolylineOptions: {
      className: 'hidden',
    },
    // zoomToBoundsOnClick: false,
    iconCreateFunction: cluster =>
      LeafletDivIcon({
        source: (
          <MarkerIconWrapper
            color={props.color}
            icon={props.icon}
            label={`${cluster.getChildCount()}`}
          />
        ),
        anchor: [config.ui.markerIconSize / 2, config.ui.markerIconSize / 2],
      }),
    ...props,
  })

  return createElementObject(
    markerClusterGroup,
    extendContext(context, { layerContainer: markerClusterGroup }),
  )
}

export const LeafletCluster = () =>
  createPathComponent<Leaflet.MarkerClusterGroup, MarkerClusterControl>(CreateMarkerClusterGroup)
