import { useHistory } from "react-router"
import icons from "../../../assets/icons/Icons"

const CategoryDisplay = ({ category, isActive }) => {
  let history = useHistory()
  return (
    <>
      <div
        className="group flex cursor-pointer hover:shadow-lg mx-auto mb-3 md:mb-10 mr-2"
        onClick={() => history.push(`/community/resources/${category.key}`)}
      >
        <div className="flex w-10 h-10 sm:w-20 sm:h-20 xl:w-36 xl:h-36 items-center justify-center">
          {icons[category.icon](
            `w-10 h-full sm:w-20 xl:w-36 text-${
              isActive && category.color !== "flime"
                ? "white"
                : category.color === "flime" && isActive
                ? "black"
                : category.color
            } fill-current `,
            `${
              isActive
                ? "text-" + category.color
                : category.color === "flime"
                ? "text-black"
                : "text-white"
            } fill-current`
          )}
        </div>
        <div
          className={`flex flex-grow items-center bg-${
            isActive ? category.color : "white"
          }`}
        >
          <h1
            className={` ${
              isActive && category.color !== "flime"
                ? "text-white"
                : "text-black"
            } text-grotesk font-semibold text-lg sm:text-lg md:text-xl p-2`}
          >
            {category.name}
          </h1>
        </div>
      </div>
    </>
  )
}

export default CategoryDisplay
