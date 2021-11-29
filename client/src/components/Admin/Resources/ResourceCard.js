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
    <div className="group py-4 px-2">
      <div
        onClick={() => history.push(`/admin/resources/id/${resource._id}`)}
        className="relative cursor-pointer w-72 md:w-80 overflow-hidden shadow-lg hover:shadow-2xl text-center "
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
          <div className="flex items-center justify-center overflow-none font-bold text-black text-base md:text-xl mb-2 h-16 md:h-20 font-mono overflow-ellipsis">
            {resource.articleTitle}
          </div>
          <p className="h-10 px-2 mb-2 text-black text-xs md:text-sm text-mono overflow-ellipsis text-justify truncate">
            {resource.articleDescription}
          </p>
        </div>
        <span className="absolute top-2 left-2  inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
          {types[resource.articleType]}
        </span>
        <ChevronDoubleRightIcon className="absolute bottom-2 right-2 h-6 w-6 text-black group-hover:text-fblue" />
      </div>
    </div>
  )
}

export default ResourceCard
