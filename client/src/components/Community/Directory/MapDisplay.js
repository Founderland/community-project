import React, {
  useState,
  useRef,
  useCallBack,
  useEffect,
  useContext,
} from "react";
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Sidebar from "./Sidebar";
import { CommunityContext } from "../../../contexts/CommunityProvider";
// import '@reach/combobox/styles.css'

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
   height: "91vh",
  overflow:"hidden"
};
const center = {
  lat: 51.3397,
  lng: 12.3731,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomcontrol:true,
};

export default function MapDisplay(props) {
   const { memberDetails,sidebarHandler,isSidebarSelected,isCardSelected} = useContext(CommunityContext)
   const [latlong, setLatLong] = useState([]);
   const [selected, setSelected] = useState(null)
   // const [isSidebarSelected, setIssideSelected] = useState(false)

  useEffect(() => {
    console.log(memberDetails);
    const coOrdinates = [];
    for (let index = 0; index < memberDetails?.length; index++) {
      coOrdinates.push({
        lat: memberDetails[index].lat,
        lng: memberDetails[index].lng,
      });
    }
    setLatLong([...coOrdinates]);
    console.log(coOrdinates);
  }, [memberDetails]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loadind maps";
   if (!isLoaded) return "Loading Maps..";
   
   const clickHandler = (latlng) => {
      setSelected(latlng)
      sidebarHandler(true)
}
  return (
    <div className=''>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        options={options}
        >
           
           {latlong.map((latlng,index) => (
              <Marker key={index}
                 position={{ lat: parseFloat(latlng.lat), lng: parseFloat(latlng.lng) }}
                 icon={{
                    url: "/redDot.svg",
                    scaledSize: new window.google.maps.Size(30,30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(8, 6)
                 }}
                 onClick={()=>clickHandler(latlng)}
              />
           ))}
           {isSidebarSelected &&  <Sidebar data={selected} /> 
          }
        </GoogleMap>
       
    </div>
  );
}
