import { useEffect, useState, useContext } from "react"
import axios from "axios"
import UserContext from "../../../contexts/User"
import Loading from "../../Admin/Widgets/Loading"
import EventCard from "./EventCard"
import Pagination from "../../Admin/Widgets/Pagination"
import { SearchIcon } from "@heroicons/react/solid"
import { EmojiSadIcon } from "@heroicons/react/outline"

const eventsUrl = "/api/events/"

const EventsList = ({ state, filter }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(6)
  const [pageCount, setPageCount] = useState(0)
  const [tags, setTags] = useState([])
  const [searchTags, setSearchTags] = useState([])
  const { config, user } = useContext(UserContext)
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(eventsUrl + state, config)
        let eventsFiltered
        if (filter) {
          eventsFiltered = response.data.data.filter(
            (item) => item.member._id === user.id
          )
        } else {
          eventsFiltered = [...response.data.data]
        }
        setData(eventsFiltered)
        const allEvents = await axios.get(eventsUrl + "all", config)
        const allTags = allEvents.data.data
          .map((item) => item.tags)
          .flat(1)
          .filter((item, i, self) => i === self.indexOf(item))
          .sort((a, b) => a.substring(1).length - b.substring(1).length)
        setTags(allTags)
        setLoading(false)
        setOffset(0)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [state, filter])

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
    const slice = filteredData
      .slice(offset * perPage, offset * perPage + perPage)
      .sort((a, b) => {
        return (
          new Date(a.dateStart).setHours(0, 0, 0, 0) -
          new Date(b.dateStart).setHours(0, 0, 0, 0)
        )
      })
    setDataToDisplay(slice)
    if (searchTags.length) {
      setPageCount(Math.ceil(dataToDisplay.length / perPage))
    } else setPageCount(Math.ceil(data.length / perPage))
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
      <div className="max-w-max text-mono flex  space-x-2 items-center mt-3 pl-2">
        <SearchIcon className="h-5 w-5 text-gray-800" />
        {tags.length ? (
          tags.map((tag) => {
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
          })
        ) : (
          <p className="text-xs">No tags available</p>
        )}
      </div>
      <div className="bg-white">
        <div className="flex flex-wrap w-full justify-start overflow-auto">
          {dataToDisplay.length ? (
            dataToDisplay.map((event) => <EventCard event={event} />)
          ) : (
            <span className="font-medium flex space-x-4 items-center my-2 ml-2">
              <EmojiSadIcon className="h-6 w-6" />
              <p>Nothing to display</p>
            </span>
          )}
        </div>
        {data.length > perPage && searchTags.length === 0 ? (
          <div className="border-b border-t mt-2 min-w-max w-full border-gray-200">
            <div className="flex items-center justify-center">
              <Pagination
                setPage={setOffset}
                currentPage={offset}
                pageCount={pageCount}
              />
            </div>
          </div>
        ) : dataToDisplay.length > perPage ? (
          <div className="border-b border-t mt-2 min-w-max w-full border-gray-200">
            <div className="flex items-center justify-center">
              <Pagination
                setPage={setOffset}
                currentPage={offset}
                pageCount={pageCount}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default EventsList
