import { useEffect, useState, useContext } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import EventCard from "./EventCard"

const eventsUrl = "/api/events/"

const EventsList = ({ state }) => {
  const [data, setData] = useState([
    {
      _id: "1",
      title: "Fundraiser",
      photo: null,
      description: "Fundraiser for Climate",
      dateStart: "2021-11-02T10:00:00.000Z",
      dateEnd: "2021-11-04T12:00:00.000Z",
      address: "Geschwister-Scholl-Straße",
      city: "Berlin",
      geoLocation: {
        lat: 52.5205888,
        lng: 13.3912322,
      },
      type: "public",
      link: "",
      tags: ["#fundraiser", "#climate-change"],
      annouce: false,
      zoom: 18,
      location: "Library",
      organizer: { _id: "1", firstName: "Victor", lastName: "Isidoro" },
      interested: [],
      going: [],
    },
    {
      _id: "2",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: "2021-11-02T10:00:00.000Z",
      dateEnd: "2021-11-04T12:00:00.000Z",
      address: "",
      city: "",
      geoLocation: {
        lat: 52.5205888,
        lng: 13.3912322,
      },
      type: "online",
      link: "https://www.techonthenet.com/js/string_match.php",
      tags: ["#food", "#speaker", "#online"],
      annouce: false,
      zoom: 18,
      location: "",
      organizer: { _id: "1", firstName: "Sasmitha", lastName: "Kumar" },
      interested: [],
      going: [],
    },
  ])
  const [loading, setLoading] = useState(true)
  const { token, reload, selectedTab, config } = useContext(AdminContext)
  console.log(data)

  useEffect(() => {
    axios
      .get(eventsUrl + state, config)
      .then((res) => {
        if (res.data.data.length) setData(res.data.data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [reload, selectedTab])

  return loading ? (
    <Loading />
  ) : (
    <div className="flex flex-col px-3">
      <p>
        List of {state} Events ({data?.length})
      </p>
      <div className="flex w-full justify-start">
        {data.map((event) => (
          <EventCard event={event} />
        ))}
      </div>
    </div>
  )
}

export default EventsList
