import { useContext } from 'react'

import { MapContext, type MapContextValues } from './MapContextProvider'

const useMapContext = (): MapContextValues => {
  const { map, setMap, places, setPlaces } = useContext(MapContext)
  return { map, setMap, places, setPlaces }
}

export default useMapContext
