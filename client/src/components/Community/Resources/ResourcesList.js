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

export default function ResourcesList() {
  const { config } = useContext(UserContext)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const { category, id } = useParams()

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
  return loading ? (
    <Loading />
  ) : (
    <div className="relative">
      <div className="md:flex w-full h-screen">
        <div className="w-full md:w-1/4 md:flex flex-col pt-2 md:pt-10 pl-6 bg-gray-50 bg-opacity-50">
          <div className="pt-5 pr-2">
            {categories.map((item) => (
              <CategoryDisplay
                category={item}
                isActive={item.key === category}
              />
            ))}
          </div>
        </div>
        {!category ? (
          <div className="w-full md:w-3/4 relative">
            <img
              className="w-full h-full object-cover"
              src={Resourcebg}
              alt="resource"
            />
            <div className="absolute top-0 flex items-center justify-center w-full h-full">
              <h1 className="text-hanson lg:text-7xl  2xl:text-8xl text-white p-36 ">
                The Founderland Library
              </h1>
            </div>
          </div>
        ) : id ? (
          <Article />
        ) : (
          <div className="w-full md:w-3/4 relative">
            {<DisplayArticles category={selectedCategory} />}
          </div>
        )}
      </div>
    </div>
  )
}
