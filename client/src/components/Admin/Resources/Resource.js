import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Loading from "../Widgets/Loading"
import moment from "moment"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"

const resourceUrl = "/api/resources/id/"

const Resource = () => {
  const { id } = useParams()
  const { config } = useContext(AdminContext)
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //GET DATA FROM DB WITH resourceId FROM URL
  useEffect(() => {
    axios
      .get(resourceUrl + id, config)
      .then((res) => {
        if (res.data) {
          const [article] = res.data.articles.filter(
            (article) => article._id === id
          )
          setData(article)
          setLoading(false)
        } else {
          setError("No ressource found with this ID")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])
  console.log(data)
  return (
    <section className=" h-full py-1 bg-white w-full lg:w-5/6 px-4 mx-auto mt-6">
      {loading ? (
        <Loading />
      ) : error ? (
        error
      ) : (
        <article className="py-2 px-4">
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative">
            <div
              className=" left-0 bottom-0 w-full h-full z-10 "
              style={{
                backgroundImage:
                  "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
              }}
            ></div>
            <img
              src={data.articleCover.url}
              className=" left-0 top-0 w-full h-full z-0 object-cover"
              alt="article cover"
            />
            <div className="p-4  bottom-0 left-0 z-20 bg-gradient-to-t from-gray-600 to-gray-100 ">
              {data.tags.map((tag) => (
                <p className="mx-1 text-xs px-2 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                  {tag}
                </p>
              ))}
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                {data.articleTitle}
              </h2>
              <div className="flex mt-3">
                <img
                  src={data.member.photo?.url}
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                  alt="user profile"
                />
                <div>
                  <p className="font-semibold text-gray-100 text-sm">
                    {data.member.firstName} {data.member.lastName}
                  </p>
                  <p className="font-semibold text-gray-300 text-xs">
                    {moment(data.articleSubmittedDate).format("D MMMM YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto my-4 px-6 text-justify text-base">
            <p>{data.articleDescription}</p>
          </div>
          <div className="max-w-3xl mx-auto px-2">
            {data.articleType === "article" ? (
              <div
                dangerouslySetInnerHTML={{ __html: data.articleContent }}
              ></div>
            ) : data.articleType === "link" ? (
              "link"
            ) : data.articleType === "picture" ? (
              <img
                src={data.articleFile.url}
                className="w-full h-full object-cover"
                alt="article cover"
              />
            ) : (
              "video"
            )}
          </div>
          {data.sources.length > 0 && (
            <div className="max-w-3xl mx-auto my-4 px-6 p-2 text-justify text-sm border-t-2 border-gray-200">
              <ul className="list-outside list-disc text-xs py-2">
                {data.sources.map((source) => (
                  <li className=" text-xs text-mono">
                    <a href={source} target="_blank" rel="noreferrer">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <footer className="max-w-3xl mx-auto border-t-2 border-gray-200 mt-2">
            <p className="text-center text-xs py-2">
              Last updated -
              {moment(data.articleLastUpdated).format("DD MMMM YYYY")}
            </p>
          </footer>
        </article>
      )}
    </section>
  )
}

export default Resource
