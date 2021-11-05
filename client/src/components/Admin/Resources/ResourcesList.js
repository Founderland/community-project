import { useEffect, useState, useContext } from "react"
import { SearchIcon } from "@heroicons/react/solid"
import { EmojiSadIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import axios from "axios"
import Loading from "../Widgets/Loading"
import ResourceCard from "./ResourceCard"
import Pagination from "../Widgets/Pagination"

const resourcesUrl = "/api/resources/category/"

const ResourcesList = ({ categories, category }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(6)
  const [pageCount, setPageCount] = useState(0)
  const [tags, setTags] = useState([])
  const [searchTags, setSearchTags] = useState([])
  const { reload, selectedTab, config } = useContext(AdminContext)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(resourcesUrl + category, config)
        if (data) {
          const articles = [...data[0].articles]
          setData(articles)
          let allTags = articles
            .map((article) => article.tags)
            .flat(1)
            .filter((item, i, self) => i === self.indexOf(item))
            .sort((a, b) => a.substring(1).length - b.substring(1).length)

          setTags(allTags)
          setLoading(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [reload, selectedTab])

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
  console.log(data)
  return loading ? (
    <Loading />
  ) : (
    <div className="w-full px-2 ">
      <>
        <div className="max-w-max text-mono flex  space-x-2 items-center overflow-x-auto mt-3 pl-2">
          <SearchIcon className="h-8 w-8  text-gray-800" />
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
        <div className="flex w-full justify-start overflow-auto mt-2">
          {dataToDisplay.length ? (
            dataToDisplay.map((article) => (
              <ResourceCard key={article.articleTitle} resource={article} />
            ))
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
      </>
    </div>
  )
}

export default ResourcesList
