import React, {
  useState,
  useRef,
  useCallBack,
  useEffect,
  useContext,
} from "react"
import {
  GoogleMap,
  useLoadScript,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import womenImg from "../../../assets/images/women.png"
import { useHistory } from "react-router"
import "./MapDisplay.css"
import mapStyles from "./mapStyles"
import Sidebar from "./Sidebar"
import { CommunityContext } from "../../../contexts/CommunityProvider"
import Autocomplete from "react-autocomplete"

// import '@reach/combobox/styles.css'

const libraries = ["places"]
const mapContainerStyle = {
  width: "100vw",
  height: "100%",
  overflow: "hidden",
}
const center = {
  lat: 51.3397,
  lng: 12.3731,
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomcontrol: true,
}

export default function MapDisplay(props) {
  const {
    memberDetails,
    sidebarHandler,
    isSidebarSelected,
    isNameSelectedEvent,
    isNameSelected,
    mobileScreen,
  } = useContext(CommunityContext)
  const [latlong, setLatLong] = useState([])
  const [selected, setSelected] = useState(null)
  const [isHovered, setisHovered] = useState(false)
  const [openSearchMenu, setOpenSearchMenu] = useState(false)
  const [hoverElement, setHoverElement] = useState({
    lat: 0,
    lng: 0,
    index: 0,
  })
  const [total, setTotal] = useState(0)
  const [searchValue, setSearchValue] = useState("")
  const [screenwidth, setScreenWidth] = useState(window.innerWidth)
  const history = useHistory()
  // const [isSidebarSelected, setIssideSelected] = useState(false)

  useEffect(() => {
    const coOrdinates = []
    for (let index = 0; index < memberDetails?.length; index++) {
      coOrdinates.push({
        lat: memberDetails[index].geoLocation?.lat,
        lng: memberDetails[index].geoLocation?.lng,
      })
    }
    setLatLong([...coOrdinates])
    return () => {
      sidebarHandler(false)
    }
  }, [memberDetails])

  // Emptying search value
  useEffect(() => {
    if (!isNameSelected) {
      setSearchValue("")
    }
  }, [isNameSelected])

  // Renders when screen size changes
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [screenwidth])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const mapRef = React.useRef()
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])

  if (loadError) return "Error loadind maps"
  if (!isLoaded) return "Loading Maps.."

  const clickHandler = (latlng) => {
    setSelected(latlng)
    sidebarHandler(true)
  }
  function handleMouseOver(lat, lng, index) {
    setHoverElement({ lat: lat, lng: lng, index: index })
    setisHovered(true)

    let count = 0
    for (let i = 0; i < memberDetails.length; i++) {
      if (
        memberDetails[i].geoLocation?.lat === lat &&
        memberDetails[i].geoLocation?.lat
      ) {
        count++
      }
    }
    setTotal(count)
  }
  const handleMouseExit = () => {
    setisHovered(false)
  }

  const selectHandler = (val, item) => {
    setSearchValue(val)
    setOpenSearchMenu(false)
    isNameSelectedEvent(true)
    // selectedNameEvent(item)
    // sidebarHandler(true)
    history.push(`/community/profile/${item._id}`)
    isNameSelectedEvent(false)
  }

  const onSearchTypeHandler = (event) => {
    if (event.target.value.length > 0) {
      setOpenSearchMenu(true)
    } else {
      setOpenSearchMenu(false)
    }
    setSearchValue(event.target.value)
  }

  return (
    <div className="relative h-full">
      <div className="absolute left-0 right-0 z-40 md:w-1/2 m-4 h-14">
        <Autocomplete
          className=""
          getItemValue={(item) => `${item.firstName} ${item.lastName}`}
          items={memberDetails}
          shouldItemRender={(item, value) =>
            item.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            item.lastName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          wrapperStyle={{
            display: "inline-block",
            width: "100%",
            height: "100%",
          }}
          open={openSearchMenu}
          renderInput={(props) => (
            <div className="relative">
              <input
                {...props}
                type="text"
                id="rounded-email"
                className="w-full xl:w-3/4 h-full border-flime-500 shadow-lg flex-1 appearance-none border-2  md:ml-10 py-2 px-6 bg-white text-gray-700 xs:text-md md:text-xl placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fpink focus:border-transparent placeholder-black-100 text-mono "
                placeholder="Search Founder by name.."
              />
            </div>
          )}
          renderMenu={(items, value, style) => (
            <div
              children={items}
              className="w-full md:w-3/4 md:ml-10 max-h-64 overflow-y-scroll"
            />
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className="p-4 border-b border-gray-400 text-lg md:text-xl 2xl:text-3xl"
              style={{ background: isHighlighted ? "lightgray" : "white" }}
            >
              {item.firstName + " " + item.lastName}
            </div>
          )}
          value={searchValue}
          onChange={(e) => onSearchTypeHandler(e)}
          onSelect={(val, item) => selectHandler(val, item)}
        />
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={screenwidth < 600 ? 3 : 5.7}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {latlong.map((latlng, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(latlng.lat),
              lng: parseFloat(latlng.lng),
            }}
            icon={
              screenwidth < 600
                ? {
                    url: "/dot.png",
                    scaledSize: new window.google.maps.Size(10, 10),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(3, 3),
                  }
                : {
                    url: "/redDot.svg",
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(8, 6),
                  }
            }
            onClick={() => clickHandler(latlng)}
            onMouseOver={() => handleMouseOver(latlng.lat, latlng.lng, index)}
            onMouseOut={handleMouseExit}
          >
            {isHovered && index === hoverElement?.index && (
              <InfoWindow>
                <div>
                  <div className="flex">
                    <img className="w-8" src={womenImg} alt="icon" />
                    <div className="flex flex-col justify-end items-end w-8">
                      <h2 className="text-2xl font-semibold "> - {total} </h2>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {isSidebarSelected && <Sidebar data={selected} />}
      </GoogleMap>
    </div>
  )
}
