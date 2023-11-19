import React, { FC, use, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LatLng, LatLngTuple } from 'leaflet'
import dynamic from 'next/dynamic'
// re-use Payload's built-in button component
// this is how we'll interface with Payload itself
import { FieldDescription, Label, useField, useFieldType } from 'payload/components/forms'
// retrieve and store the last used colors of your users
import Error from 'payload/dist/admin/components/forms/Error/index'
import { type PointField } from 'payload/types'

import { MapInnerChildrenProps } from '../../../libs/leaflet/components/Map/components/Map'
import MapContextProvider from '../../../libs/leaflet/components/Map/context/MapContextProvider'
import { Props } from './types'

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
  const latlng = useMemo(() => {
    if (mapContext?.places?.length > 0) {
      return mapContext.places[0] as LatLng
    } else if (value) {
      return { lat: value[0], lng: value[1] } as LatLng
    } else {
      return undefined
    }
  }, [mapContext, value])

  useEffect(() => {
    if (latlng) {
      setValue([latlng.lat, latlng.lng])
    }
  }, [latlng, setValue])

  return (
    <>
      <ul className={`${baseClass}__wrap coords`}>
        <li>
          <Label label={`Lon`} />
          <div className="input-wrapper">
            <input defaultValue={latlng?.lat} readOnly={true} />
          </div>
        </li>
        <li>
          <Label label={`Lat`} />
          <div className="input-wrapper">
            <input defaultValue={latlng?.lng} readOnly={true} />
          </div>
        </li>
      </ul>
    </>
  )
}

const baseClass = 'point'

const MapPointField: React.FC<Props> = props => {
  const {
    name,
    custom,
    admin: { className, condition, description, readOnly, style, width } = {},
    label,
    path: pathFromProps,
    required,
    validate,
  } = props

  const path = pathFromProps || name

  const memoizedValidate = useCallback(
    (value, options) => {
      return validate(value, { ...options, required })
    },
    [validate, required],
  )

  const { errorMessage, setValue, showError, value } = useFieldType({
    condition,
    path,
    validate: memoizedValidate,
  })
  const classes = ['field-type', 'text', baseClass, showError && 'error'].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      <Error message={errorMessage} showError={showError} />
      <Label label={label} required={required} />
      <Error showError={showError} message={errorMessage} />
      <FieldDescription description={description} value={value} />
      <MapContextProvider>
        <MapInner
          center={value ?? custom.center}
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
