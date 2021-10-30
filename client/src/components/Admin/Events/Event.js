import { useParams } from "react-router-dom"
const events = [
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
  },
]

const Event = () => {
  const { id } = useParams()
  const [event] = events.filter((event) => event._id === id)
  console.log(event)
  return <div>Event id {event._id}</div>
}
export default Event
