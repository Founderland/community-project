import { Menu, Transition } from "@headlessui/react"
import { Fragment, useContext, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import UserContext from "../../contexts/User"
import { Image, Transformation } from "cloudinary-react"
import axios from "axios"

const ProfileMenu = () => {
  const { user, logout } = useContext(UserContext)

  const avatarInitials = () => {
    let initials =
      user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()
    return initials
  }

  const [profilePic, setProfilePic] = useState({})

  useEffect(() => {
    const getProfilepic = async () => {
      try {
        const { data } = await axios.get(
          `/api/users/community/profile/${user.id}`,
          config
        )
        if (data.data?.photo) {
          setProfilePic({
            ...data.data.photo,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getProfilepic()
  }, [])

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="group flex items-center space-x-3 relative focus:outline-none">
        <h2 className="text-gray-800 text-bold text-sm lg:text-lg hidden sm:block">
          {user.firstName + " " + user.lastName}
        </h2>
        {profilePic?.public_id ? (
          <Image
            cloudName="founderland"
            publicId={profilePic?.public_id}
            width="50"
            height="50"
            className="hover:border-flime border-white border-2 rounded-full"
          >
            <Transformation
              width="200"
              height="200"
              gravity="face"
              crop="thumb"
            />
            <Transformation radius="100" />
          </Image>
        ) : (
          <>
            <h2 className="text-gray-800 text-bold text-sm lg:text-lg hidden sm:block">
              {user.firstName + " " + user.lastName}
            </h2>
            <span
              className={`flex items-center justify-center text-mono text-lg lg:text-2xl tracking-wide w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 group-hover:border-fblue ${user.avatar}`}
            >
              {avatarInitials()}
            </span>
          </>
        )}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 outline-none w-40 bg-white overflow-hidden shadow-xl right-0">
          <Link to={`/community/events/member`}>
            <Menu.Item
              as="button"
              className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            >
              My Events
            </Menu.Item>
          </Link>

          <Link to={`/community/profile/${user.id}`}>
            <Menu.Item
              as="button"
              className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-flime"
            >
              Profile
            </Menu.Item>
          </Link>
          <div className="flex items-center justify-between">
            <span className="border-b w-full"></span>
          </div>
          <Menu.Item
            as="button"
            className="w-full px-4 py-2 text-sm text-gray-800 hover:bg-fred hover:text-white"
            onClick={() => logout()}
          >
            Logout
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileMenu
