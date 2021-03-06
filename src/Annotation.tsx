import React from 'react'
import ReactDOM from 'react-dom'

import { MapContext } from './Map'

import { createCoordinate } from './utils'

type AnnotationProps = {
  latitude: number
  longitude: number
  children: React.ReactElement
  size: NonNullable<mapkit.AnnotationConstructorOptions['size']>
} & mapkit.AnnotationConstructorOptions

export const Annotation: React.FC<AnnotationProps> = ({
  latitude,
  longitude,
  children,
  size,
  ...options
}) => {
  const { mapkit, map } = React.useContext(MapContext)
  const annotation = React.useRef<mapkit.Annotation>()

  const factory = (): Element => {
    const div = document.createElement('div')
    ReactDOM.render(children, div)

    return div
  }

  React.useEffect(() => {
    if (mapkit && map) {
      annotation.current = new mapkit.Annotation(
        createCoordinate(latitude, longitude),
        factory,
        { size, ...options },
      )
      map.addAnnotation(annotation.current)
    }

    return () => {
      if (mapkit && map && annotation.current) {
        map.removeAnnotation(annotation.current)
      }
    }
  }, [mapkit, map, children, latitude, longitude, size.width, size.height])

  return null
}
