import {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  CSSProperties,
} from 'react'

interface StreetViewProps
  extends Omit<google.maps.StreetViewPanoramaOptions, 'position'> {
  lat: number
  lng: number
  className?: string
  style?: CSSProperties
}

export interface StreetViewHandle {
  panorama: google.maps.StreetViewPanorama | null
}

const StreetView = forwardRef<StreetViewHandle, StreetViewProps>(
  ({ lat, lng, className, style, ...options }, ref) => {
    const panoRef = useRef<HTMLDivElement>(null)
    const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null)

    useEffect(() => {
      if (panoRef.current) {
        const position = { lat, lng }

        const panorama = new google.maps.StreetViewPanorama(panoRef.current, {
          position,
          ...options,
        })

        panoramaRef.current = panorama
      }

      return () => {
        panoramaRef.current = null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lat, lng, ...Object.values(options)])

    useImperativeHandle(
      ref,
      () => ({
        panorama: panoramaRef.current,
      }),
      []
    )

    return <div className={className} style={style} ref={panoRef} />
  }
)

StreetView.displayName = 'StreetView'

export default StreetView
