import { EyeIcon, PencilAltIcon } from "@heroicons/react/outline"
import { Link, useParams } from "react-router-dom"
import { useContext } from "react"
import AdminContext from "../../../contexts/Admin"

const RowsWidget = ({ headers, item, styles, link }) => {
  const { view } = useParams()
  const { avatarInitials } = useContext(AdminContext)
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
      <tr className="border-b border-gray-200 hover:bg-gray-100">
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
                        : "text-sm"
                    }
                  >
                    {item[header.key]}
                  </p>
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
                    {view === "forms" ? (
                      <PencilAltIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
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
