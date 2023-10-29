import { useContext } from 'react'

import { MapContext, type MapContextValues } from './MapContextProvider'

const useMapContext = (): MapContextValues => {
  const mapInstance = useContext(MapContext)
  const map = mapInstance?.map
  const setMap = mapInstance?.setMap

  return { map, setMap }
}

export default useMapContext
