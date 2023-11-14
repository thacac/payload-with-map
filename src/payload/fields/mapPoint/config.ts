import type { Field } from 'payload/types'

//import Cell from './Cell'
import MapPointField from './MapPointField'

export const validateHexColor = (value = ''): true | string => {
  return value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/) !== null || `Please give a valid hex color`
}

const mapPointField: Field = {
  label: {
    en: 'Coordinates',
    fr: 'Coordonnées',
  },
  name: 'coords',
  type: 'point',
  required: true,
  custom: {
    defaultZoom: 8,
    minZoom: 13,
    maxZoom: 7,
    center: [43.77533192072405, 1.2916765394663996],
  },
  admin: {
    description: {
      en: 'Click on the map to select a point',
      fr: 'Cliquez sur la carte pour sélectionner un point',
    },
    components: {
      Field: MapPointField,
      //Cell,
    },
  },
}

export default mapPointField
