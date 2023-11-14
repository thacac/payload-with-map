import React, { FC, memo, use, useEffect, useState } from 'react'
import { LeafletContextInterface } from '@react-leaflet/core'
import { LatLngTuple } from 'leaflet'
import dynamic from 'next/dynamic'
// re-use Payload's built-in button component
// this is how we'll interface with Payload itself
import { Label, useFieldType } from 'payload/components/forms'
// retrieve and store the last used colors of your users
import Error from 'payload/dist/admin/components/forms/Error/index'
import { PointField } from 'payload/types'

import { MapInnerChildrenProps } from '../../../libs/leaflet/components/Map/components/Map'
import MapContextProvider from '../../../libs/leaflet/components/Map/context/MapContextProvider'
import useMapContext from '../../../libs/leaflet/components/Map/context/useMapContext'

// Import the SCSS stylesheet
import './styles.scss'

const MapInner = dynamic(
  async () => (await import('../../../libs/leaflet/components/Map/components/Map')).MapInner,
  {
    ssr: false,
  },
)

const DisplayPosition: FC<MapInnerChildrenProps> = ({ mapContext }) => {
  console.log('mapContext', mapContext)
  return <p>Places : {mapContext?.places?.join(',')}</p>
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
    path: '',
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
          <DisplayPosition />
        </MapInner>
      </MapContextProvider>
    </div>
  )
}
export default MapPointField
