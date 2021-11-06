import { useState, useContext, useEffect, useMemo } from "react"
import { useLocation, useHistory, useRouteMatch, Link } from "react-router-dom"
import UserContext from "../../../contexts/User"
import axios from "axios"
import {
  HashtagIcon,
  UserIcon,
  CalendarIcon,
  ChevronRightIcon,
  PencilAltIcon,
  PencilIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline"

import Socialmedia from "./Socialmedia"
import Input from "./Input"
import CityandCountryInput from "./CityandCountryInput"
import Banner from "../../Admin/Widgets/Banner"
import DropzoneCloudinary from "../SignUp/DropzoneCloudinary"
import BusinessAreaSelect from "./BusinessAreaSelect"
import EventPreview from "./EventPreview"

const defaultProfile = {
  photo: null,
  firstName: null,
  lastName: null,
  title: null,
  companyName: null,
  companyBio: null,
  city: null,
  country: null,
  geoLocation: [],
  email: null,
  created: null,
  following: [],
  followers: [],
  bio: null,
  businessArea: null,
  socialmedia: {
    linkedin: null,
    instagram: null,
    twitter: null,
  },
}
const eventsUrl = "/api/events/future"

const Profile = () => {
  const [disableEdit, setDisableEdit] = useState(true)

  const { user } = useContext(UserContext)
  const history = useHistory()
  const { id } = useRouteMatch("/community/profile/:id").params
  const [banner, setBanner] = useState({ show: false })
  const [events, setEvents] = useState({ mine: [], interested: [], going: [] })
  const [uploadStatus, setUploadStatus] = useState({
    success: false,
    message: "",
  })
  const isMyProfile = user.id === id
  const [profile, setProfile] = useState({
    ...defaultProfile,
  })

  const triggerBanner = ({ message, success }) => {
    setBanner({
      success: success,
      show: true,
      message: message || "Sorry something went wrong",
    })
    setTimeout(() => {
      setBanner((prev) => ({ ...prev, show: false }))
    }, 4000)
  }

  useEffect(() => {
    if (uploadStatus.message.length) {
      triggerBanner(uploadStatus)
    }
  }, [uploadStatus])

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    }
  }, [])

  //   history.goBack()

  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        const { data } = await axios.get(
          `/api/users/community/profile/${id}`,
          config
        )
        console.log(id, data.data)
        setProfile({
          ...data.data,
        })
      } catch (error) {
        console.log(error)
      }
    }
    getProfileInfo()
  }, [id])

  useEffect(() => {
    axios
      .get(eventsUrl, config)
      .then((res) => {
        if (res.data.data) {
          let mine = res.data.data.filter((item) => item.member._id === user.id)
          let going = res.data.data.filter(
            (item) => item.going.filter((going) => going._id === user.id).length
          )
          let interested = res.data.data.filter(
            (item) =>
              item.interested.filter((interested) => interested._id === user.id)
                .length
          )
          console.log(mine, going, interested)
          setEvents((prev) => ({ ...prev, mine, going, interested }))
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  const formatValue = (value) => {
    const newValue = value.trimStart()
    return newValue.replace(value[0], value[0]?.toUpperCase())
  }

  const submitChanges = async () => {
    try {
      const result = await axios.put(
        `/api/users/community/profile/update`,
        profile,
        config
      )
      if (result) {
        console.log(result)
        triggerBanner(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="w-full flex items-center justify-center z-20">
        <Banner message={banner} />
      </div>
      <div className="sm:flex w-full md:w-10/12 justify-center m-auto overflow-hidden mb-20">
        <div className="w-full sm:w-1/2 md:w-4/12 xl:w-3/12 shadow bg-white p-3 border-t-8 border-fpink ">
          <button
            type="button"
            onClick={() => {
              history.goBack()
            }}
            className={
              !isMyProfile
                ? "group mb-5 lg:w-1/4 px-4 py-2 text-mono bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-lg text-black hover:text-white flex justify-center items-center  "
                : "hidden"
            }
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            <span className="hidden xl:block text-sm">Back</span>
          </button>
          <div className="image overflow-hidden">
            <img
              className="h-auto w-full mx-auto"
              src={profile.photo ? profile.photo.url : "null"}
              alt="profile"
            />
            {!disableEdit && (
              <div className="w-full flex justify-center">
                <DropzoneCloudinary
                  data={profile}
                  setData={setProfile}
                  type="profilePicture"
                  setUploadStatus={setUploadStatus}
                  noPreview
                />
              </div>
            )}
          </div>
          <h1 className="text-gray-900 uppercase font-bold text-xl my-2">
            {profile.firstName} {profile.lastName}
          </h1>
          <h3 className="text-gray-600 text-ls font-semibold mb-1">
            {profile.title}
          </h3>
          <h4 className="text-gray-600 text-base">{profile.companyName}</h4>
          <h4 className="mb-1">
            {profile.companyLink ? (
              <a
                target="_blank"
                href={profile.companyLink}
                className="text-xs text-gray-600 hover:text-sky-600"
                rel="noreferrer"
              >
                {profile.companyLink}
              </a>
            ) : (
              ""
            )}
          </h4>
          <div className=" text-gray-700 py-1 px-3 mt-3 divide-y ">
            <div className="flex flex-row items-start justify-center py-3">
              <p className="w-1/2 uppercase text-sm text-grotesk">
                Member since
              </p>
              <p className="w-1/2 h-full text-sm text-grotesk text-right">
                {" "}
                {new Date(profile.created).toLocaleDateString("de-DE")}
              </p>
            </div>
            <Socialmedia
              isMyProfile={isMyProfile}
              profile={profile}
              setProfile={setProfile}
              disableEdit={disableEdit}
            />
          </div>
        </div>
        <div
          className="w-full sm:w-1/2 md:w-9/12  shadow bg-white p-3 border-t-8 border-fpink 
            "
        >
          <div className="bg-white p-3 text-base text-gray-700 ">
            <div className="flex items-center justify-between space-x-2 font-semibold uppercase text-sm my-2 ">
              <span className=" text-grotesk flex">
                <UserIcon className={`h-5 w-5 mr-2 text-fpink`} />
                Details
              </span>
              {isMyProfile && (
                <button
                  type="button"
                  className={
                    "flex items-center cursor-pointer w-auto uppercase text-grotesk font-semibold shadow-md p-2 px-4 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                  }
                  onClick={() => {
                    setDisableEdit((prev) => !prev)
                    if (!disableEdit) {
                      submitChanges()
                    }
                  }}
                >
                  {disableEdit ? (
                    <>
                      Edit
                      <PencilAltIcon className="ml-1 w-6 h-6" />
                    </>
                  ) : (
                    <>
                      Confirm
                      <CheckCircleIcon className=" ml-1 w-6 h-6" />
                    </>
                  )}
                </button>
              )}
            </div>
            <div
              className={`grid ${
                isMyProfile ? "md:grid-cols-3" : "md:grid-cols-2"
              } `}
            >
              <div className="grid grid-cols-2 md:grid-cols-1">
                <label className="p-2 uppercase text-xs font-bold text-gray-400 flex items-center">
                  First Name
                </label>
                <input
                  disabled
                  className="p-2 text-base bg-white "
                  value={profile.firstName}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 md:px-1">
                <label className="p-2 uppercase text-xs font-bold text-gray-400 flex items-center">
                  Last Name
                </label>
                <input
                  disabled
                  className="p-2 text-base bg-white "
                  value={profile.lastName}
                />
              </div>

              {isMyProfile && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-1  ">
                    <label className="p-2 uppercase text-xs font-bold text-gray-400 flex items-center">
                      Email
                    </label>
                    <div
                      className={`p-2 text-base ${
                        !disableEdit && "cursor-not-allowed"
                      }`}
                    >
                      {profile.email}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 ">
                    <Input
                      label="Position"
                      value={"title"}
                      disableEdit={disableEdit}
                      profile={profile}
                      setProfile={setProfile}
                      format
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 md:px-1 ">
                    <Input
                      label="company"
                      value={"companyName"}
                      disableEdit={disableEdit}
                      profile={profile}
                      setProfile={setProfile}
                      format
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1 ">
                    {disableEdit ? (
                      <>
                        <label className="p-2  uppercase text-xs font-bold text-gray-400 flex items-center">
                          Company Website
                        </label>

                        <a
                          target="_blank"
                          href={profile.companyLink}
                          className="text-base text-gray-600 hover:text-sky-600 p-2"
                          rel="noreferrer"
                        >
                          {profile.companyLink}
                        </a>
                      </>
                    ) : (
                      <Input
                        label="company Website"
                        value={"companyLink"}
                        isLink
                        disableEdit={disableEdit}
                        profile={profile}
                        setProfile={setProfile}
                      />
                    )}
                  </div>
                </>
              )}
              <CityandCountryInput
                disableEdit={disableEdit}
                profile={profile}
                setProfile={setProfile}
              />
              <div className="grid grid-cols-2 md:grid-cols-1 ">
                <label className="p-2 uppercase text-xs font-bold text-gray-400 flex items-center">
                  Business Area
                  {!disableEdit && (
                    <PencilIcon className="w-4 h-4 ml-2 text-black " />
                  )}
                </label>
                {!disableEdit ? (
                  <BusinessAreaSelect
                    profile={profile}
                    setProfile={setProfile}
                  />
                ) : (
                  <div className="p-2 text-base">{profile.businessArea}</div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-3 text-base text-gray-700">
            <div className="flex items-center space-x-2 font-semibold uppercase text-sm my-2">
              <HashtagIcon className={`h-5 w-5 text-fpink`} />
              <span className="tracking-wider text-grotesk">About</span>
            </div>
            <div className="grid md:grid-cols-1 gap-2">
              <div className="grid grid-cols-1">
                <label className="p-2 uppercase text-xs font-bold text-gray-400 flex items-center">
                  Bio
                  {!disableEdit && (
                    <PencilIcon className="w-4 h-4 ml-2 text-black " />
                  )}
                </label>
                <textarea
                  disabled={disableEdit}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bio: formatValue(e.target.value),
                    })
                  }
                  className={`p-2 text-base resize-none ${
                    disableEdit ? "bg-white " : "bg-sky-50"
                  }`}
                ></textarea>
              </div>
              <div className="grid grid-cols-1">
                <label className="p-2 uppercase text-xs font-bold text-gray-400 flex">
                  Company Bio
                  {!disableEdit && (
                    <PencilIcon className="w-4 h-4 ml-2 text-black " />
                  )}
                </label>
                <textarea
                  disabled={disableEdit}
                  value={profile.companyBio}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      companyBio: formatValue(e.target.value),
                    })
                  }
                  className={`p-2 text-base resize-none ${
                    disableEdit ? "bg-white " : "bg-sky-50"
                  }`}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bg-white p-3 text-base text-gray-700">
            <div className="flex items-center space-x-2 font-semibold uppercase text-sm my-2">
              <CalendarIcon className={`h-5 w-5 text-fpink`} />
              <span className="tracking-wider text-grotesk">Future Events</span>
            </div>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="grid grid-cols-1">
                <div className="p-2 uppercase text-xs font-bold text-gray-400">
                  Host
                </div>
                <div className="w-full h-60 flex flex-col justify-start px-2 mt-1 overflow-y-auto overflow-x-hidden">
                  {events.mine.length ? (
                    events.mine.map((event) => (
                      <EventPreview key={event._id} event={event} />
                    ))
                  ) : (
                    <p className="text-xs text-mono">
                      Not hosting any future event
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1">
                <div className="p-2 uppercase text-xs font-bold text-gray-400">
                  Interested/Going
                </div>
                <div className="w-full h-60 flex flex-col justify-start px-2 mt-1 overflow-y-auto overflow-x-hidden">
                  {events.going.length || events.interested.length ? (
                    <>
                      {events.going.map((event) => (
                        <EventPreview key={event._id} event={event} />
                      ))}
                      {events.interested.map((event) => (
                        <EventPreview key={event._id} event={event} />
                      ))}
                    </>
                  ) : (
                    <p className="text-xs text-mono">
                      Not participating in any future event
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
