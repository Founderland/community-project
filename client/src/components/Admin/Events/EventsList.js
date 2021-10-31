import { useEffect, useState, useContext } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import EventCard from "./EventCard"
import Pagination from "../Widgets/Pagination"
import { SearchIcon } from "@heroicons/react/solid"
import { EmojiSadIcon } from "@heroicons/react/outline"

const eventsUrl = "/api/events/"

const EventsList = ({ state }) => {
  const [data, setData] = useState([
    {
      _id: "61717b06b088de36430653a1",
      title: "Fundraiser",
      photo: null,
      description: "Fundraiser for Climate",
      dateStart: new Date("2021-11-02T10:00:00.000Z"),
      dateEnd: new Date("2021-11-04T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Victor",
        lastName: "Isidoro",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a2",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-02T10:00:00.000Z"),
      dateEnd: new Date("2021-11-04T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a3",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-04T10:00:00.000Z"),
      dateEnd: new Date("2021-11-04T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a4",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-06T10:00:00.000Z"),
      dateEnd: new Date("2021-11-07T12:00:00.000Z"),
      address: "",
      city: "",
      geoLocation: {
        lat: 52.5205888,
        lng: 13.3912322,
      },
      type: "online",
      link: "https://www.techonthenet.com/js/string_match.php",
      tags: ["#health", "#speaker", "#online"],
      annouce: false,
      zoom: 18,
      location: "",
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a5",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-07T10:00:00.000Z"),
      dateEnd: new Date("2021-11-07T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a6",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-06T10:00:00.000Z"),
      dateEnd: new Date("2021-11-06T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a7",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-08T10:00:00.000Z"),
      dateEnd: new Date("2021-11-08T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a8",
      title: "Halloween",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-10-31T10:00:00.000Z"),
      dateEnd: new Date("2021-11-01T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
    {
      _id: "61717b06b088de36430653a9",
      title: "Conference",
      photo: null,
      description: "Conference on Food Shortage",
      dateStart: new Date("2021-11-02T10:00:00.000Z"),
      dateEnd: new Date("2021-11-04T12:00:00.000Z"),
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
      host: {
        _id: "61717b06b088de36430653a1",
        firstName: "Sasmitha",
        lastName: "Kumar",
      },
      interested: [],
      going: [],
      canceled: false,
    },
  ])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(6)
  const [pageCount, setPageCount] = useState(0)
  const [tags, setTags] = useState([])
  const [searchTags, setSearchTags] = useState([])
  const { reload, selectedTab, config } = useContext(AdminContext)

  useEffect(() => {
    axios
      .get(eventsUrl + state, config)
      .then((res) => {
        if (res.data.data.length) setData(res.data.data)
        //GET ALL AVAILABLE TAGS
        const allTags = data
          .map((item) => item.tags)
          .flat(1)
          .filter((item, i, self) => i === self.indexOf(item))
          .sort((a, b) => a.substring(1).length - b.substring(1).length)
        setTags(allTags)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [reload, selectedTab, searchTags])

  useEffect(() => {
    let filteredData = [...data]
    //FILTER BY TAGS
    if (searchTags.length) {
      searchTags.forEach(
        (tag) =>
          (filteredData = [
            ...filteredData.filter((item) => item.tags.includes(tag)),
          ])
      )
    }
    //SORT DATA BY DATES
    data.sort((a, b) => {
      return a.dateStart - b.dateStart
    })
    const slice = filteredData.slice(
      offset * perPage,
      offset * perPage + perPage
    )
    setDataToDisplay(slice)
    setPageCount(Math.ceil(data.length / perPage))

    return () => {
      setDataToDisplay([])
    }
  }, [data, offset, searchTags])

  const filterTag = (value) => {
    let newFilter = [...searchTags]
    if (newFilter.includes(value))
      newFilter = newFilter.filter((el) => el !== value)
    else newFilter.push(value)
    setSearchTags(newFilter)
  }
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full px-2 ">
      <div className="text-mono flex items-center overflow-auto">
        <SearchIcon className="h-5 w-5 text-gray-800" />
        {tags.map((tag) => {
          const selected = searchTags.includes(tag)
          return (
            <div
              key={tag}
              className={`${
                selected
                  ? "bg-green-300 text-green-600"
                  : "bg-gray-200 text-gray-600"
              } group flex items-center space-x-2 w-max h-6 py-1 px-2 m-1 text-center cursor-pointer`}
              onClick={() => filterTag(tag)}
            >
              <p className=" text-xs">{tag}</p>
            </div>
          )
        })}
      </div>
      <div className="bg-white">
        <div className="flex w-full justify-start overflow-auto">
          {dataToDisplay.length ? (
            dataToDisplay.map((event) => {
              console.log(event)
              return <EventCard event={event} />
            })
          ) : (
            <span className="font-medium flex space-x-4 items-center my-2 ml-2">
              <EmojiSadIcon className="h-6 w-6" />
              <p>Nothing to display</p>
            </span>
          )}
        </div>
        {data.length > perPage && (
          <div className="border-b border-t mt-2 min-w-max w-full border-gray-200">
            <div className="flex items-center justify-center">
              <Pagination
                setPage={setOffset}
                currentPage={offset}
                pageCount={pageCount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsList
