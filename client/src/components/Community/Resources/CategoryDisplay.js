import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import icons from "../../../assets/icons/Icons"

const CategoryDisplay = ({ category, isActive }) => {
  let history = useHistory()

  console.log(category)
  return (
    <>
      <div
        className={`group flex cursor-pointer hover:shadow-lg w-full mb-10 space-x-2 mr-2`}
        onClick={() => history.push(`/community/resources/${category.key}`)}
      >
        {icons[category.icon](
          `w-36 h-36 md:w-36 md:h-36 text-${category.color} fill-current `,
          category.color === "flime" ? "text-black" : "text-white"
        )}

        <div className="flex items-center ">
          <h1
            className={` ${
              isActive ? "text-white" : "text-black"
            } text-grotesk font-semibold text-xl md:text-2xl p-2`}
          >
            {" "}
            {category.name}
          </h1>
        </div>
      </div>
    </>
  )
}

export default CategoryDisplay
