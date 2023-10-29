import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { LatLngTuple, map } from 'leaflet'
// re-use Payload's built-in button component
import { Button } from 'payload/components'
// this is how we'll interface with Payload itself
import { Label, useFieldType } from 'payload/components/forms'
// retrieve and store the last used colors of your users
import { usePreferences } from 'payload/components/preferences'
import Error from 'payload/dist/admin/components/forms/Error/index'
import { PointField } from 'payload/types'

import Map from '../../../libs/leaflet/components/Map/components/Map'
import useMapContext from '../../../libs/leaflet/components/Map/context/useMapContext'

// Import the SCSS stylesheet
import './styles.scss'

const MapPointField: React.FC<PointField> = props => {
  const { label, required, validate, custom } = props

  const {
    value = [],
    setValue,
    errorMessage,
    showError,
  } = useFieldType({
    validate,
    path: '',
  })
  const classes = ['field-type', 'text', showError && 'error'].filter(Boolean).join(' ')

  const [coordinates, setCoordinates] = useState<LatLngTuple>(value as LatLngTuple)

  useEffect(() => {
    setCoordinates(value as LatLngTuple)
  }, [value])

  // const handleSelectPoint = useCallback(() => {
  //   setValue([43.77533192072405, 1.2916765394663996])
  // }, [coordinates])

  return (
    <div className={classes}>
      <Label label={label} required={required} />
      <Error showError={showError} message={errorMessage} />
      <Map
        center={coordinates ? coordinates : custom?.center}
        zoom={custom?.zoom}
        position={coordinates ? coordinates : custom?.center}
      />
    </div>
  )
}
export default MapPointField
