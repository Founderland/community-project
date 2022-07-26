import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { TrashIcon } from "@heroicons/react/outline"
import Loading from "../Widgets/Loading"
import moment from "moment"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import ConfirmModal from "../Widgets/ConfirmModal"
import Confirm from "./Confirm"
import AddResource from "./AddResource"
import LinkPreview from "./LinkPreview"
import ReactPlayer from "react-player"
import "react-quill/dist/quill.snow.css"

const resourceUrl = "/api/resources/id/"

const Resource = ({ category, categories }) => {
  const { id } = useParams()
  const { config, reload, setCCModal, user } = useContext(AdminContext)
  const [data, setData] = useState({})
  const [edit, setEdit] = useState(false)
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
  }, [id, reload])

  return (
    <section className="relative self-center flex flex-col w-full xl:w-5/6 2xl:w-4/6 pb-6 shadow-lg border-0">
      <ConfirmModal>
        <Confirm data={data} />
      </ConfirmModal>
      {loading ? (
        <Loading />
      ) : error ? (
        error
      ) : edit ? (
        <AddResource
          categories={categories}
          category={category}
          article={data}
          edit={edit}
          setEdit={setEdit}
        />
      ) : (
        <>
          <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative">
            <div
              className="absolute left-0 bottom-0 w-full h-full z-10 "
              style={{
                backgroundImage:
                  "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
              }}
            ></div>
            <img
              src={data.article.articleCover.url}
              className="relative left-0 top-0 w-full h-full z-0 object-cover"
              alt="article cover"
            />
            <div
              className="absolute w-full left-0 bottom-0 p-4 z-10"
              style={{
                backgroundImage:
                  "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
              }}
            >
              {data.article.tags.map((tag) => (
                <p className="mx-1 text-xs px-2 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">
                  {tag}
                </p>
              ))}
              <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
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

          <div className="max-w-3xl mx-auto my-4 px-6 py-8 text-justify text-base text-mono">
            <p>{data.article.articleDescription}</p>
          </div>
          <div className="max-w-3xl mx-auto px-2 flex justify-center items-center pb-4">
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
            <div className="max-w-3xl mx-auto mt-6 px-6 p-2 text-justify text-sm border-t-2 border-gray-200">
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
          <footer className="max-w-3xl mx-auto border-t-2 border-gray-200 mt-1">
            <p className="text-center text-xs py-2">
              Last updated -{" "}
              {moment(data.article.articleLastUpdated).format("DD MMMM YYYY")}
            </p>
          </footer>
          {user.role.includes("admin") && (
            <div className="px-4 pt-6 flex flex-col sm:flex-row-reverse items-center justify-around ">
              <button
                className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                onClick={() => {
                  setEdit(true)
                }}
              >
                Edit
              </button>

              <button
                className="flex justify-center items-center px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
                onClick={() => {
                  setCCModal(true)
                }}
              >
                <TrashIcon className="h-5 w-5" />
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Resource
