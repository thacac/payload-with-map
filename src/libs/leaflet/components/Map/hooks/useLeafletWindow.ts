import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useLeafletWindow = () => {
  const [leafletWindow, setLeafletWindow] = useState(
    typeof window === 'undefined' ? undefined : window.L,
  )

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.L) {
        setLeafletWindow(window.L)
        clearInterval(interval)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return leafletWindow
}

export default useLeafletWindow
