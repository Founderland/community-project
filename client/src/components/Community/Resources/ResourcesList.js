import React, { useContext, useState } from "react"
import CategoryDisplay from "./CategoryDisplay"
import Resourcebg from "../../../assets/images/resourcebg.png"
import UserContext from "../../../contexts/User"
import { useParams } from "react-router"
import DisplayArticles from "./DisplayArticles"
import { SearchIcon } from "@heroicons/react/solid"
import axios from "axios"
import { useEffect } from "react"

export default function ResourcesList() {
  const { config } = useContext(UserContext)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewSearchBar, setViewSearchBar] = useState(false)
  const { category } = useParams()

  const data = [
    {
      id: 1,
      categoryName: "Welcome Guide",
      path: "welcomeguide",
    },
    {
      id: 2,
      categoryName: "Resources",
      path: "resources",
      articles: [
        {
          articleTitle: "Getting started",
          articleDescription:
            "If you are new to our community, this is for you ",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "17/10/2021",
        },
        {
          articleTitle: "Our Future Roadmaps",
          articleDescription:
            "This explains what we are up to inthe near feature",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "18/10/2021",
        },
      ],
    },
    {
      id: 3,
      categoryName: "Videos",
      path: "videos",
      articles: [
        {
          articleTitle: "Gender equality in the workplace",
          articleDescription: "More women on boards, so what?",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "19/10/2021",
        },
        {
          articleTitle: "Need to Nurture Entrepreneurship in Young Girls",
          articleDescription: "More women on boards, so what?",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "17/10/2021",
        },
        {
          articleTitle: "The Missing Politics of Female Empowerment",
          articleDescription: "More women on boards, so what?",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "18/10/2021",
        },
      ],
    },
  ]
  useEffect(() => {
    axios
      .get("/api/resources/", config)
      .then((res) => {
        console.log(res.data)
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

  const searchHandler = () => {
    if (!viewSearchBar) {
      setViewSearchBar(true)
    } else {
      console.log("SEARCH HERE")
    }
  }
  console.log(category)
  return loading ? (
    "loading"
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
          <div className="w-3/4 relative">
            <img
              className="w-full h-full object-cover"
              src={Resourcebg}
              alt="resource"
            />
            <div className="absolute top-0 flex items-center justify-center w-full h-full">
              <h1 className="text-hanson lg:text-7xl  2xl:text-8xl text-white p-36 ">
                {" "}
                The Founderland Library
              </h1>
            </div>
          </div>
        ) : (
          <div className="w-3/4 relative">
            {
              <DisplayArticles
                data={data.filter((item) => item.path === category)}
              />
            }
          </div>
        )}
      </div>
    </div>
  )
}
