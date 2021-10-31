import { Marker } from "@react-google-maps/api"
const MapMark = ({ location }) => {
  return (
    <Marker
      position={{
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      }}
      icon={{
        url: "/redDot.svg",
        scaledSize: new window.google.maps.Size(30, 30),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(8, 6),
      }}
    />
  )
}

export default MapMark
