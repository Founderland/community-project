import sidebarImg from "../../../assets/images/imageSidebar.svg"
import {
  ChevronDoubleRightIcon,
  LinkIcon,
  PhotographIcon,
  VideoCameraIcon,
  CollectionIcon,
} from "@heroicons/react/outline"
import { useHistory } from "react-router-dom"

const types = {
  article: <CollectionIcon className="w-4 h-4 text-black" />,
  link: <LinkIcon className="w-4 h-4 text-black" />,
  video: <VideoCameraIcon className="w-4 h-4 text-black" />,
  picture: <PhotographIcon className="w-4 h-4 text-black" />,
}

const ResourceCard = ({ resource }) => {
  const history = useHistory()
  return (
    <div className="group py-5 px-3">
      <div
        onClick={() => history.push(`/admin/resources/id/${resource._id}`)}
        className="cursor-pointer max-w-sm overflow-hidden shadow-lg hover:shadow-xl w-80 text-center "
      >
        <div className="flex ">
          <div
            className="w-4/5 bg-cover"
            style={{
              backgroundImage: `url(${resource.articleCover?.url})`,
            }}
          />
          <div className="w-1/5 ">
            <img
              className="w-full h-full object-fill "
              src={sidebarImg}
              alt="Icons"
            />
          </div>
        </div>
        <div className="px-2 py-2">
          <div className="font-bold text-black text-xl mb-2  font-mono">
            {resource.articleTitle}
          </div>
          <p className="h-10 px-2 text-black text-sm text-mono overflow-ellipsis text-justify truncate">
            {resource.articleDescription}
          </p>
        </div>
        <div className=" pl-6 pr-2 pt-4 pb-2 flex justify-between">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">
            {types[resource.articleType]}
          </span>
          <ChevronDoubleRightIcon className="h-6 w-6 text-black group-hover:text-fblue" />
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
