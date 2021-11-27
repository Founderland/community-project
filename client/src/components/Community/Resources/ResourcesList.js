import React, { useContext, useState } from "react"
import CategoryDisplay from "./CategoryDisplay"
import Resourcebg from "../../../assets/images/resourcebg.png"
import UserContext from "../../../contexts/User"
import { useParams } from "react-router"
import DisplayArticles from "./DisplayArticles"
import axios from "axios"
import { useEffect } from "react"
import Loading from "../../Admin/Widgets/Loading"
import Article from "./Article"
import { CommunityContext } from "../../../contexts/CommunityProvider"

export default function ResourcesList() {
  const { config } = useContext(UserContext)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { category, id } = useParams()
  const { scrollUp } = useContext(CommunityContext)

  useEffect(() => {
    axios
      .get("/api/resources/", config)
      .then((res) => {
        let filteredData = res.data.map((category, i) => ({
          index: i,
          id: category._id,
          name: category.categoryName,
          key: category.categoryKey,
          icon: category.categoryIcon,
          color: category.categoryColor,
          locked: category.numberOfArticles !== 0 ? false : true,
        }))
        setCategories(filteredData)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [selectedCategory] = categories.filter((item) => item.key === category)

  useEffect(() => {
    scrollUp()
  }, [selectedCategory])

  return loading ? (
    <Loading />
  ) : (
    <div className="fixed w-full h-full md:flex bg-gray-50 bg-opacity-50">
      <div className="w-full h-28 md:h-full md:w-1/4 py-2 md:py-8 md:pb-16 pl-6 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-fpink scrollbar-track-pink-100 ">
        {categories.map((item) => (
          <CategoryDisplay
            key={item}
            category={item}
            isActive={item.key === category}
          />
        ))}
      </div>
      <div className="h-full w-full md:w-3/4">
        {!category ? (
          <div className="relative w-full h-full flex">
            <img
              className="w-full h-full object-cover"
              src={Resourcebg}
              alt="resource"
            />
            <div className="absolute top-0 flex items-start md:items-center justify-center w-full h-full">
              <h1 className="text-hanson text-2xl md:text-4xl lg:text-6xl  2xl:text-8xl text-white p-36 ">
                The Founderland Library
              </h1>
            </div>
          </div>
        ) : id ? (
          <Article />
        ) : (
          <DisplayArticles category={selectedCategory} />
        )}
      </div>
    </div>
  )
}
