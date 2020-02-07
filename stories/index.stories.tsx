import React from 'react'

import { storiesOf } from '@storybook/react'

import { Map, MapkitProvider, useMap, Marker, Annotation } from '../src'
import devToken from '../devToken'

const UseMapExample = () => {
  const { setRotation, mapProps } = useMap()

  return (
    <>
      <button onClick={() => setRotation(Math.random() * 360)}>rotate!</button>
      <Map {...mapProps} />
    </>
  )
}

storiesOf('Use', module)
  .add('with a provider', () => (
    <MapkitProvider tokenOrCallback={devToken}>
      <Map />
    </MapkitProvider>
  ))
  .add('just a Map', () => <Map tokenOrCallback={devToken} />)
  .add('using a ref', () => {
    return (
      <MapkitProvider tokenOrCallback={devToken}>
        <UseMapExample />
      </MapkitProvider>
    )
  })
  .add('multiple providers', () => (
    <>
      <MapkitProvider tokenOrCallback={devToken}>
        <Map />
      </MapkitProvider>
      <MapkitProvider tokenOrCallback={devToken}>
        <Map />
      </MapkitProvider>
    </>
  ))

storiesOf('Defaults', module)
  .add('center', () => (
    <Map tokenOrCallback={devToken} center={[37.415, -122.048333]} />
  ))
  .add('visibleMapRect', () => (
    <Map tokenOrCallback={devToken} visibleMapRect={[0.5, 0.2, 0.3, 0.4]} />
  ))
  .add('region', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 37.415,
        longitude: -122.048333,
        latitudeSpan: 0.016,
        longitudeSpan: 0.016,
      }}
    />
  ))
  .add('rotation', () => <Map tokenOrCallback={devToken} rotation={90} />)
  .add('tint', () => <Map tokenOrCallback={devToken} tintColor={'#00b64e'} />)
  .add('padding', () => <Map tokenOrCallback={devToken} padding={20} />)

storiesOf('Annotations', module)
  .add('adding a marker', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <Marker latitude={47.6754} longitude={-122.2084} />
      <Marker
        latitude={47.6764}
        longitude={-122.2073}
        title={'Tea here!'}
        subtitle={'coffee too ☕'}
      />
    </Map>
  ))
  .add('adding a annotation', () => (
    <Map
      tokenOrCallback={devToken}
      region={{
        latitude: 47.6754,
        longitude: -122.2084,
        latitudeSpan: 0.006,
        longitudeSpan: 0.006,
      }}
    >
      <Annotation latitude={47.6754} longitude={-122.2084}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            backgroundColor: 'green',
            padding: 15,
            textAlign: 'center',
            verticalAlign: 'middle',
            display: 'table-cell',
          }}
        >
          custom annotation
        </div>
      </Annotation>
    </Map>
  ))
