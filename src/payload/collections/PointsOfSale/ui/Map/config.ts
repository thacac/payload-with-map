import type { FunctionComponent } from 'react'
import type { LatLngExpression } from 'leaflet'
import type { LucideProps } from 'lucide-react'
import { LocateFixed } from 'lucide-react'

// FIXME: naming and structure
export const config = {
  minZoom: 11,
  maxZoom: 18, // max zoom level of CARTO: 18
  ui: {
    topBarHeight: 80,
    bigIconSize: 48,
    mapIconSize: 32,
    markerIconSize: 32,
    menuIconSize: 16,
    topBarIconSize: 24,
    iconColor: '#4CFFB2',
    markerIcon: LocateFixed as FunctionComponent<LucideProps>,
  },
  baseCenter: [43.77533192072405, 1.2916765394663996] as LatLngExpression, // bielefeld lol
}

export enum NavMenuVariant {
  INTRO = 'vertical',
  TOPNAV = 'horizontal',
}
