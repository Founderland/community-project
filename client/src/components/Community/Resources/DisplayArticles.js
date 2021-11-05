import React from "react"
import bannerSymbol from "../../../assets/images/bannerSymbol.png"
import ArticleCard from "./ArticleCard"
import { SearchIcon } from "@heroicons/react/solid"
import { useContext, useState, useEffect } from "react"
import UserContext from "../../../contexts/User"
import axios from "axios"
import Loading from "../../Admin/Widgets/Loading"
import Pagination from "../../Admin/Widgets/Pagination"

const resourcesUrl = "/api/resources/category/"

const DisplayArticles = ({ category }) => {
  const { config } = useContext(UserContext)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = useState(0)
  const [error, setError] = useState("")
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [perPage] = useState(6)
  const [pageCount, setPageCount] = useState(0)
  const [tags, setTags] = useState([])
  const [searchTags, setSearchTags] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(resourcesUrl + category.key, config)
        console.log(data)
        if (data) {
          console.log(data)
          const articles = [...data[0].articles]
          setData(articles)
          let allTags = articles
            .map((article) => article.tags)
            .flat(1)
            .filter((item, i, self) => i === self.indexOf(item))
            .sort((a, b) => a.substring(1).length - b.substring(1).length)
          setTags(allTags)
          setSearchTags([])
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
        setError("error loading the resources")
      }
    }
    getData()
  }, [category])
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
    <div className="w-full h-full ">
      <div
        className={`flex h-20 md:h-40 xl:h-48 w-full justify-between bg-${category.color} bg-opacity-90 shadow-lg items-center`}
      >
        <div className="">
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl text-white text-grotesk font-bold uppercase ml-5 sm:ml-10 md:ml-18">
            {category.name}
          </h1>
        </div>
        <div className="h-full hidden md:block">
          <img
            className="w-full h-full object-contain"
            src={bannerSymbol}
            alt="symbols"
          />
        </div>
      </div>
      {error ? (
        error
      ) : (
        <>
          <div className="text-mono flex space-x-2 items-center overflow-auto mt-3 pl-2">
            <SearchIcon className="h-5 w-5 text-gray-800" />
            {tags.length ? (
              tags.map((tag) => {
                const selected = searchTags.includes(tag)
                return (
                  <div
                    key={tag}
                    className={`${
                      selected
                        ? "bg-flime-300 text-black"
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
          <div className=" h-2/3 lg:h-3/4 flex justify-betweeen flex-wrap">
            {dataToDisplay.length ? (
              dataToDisplay.map((article) => <ArticleCard article={article} />)
            ) : (
              <span className="font-medium flex space-x-4 items-center my-2 ml-2">
                <p>Nothing to display</p>
              </span>
            )}
          </div>
        </>
      )}
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
  )
}

export default DisplayArticles
