import { renderToString } from 'react-dom/server'
import type { PointExpression } from 'leaflet'
import Leaflet from 'leaflet'

interface divIconValues {
  source: JSX.Element
  anchor: PointExpression
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const LeafletDivIcon = ({ source, anchor }: divIconValues) =>
  Leaflet?.divIcon({
    html: renderToString(source),
    iconAnchor: anchor,
  })

export default LeafletDivIcon
