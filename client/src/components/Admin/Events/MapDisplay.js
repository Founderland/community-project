import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useState } from "react"
import MapMark from "./MapMark"

const containerStyle = {
  width: "100%",
  height: "100%",
}

const MapDisplay = ({ location, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <MapMark location={location} />
    </GoogleMap>
  ) : (
    ""
  )
}
export default MapDisplay
