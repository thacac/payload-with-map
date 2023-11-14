import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useLeafletWindow = () => {
  const [leafletWindow, setLeafletWindow] = useState(
    typeof window === 'undefined' ? undefined : window.L,
  )

  useEffect(() => {
    if (window.L) {
      setLeafletWindow(window.L)
    }
  }, [window])

  return leafletWindow
}

export default useLeafletWindow
