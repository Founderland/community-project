import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { useCallback, useRef } from "react"
import MapMark from "./MapMark"

const containerStyle = {
  width: "100%",
  height: "100%",
}
const mapStyles = [
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.province",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        color: "#6cd265",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#4cb6eb",
      },
    ],
  },
]
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomcontrol: true,
}

const MapDisplay = ({ location, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={zoom}
      options={options}
      onLoad={onMapLoad}
    >
      <MapMark location={location} />
    </GoogleMap>
  ) : (
    ""
  )
}
export default MapDisplay
