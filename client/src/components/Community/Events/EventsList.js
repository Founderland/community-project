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
    <div className="relative h-full flex-none flex flex-col w-full overflow-hidden px-2 pb-12">
      <div className="sticky flex-none z-20 bg-white w-full text-mono flex flex-col overflow-hidden">
        <div className="flex-none w-full flex space-x-2 pl-2 py-2 items-center overflow-hidden">
          <SearchIcon className="flex-none h-4 w-4 md:h-6 md:w-6 text-gray-800" />
          <div className="flex items-center py-1 space-x-2 overflow-x-scroll scrollbar scrollbar-thin scrollbar-thumb-flime scrollbar-track-green-100">
            {tags.length ? (
              tags.map((tag) => {
                const selected = searchTags.includes(tag)
                return (
                  <div
                    key={tag}
                    className={`${
                      selected
                        ? "bg-green-700 text-flime"
                        : "bg-gray-200 text-gray-600"
                    } group flex items-center space-x-2 w-max h-6 py-1 px-2 m-1 text-center cursor-pointer`}
                    onClick={() => filterTag(tag)}
                  >
                    <p className=" text-xs">{tag}</p>
                  </div>
                )
              })
            ) : (
              <p className="flex-none text-mono text-xs py-1 px-2 ">
                No tags available
              </p>
            )}
          </div>
        </div>
        {(data.length > perPage && searchTags.length === 0) ||
        dataToDisplay.length > perPage ? (
          <div className="flex-none flex justify-center pl-2 py-1 bg-white w-full ">
            <Pagination
              setPage={setOffset}
              currentPage={offset}
              pageCount={pageCount}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col md:flex-wrap w-full justify-start overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100 ">
        {dataToDisplay.length ? (
          dataToDisplay.map((event) => <EventCard event={event} />)
        ) : (
          <span className="font-medium flex space-x-4 items-center my-2 ml-2">
            <EmojiSadIcon className="h-6 w-6" />
            <p>Nothing to display</p>
          </span>
        )}
      </div>
    </div>
  )
}

export default EventsList
