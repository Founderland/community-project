import { useState, useContext } from "react"
import { useHistory } from "react-router"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import ListOption from "../Widgets/ListOption"
import Banner from "../Widgets/Banner"
import Tags from "../Widgets/Tags"
import Sources from "../Widgets/Sources"
import QuillEditor from "../Widgets/QuillEditor"
import Dropzone from "../Widgets/DropZone"

const types = [
  { name: "Article", value: "article" },
  { name: "Link", value: "link" },
  { name: "Video", value: "video" },
  { name: "Picture", value: "picture" },
]
const addResourceUrl = "/api/resources/add"

const AddResource = ({ categories, category }) => {
  const history = useHistory()
  const [data, setData] = useState({
    member: "61814cbf5f7dd7305e7615f5",
    articleTitle: "",
    articleContent: "",
    articleDescription: "",
    articleType: "article",
    photo: null,
    tags: [],
    sources: [],
    categoryKey: category,
  })
  const [saving, setSaving] = useState(false)
  const [banner, setBanner] = useState({})
  const [required, setRequired] = useState(false)
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: "",
  })

  const onEditorChange = (value) => {
    setData((prev) => ({
      ...prev,
      articleContent: value,
    }))
  }

  const { config, reload, setReload } = useContext(AdminContext)

  const save = async () => {
    setSaving(true)
    if (data.articleTitle && data.articleDescription && data.articleContent) {
      try {
        const newResource = await axios.post(addResourceUrl, data, config)
        if (newResource.data.success) {
          setSaving(false)
          setBanner({
            success: 1,
            show: true,
            message: "Resource saved! Redirecting...",
          })
          setTimeout(() => {
            setBanner((prev) => ({ ...prev, show: false }))
            setReload(reload + 1)
            history.goBack()
          }, 5000)
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      setSaving(false)
      setRequired(true)
      setBanner({
        error: 1,
        show: true,
        message: "Please fill in all required fields!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
        setRequired(false)
      }, 5000)
    }
  }
  const setCategory = (value) => {
    setData((prev) => ({
      ...prev,
      categoryKey: value,
      categoryName: categories.filter((cat) => cat.value === value),
    }))
  }
  const setType = (value) => {
    setData((prev) => ({ ...prev, articleType: value }))
  }
  const pushTag = (value) => {
    const convertedValue =
      "#" +
      value
        .replace(/[^\w,;\s]+/g, "")
        .replace(/\s+/g, "-")
        .replace(/[,;]{2,}/g, "")
        .toLowerCase()
    if (!data.tags.includes(convertedValue)) {
      setData((prev) => ({ ...prev, tags: [...data.tags, convertedValue] }))
    }
  }
  const popTag = (value) => {
    const newTags = [...data.tags].filter((tag) => tag !== value)

    setData((prev) => ({ ...prev, tags: newTags }))
  }
  const pushSource = (value) => {
    if (!data.sources.includes(value)) {
      setData((prev) => ({ ...prev, sources: [...data.sources, value] }))
    }
  }
  const popSource = (value) => {
    const newSources = [...data.sources].filter((source) => source !== value)

    setData((prev) => ({ ...prev, sources: newSources }))
  }
  const isLink = (link) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/.test(
      link
    )
  }
  const regex = new RegExp("(?:link|video)", "g")
  return (
    <div className="bg-white px-4 md:px-8 pt-6 pb-4 flex flex-col w-full xl:w-5/6">
      <div className="w-full flex items-center justify-center z-20">
        <Banner message={banner} />
      </div>
      <div className="w-full uppercase font-bold tracking-wider text-xl flex items-center justify-center mb-4">
        Add new resource
      </div>
      <div className="md:flex w-full px-3">
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label
            className={`block uppercase tracking-wide text-xs font-bold mb-2 ${
              required ? "text-red-600 animate-pulse" : ""
            }`}
          >
            Title
          </label>
          <input
            className={`${
              data.articleTitle === ""
                ? ""
                : data.articleTitle.length <= 1
                ? "border-l-4 border-fred"
                : "border-l-4 border-flime"
            } appearance-none outline-none outline-none block w-full border py-3 px-4 mb-3 ${
              required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
            }`}
            type="text"
            onChange={(e) =>
              setData((prev) => ({ ...prev, articleTitle: e.target.value }))
            }
            value={data.articleTitle}
            autoComplete="off"
          />
        </div>
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Category
          </label>
          <div className="w-full">
            <ListOption
              options={categories.sort((a, b) => {
                if (a.name < b.name) {
                  return -1
                }
                if (a.name > b.name) {
                  return 1
                }
                return 0
              })}
              choice={data.categoryKey}
              setChoice={setCategory}
            />
          </div>
        </div>
      </div>
      <div className="md:flex w-full px-3">
        <div className="w-full mb-2 px-2">
          <label
            className={`block uppercase tracking-wide text-xs font-bold mb-2 ${
              required ? "text-red-600 animate-pulse" : ""
            }`}
          >
            Short Description
          </label>
          <input
            className={`${
              data.articleDescription === ""
                ? ""
                : data.articleDescription.length <= 1
                ? "border-l-4 border-fred"
                : "border-l-4 border-flime"
            } appearance-none outline-none outline-none block w-full border py-3 px-4 mb-3 ${
              required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
            }`}
            type="text"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                articleDescription: e.target.value,
              }))
            }
            value={data.articleDescription}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="md:flex w-full px-3">
        <div className="w-full md:w-1/2 mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Type
          </label>
          <div className="w-full">
            <ListOption
              options={types}
              choice={data.articleType}
              setChoice={setType}
            />
          </div>
        </div>
        {data.articleType.match(regex) && (
          <div className="w-full md:w-1/2 mb-2 px-2">
            <label
              className={`block uppercase tracking-wide text-xs font-bold mb-2 ${
                required ? "text-red-600 animate-pulse" : ""
              }`}
            >
              Link
            </label>
            <div className="w-full">
              <input
                className={`${
                  data.link === ""
                    ? ""
                    : !isLink(data.link)
                    ? "border-l-4 border-fred"
                    : "border-l-4 border-flime"
                } appearance-none outline-none block w-full border border-grey-lighter py-3 px-4 mb-3  ${
                  required ? "bg-red-200 animate-pulse" : "bg-grey-lighter "
                }`}
                type="text"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    link: e.target.value,
                    articleContent: e.target.value,
                  }))
                }}
                value={data.link}
              />
            </div>
          </div>
        )}
      </div>

      {data.articleType === "article" && (
        <div className="md:flex w-full px-3">
          <div className="w-full mb-2 px-2">
            <label
              className={`block uppercase tracking-wide text-xs font-bold mb-2 ${
                required ? "text-red-600 animate-pulse" : ""
              }`}
            >
              Content
            </label>
            <QuillEditor
              placeholder={"Start writing Something"}
              onEditorChange={onEditorChange}
              articleContent={data.articleContent}
            />
          </div>
        </div>
      )}
      {data.articleType === "picture" && (
        <div className="md:flex w-full px-3">
          <div className="w-full mb-2 px-2">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
              Photo
            </label>
            <Dropzone
              classes={
                "appearance-none outline-none outline-none block w-full border-2 border-gray-300 border-black border-dotted  py-3 px-4 mb-3"
              }
              data={data}
              setData={setData}
              type="eventCover"
              setUploadStatus={setUploadStatus}
              uploadStatus={uploadStatus}
            />
          </div>
        </div>
      )}
      <div className="md:flex w-full px-3">
        <div className="w-full mb-2 px-2">
          <label className="block uppercase tracking-wide text-xs font-bold mb-2">
            Tags
          </label>
          <div className="">
            <Tags tags={data.tags} pushTag={pushTag} popTag={popTag} />
          </div>
        </div>
      </div>
      {data.articleType === "article" && (
        <div className="md:flex w-full px-3">
          <div className="w-full mb-2 px-2">
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">
              Sources
            </label>
            <div className="">
              <Sources
                sources={data.sources}
                pushSource={pushSource}
                popSource={popSource}
                isLink={isLink}
              />
            </div>
          </div>
        </div>
      )}

      <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
        <button
          className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fred-200 text-white mb-4"
          onClick={() => {
            history.goBack()
          }}
        >
          Cancel
        </button>
        <button
          className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
          onClick={save}
        >
          {saving ? (
            <div className="flex justify-center">
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddResource
