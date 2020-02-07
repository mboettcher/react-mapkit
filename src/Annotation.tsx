import React from 'react'
import ReactDOM from 'react-dom'

import { MapContext } from './Map'

import {
  //MarkerOptions,
  createCoordinate,
  //propsToMarkerConstructionOptions,
} from './utils'

type AnnotationProps = {
  latitude: number
  longitude: number
  children: React.ReactElement
} & mapkit.AnnotationConstructorOptions

export const Annotation: React.FC<AnnotationProps> = ({
  latitude,
  longitude,
  children,
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
        options,
      )

      map.addAnnotation(annotation.current)
    }
  }, [mapkit, map])

  return null
}
