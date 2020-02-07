# React Mapkit 🗺️

[![npm version](https://badge.fury.io/js/react-mapkit.svg)](https://badge.fury.io/js/react-mapkit)
[![Dependency Status](https://david-dm.org/chrisdrackett/react-mapkit.svg)](https://david-dm.org/chrisdrackett/react-mapkit)

### ⚠️ Note ⚠️

This project is still in development and is missing features (including being able to place anything other than markers on a map). Contributions are welcome!

See the [demo storybook](https://chrisdrackett.github.io/react-mapkit/)!

## Install

`yarn add react-mapkit`

### Token generation (optional)

To be able to use MapKit you need a JSON Web Token that is signed with a MapKit JS private key.

1. Follow the instruction to create a private key: [Creating a Maps Identifier and a Private Key](https://developer.apple.com/documentation/mapkitjs/creating_a_maps_identifier_and_a_private_key)

2. Use the [Apple Token Generator](https://maps.developer.apple.com/token-maker) to generate your token

Learn more about MapKit Tokens: [Creating and Using Tokens with MapKit JS
](https://developer.apple.com/documentation/mapkitjs/creating_and_using_tokens_with_mapkit_js)

## Storybook

This project contains a [storybook](https://storybook.js.org) that shows examples of how the component can be used. To use this storybook follow these steps:

1.  copy `devToken.js.rename` to `devToken.js`
2.  add a valid token from tokengen (see above) or similar to `devToken.js`
3.  run `yarn` then `yarn storybook`
4.  visit the URL storybook gives you
5.  play with maps!

## Use

`React Mapkit` can be used a couple different ways. No matter what method you use, you'll need to use a token or callback. Refer to https://developer.apple.com/documentation/mapkitjs/mapkit/2974045-init for info about using a server and callback or use the `tokengen` script included in this package to create your own token.

Now on to the various ways to use this lib:

### 1. `Map` component alone

This is probably the simplest way to use `react-mapkit`. This method works if you just want to render a single map and don't need to manipulate it (other than placing markers) via. code.

When using the `Map` component alone you'll need to provide the `tokenOrCallback` prop.

```js
import { Map, Marker } from 'react-mapkit'

const MapAlone = () => (
  <Map tokenOrCallback={<token or callback here>} center={[37.415, -122.048333]}>
    <Marker latitude={47.6754} longitude={-122.2084} />
  </Map>
)
```

### 2. `MapProvider`

The second way to use `react-mapkit` is by having a provider. This method is useful if you plan on having more than one map in your app and don't want to have a `tokenOrCallback` prop on all of them. I suggest putting the `MapkitProvider` at the top of your app so it only loads once.

```js
import { MapkitProvider, Map, Marker } from 'react-mapkit'

const MapWithProvider = () => (
  <MapkitProvider tokenOrCallback={<token or callback here>}>
    <Map center={[37.415, -122.048333]}>
      <Marker latitude={47.6754} longitude={-122.2084} />
    </Map>
  </MapkitProvider>
)
```

### 3. `MapProvider` with `useMap` hook

This is the most powerful way to use this library as it gives you full access to both `mapkit` and the `map`. This lets you do anything that mapkit supports even if this library does not yet support it. This method is similar to the above as you are using both the `MapkitProvider` and `Map` components, but you'll also use the `useMap` hook to get access to the map instance.

`useMap` provides the following:

- `mapkit`: the mapkit library itself
- `map`: the instance of a map
- `mapProps`: a set of props you'll need to spread onto a `Map` component to create a map.
- `setVisibleMapRect`, `setRegion`, `setCenter`, `setRotation`: convinance functions to manipulate the map. More coming soon!

```js
import { MapkitProvider, Map, useMap, Marker } from 'react-mapkit'

const UseMapExample = () => {
  const { map, mapProps, setRotation } = useMap()

  return (
    <>
      <button onClick={() => map.setRotationAnimated(50)}>rotate to 50deg!</button>
      <button onClick={() => setRotation(50)}>same as the above, but using the react-mapkit provided function.</button>
      <Map {...mapProps} />
    </>
  )
}

const MapWithUseMap = () => (
  <MapkitProvider tokenOrCallback={<token or callback here>}>
    <UseMapExample/>
  </MapkitProvider>
)
```

## Notes on various components / hooks

### Default Map Options

Both the `Map` component and the `useMap` hook can take default map options. for map these are passed as props. For example the following sets a custom center for the map:

```js
<Map tokenOrCallback={devToken} center={[37.415, -122.048333]} />
```

To do the same with `useMap` you would do:

```js
const { map } = useMap({ center: [37.415, -122.048333] })
```

The available options can be found here: https://developer.apple.com/documentation/mapkitjs/mapconstructoroptions

Note that some of these have been simplified so you don't need to use mapkit constructors. For example, instead of having to pass create a coordinate via `new mapkit.Coordinate(37.415, -122.048333)` to supply to `center` you just pass `[37.415, -122.048333]`.
