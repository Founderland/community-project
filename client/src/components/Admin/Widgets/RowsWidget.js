import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import Tooltip from "./Tooltip"
const avatarInitials = (first, last) => {
  let initials = first[0].toUpperCase() + last[0].toUpperCase()
  return initials
}

const RowsWidget = ({ headers, item, styles, link }) => {
  const [isHovered, setisHovered] = useState(false)

  const handleMouseOver = () => {
    setisHovered(true)
  }
  const handleMouseExit = () => {
    setisHovered(false)
  }
  const { view } = useParams()
  const displayReviews = (reviews) => {
    const extra = reviews.length - 3
    let reviewsDisplay = []
    if (reviews.length) {
      if (reviews.length <= 3) {
        reviewsDisplay = [
          ...reviews.map((review) => (
            <div
              className={`cursor-default flex relative w-8 h-8 justify-center items-center m-1 mr-2 -ml-3 rounded-full text-lg text-mono border-r-2 border-white ${
                review.user.avatar
              } ${styles[String(review.user.role)]}`}
            >
              {avatarInitials(review.user.firstName, review.user.lastName)}
            </div>
          )),
        ]
      } else {
        if (extra > 0) {
          reviewsDisplay.push(
            <div className="cursor-default flex relative w-8 h-8 bg-gray-500 justify-center items-center m-1 mr-2 -ml-3 rounded-full border-r-2 border-white text-sm font-bold text-white">
              + {extra}
            </div>
          )
        }
        for (let i = 0; i < 3; i++) {
          reviewsDisplay.push(
            <div
              className={`cursor-default flex relative w-8 h-8 justify-center items-center m-1 mr-2 -ml-3 rounded-full text-lg text-mono border-r-2 border-white ${
                reviews[i].user.avatar
              } ${styles[String(reviews[i].user.role)]}`}
            >
              {avatarInitials(
                reviews[i].user.firstName,
                reviews[i].user.lastName
              )}
            </div>
          )
        }
      }
    } else {
      reviewsDisplay.push(<p className="text-sm">Not reviewed yet</p>)
    }
    return reviewsDisplay
  }

  return (
    <>
      <tr
        className="border-b border-gray-200 hover:bg-gray-100"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseExit}
      >
        {headers.map((header) => {
          if (header.key !== "-") {
            if (Array.isArray(item[header.key])) {
              return (
                <td className={`py-3 px-5 ${header.style}`}>
                  <div className={`flex items-center px-2 ${header.style}`}>
                    <div className="flex flex-row-reverse items-center">
                      {displayReviews(item[header.key])}
                    </div>
                  </div>
                </td>
              )
            } else {
              return (
                <td className={`relative  py-3 px-5  max-w-sm ${header.style}`}>
                  <p
                    className={
                      styles[
                        String(item[header.key])
                          .replace(/[^a-zA-Z0-9]/g, "")
                          .toLowerCase()
                      ]
                        ? styles[
                            String(item[header.key])
                              .replace(/[^a-zA-Z0-9]/g, "")
                              .toLowerCase()
                          ]
                        : "test"
                    }
                  >
                    {item[header.key]}
                  </p>
                  {isHovered && header.key === "interests" && (
                    <Tooltip message={item["interests"]} />
                  )}
                </td>
              )
            }
          } else {
            return (
              <td className="max-w p-3 text-center">
                <div className="flex justify-center items-center">
                  <Link
                    to={
                      link ? link + item._id : `/admin/${view}/id/${item._id}`
                    }
                    className="w-6 flex item-center justify-center transform transition duration-100 hover:text-fblue hover:scale-125"
                  >
                    {view === "forms" ? <PencilAltIcon /> : <EyeIcon />}
                  </Link>
                </div>
              </td>
            )
          }
        })}
      </tr>
    </>
  )
}

export default RowsWidget
