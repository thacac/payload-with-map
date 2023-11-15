import React, { FC, use, useEffect, useState } from 'react'
import { LatLng, LatLngTuple } from 'leaflet'
import dynamic from 'next/dynamic'
// re-use Payload's built-in button component
// this is how we'll interface with Payload itself
import { Label, useFieldType } from 'payload/components/forms'
// retrieve and store the last used colors of your users
import Error from 'payload/dist/admin/components/forms/Error/index'
import { type PointField } from 'payload/types'

import { MapInnerChildrenProps } from '../../../libs/leaflet/components/Map/components/Map'
import MapContextProvider from '../../../libs/leaflet/components/Map/context/MapContextProvider'

// Import the SCSS stylesheet
import './styles.scss'

const MapInner = dynamic(
  async () => (await import('../../../libs/leaflet/components/Map/components/Map')).MapInner,
  {
    ssr: false,
  },
)

type DisplayPositionProps = MapInnerChildrenProps & {
  value: any
  setValue: (value: any) => void
}

const DisplayPosition: FC<DisplayPositionProps> = ({ mapContext, setValue, value }) => {
  const [coord, setCoord] = useState(value)
  const latlng = mapContext?.places?.length > 0 ? (mapContext?.places[0] as LatLng) : undefined

  useEffect(() => {
    if (latlng) {
      setCoord([latlng.lat, latlng.lng])
      setValue([latlng.lat, latlng.lng])
    }
  }, [latlng])

  return (
    <>
      <p>Selected coords : {value !== coord && coord.join(' , ')}</p>
      <p>Already recorded {value}</p>
    </>
  )
}

const MapPointField: React.FC<PointField> = props => {
  const { label, required, validate, custom } = props
  const {
    value = [],
    setValue,
    errorMessage,
    showError,
  } = useFieldType({
    validate,
    path: 'coords',
  })
  const classes = ['field-type', 'text', showError && 'error'].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <Label label={label} required={required} />
      <Error showError={showError} message={errorMessage} />

      <MapContextProvider>
        <MapInner
          center={custom.center}
          defaultZoom={custom.defaultZoom}
          minZoom={custom.minZoom}
          maxZoom={custom.maxZoom}
        >
          <DisplayPosition setValue={setValue} value={value} />
        </MapInner>
      </MapContextProvider>
    </div>
  )
}
export default MapPointField
