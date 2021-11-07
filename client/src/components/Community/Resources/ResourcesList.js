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
    <>
      <div className='w-full h-full md:flex bg-gray-50 bg-opacity-50'>
        <div className='w-full md:w-1/4 pt-2 md:pt-10 pl-6 '>
          {categories.map((item) => (
            <CategoryDisplay category={item} isActive={item.key === category} />
          ))}
        </div>
        <div className=' w-full md:w-3/4'>
          {!category ? (
            <div className='relative w-full h-full flex'>
              <img
                className='w-full h-full object-cover'
                src={Resourcebg}
                alt='resource'
              />
              <div className='absolute top-0 flex items-center justify-center w-full h-full'>
                <h1 className='text-hanson text-lg lg:text-4xl  2xl:text-6xl text-white p-36 '>
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
    </>
  )
}
