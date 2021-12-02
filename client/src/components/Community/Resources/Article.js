import { useHistory, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import Loading from "../../Admin/Widgets/Loading"
import moment from "moment"
import axios from "axios"
import UserContext from "../../../contexts/User"
import LinkPreview from "../../Admin/Resources/LinkPreview"
import ReactPlayer from "react-player"
import SlideShow from "./SlideShow"
import { ChevronLeftIcon } from "@heroicons/react/outline"
import "react-quill/dist/quill.snow.css"

const resourceUrl = "/api/resources/id/"

const Article = () => {
  const { id } = useParams()
  const history = useHistory()
  const { config } = useContext(UserContext)
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
          setData({ _id: res.data._id, article: article })
          setLoading(false)
        } else {
          setError("No ressource found with this ID")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  return (
    <section className=" h-full w-full overflow-y-scroll pb-56 md:pb-20 scrollbar scrollbar-thin scrollbar-thumb-fblue scrollbar-track-blue-100 ">
      {loading ? (
        <Loading />
      ) : error ? (
        error
      ) : data.article.articleType === "link" &&
        data.article.articleContent.includes("docs.google.com/presentation") ? (
        <SlideShow url={data.article.articleContent} />
      ) : (
        <div className="w-full md:max-w-3xl mx-auto">
          <div className="w-full relative">
            <div
              className="absolute letf-0 bottom-0 w-full h-full z-10 "
              style={{
                backgroundImage:
                  "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
              }}
            ></div>
            <img
              src={data.article.articleCover.url}
              className="relative w-full h-full z-0 object-cover"
              alt="article cover"
            />
            <button
              onClick={() => history.goBack()}
              className="absolute z-20 top-2 left-2 flex items-center shadow-2xl space-x-2 px-2 py-1 m-2 bg-flime text-black text-sm text-mono transition ease-in duration-200 hover:bg-fblue hover:text-white"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <p className="hidden md:block text-mono text-sm">Back</p>
            </button>
            <div
              className="absolute w-full left-0 bottom-0 p-4 z-10  "
              style={{
                backgroundImage:
                  "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
              }}
            >
              {data.article.tags.map((tag) => (
                <p className="mx-1 cursor-default text-xs px-2 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                  {tag}
                </p>
              ))}

              <h2 className="text-lg sm:text-xl md:text-4xl font-semibold text-gray-100 leading-tight">
                {data.article.articleTitle}
              </h2>
              <div className="flex mt-3">
                <img
                  src={data.article.member.photo?.url}
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                  alt="user profile"
                />
                <div>
                  <p className="font-semibold text-gray-100 text-sm">
                    {data.article.member.firstName}{" "}
                    {data.article.member.lastName}
                  </p>
                  <p className="font-semibold text-gray-300 text-xs">
                    {moment(data.article.articleSubmittedDate).format(
                      "D MMMM YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full my-2 px-4 md:px-6 py-4 text-justify text-sm md:text-base text-mono">
            <p>{data.article.articleDescription}</p>
          </div>
          <div className="w-full px-2 flex justify-center items-center pb-4">
            {data.article.articleType === "article" ? (
              <div
                className="w-full ql-editor"
                style={{ padding: 0 }}
                dangerouslySetInnerHTML={{
                  __html: data.article.articleContent,
                }}
              ></div>
            ) : data.article.articleType === "link" ? (
              <LinkPreview url={data.article.articleContent} />
            ) : data.article.articleType === "picture" ? (
              <img
                src={data.article.articleFile.url}
                className="w-full h-full object-cover"
                alt="article cover"
              />
            ) : (
              <ReactPlayer
                controls={true}
                url={data.article.articleContent}
              ></ReactPlayer>
            )}
          </div>
          {data.article.sources.length > 0 && (
            <div className="w-full mt-6 px-6 p-2 text-justify text-sm border-t-2 border-gray-200">
              <p className="text-xs mt-1">Sources:</p>
              <ul className="list-outside list-disc text-xs py-2">
                {data.article.sources.map((source) => (
                  <li className=" text-xs text-mono">
                    <a href={source} target="_blank" rel="noreferrer">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <footer className="w-full border-t-2 border-gray-200 mt-1 ">
            <p className="text-center text-xs py-2">
              Last updated -{" "}
              {moment(data.article.articleLastUpdated).format("DD MMMM YYYY")}
            </p>
          </footer>
        </div>
      )}
    </section>
  )
}

export default Article
