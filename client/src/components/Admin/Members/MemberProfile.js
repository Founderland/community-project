import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import Loading from "../Widgets/Loading"
import EventPreview from "../../Community/Profile/EventPreview"
import ComponentModal from "../Widgets/ComponentModal"
import Notify from "./Notify"

import moment from "moment"
import {
  ShieldCheckIcon,
  HashtagIcon,
  UserIcon,
  CalendarIcon,
  ChevronRightIcon,
  MailIcon,
} from "@heroicons/react/outline"

const memberUrl = "/api/users/community/profile/"
const lockUrl = "/api/users/community/lock"
const eventsUrl = "/api/events/future"

const defaultProfile = {
  photo: null,
  locked: false,
  _id: null,
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
  confirmed: null,
  role: null,
  following: [],
  followers: [],
  applicationId: null,
  notified: null,
  about: null,
  businessArea: null,
  hashedPassword: null,
  lastUpdate: null,
}
const styles = {
  founder: "fred",
  investor: "fblue",
  ally: "flime",
}

const MemberProfile = () => {
  const [loading, setLoading] = useState(true)
  const [locking, setLocking] = useState(false)
  const [profile, setProfile] = useState(defaultProfile)
  const [events, setEvents] = useState({ own: [], interested: [], going: [] })

  const [banner, setBanner] = useState({ show: false })
  const { id } = useParams()
  const { config, user, reload, setCModal } = useContext(AdminContext)

  useEffect(() => {
    setLoading(true)
    axios
      .get(memberUrl + id, config)
      .then((res) => {
        setProfile((prev) => ({ ...prev, ...res.data.data }))
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setBanner({
          error: 1,
          show: true,
          message: "Error getting profile data!",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      })
    return () => {
      setProfile(defaultProfile)
    }
  }, [reload])

  useEffect(() => {
    axios
      .get(eventsUrl, config)
      .then((res) => {
        let searchId = id
        if (res.data.data) {
          let own = res.data.data.filter((item) => item.member._id === searchId)
          let going = res.data.data.filter(
            (item) =>
              item.going.filter((going) => going._id === searchId).length
          )
          let interested = res.data.data.filter(
            (item) =>
              item.interested.filter(
                (interested) => interested._id === searchId
              ).length
          )
          setEvents((prev) => ({ ...prev, own, going, interested }))
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }, [id])
  const lock = async () => {
    setLocking(true)
    try {
      const isLocked = await axios.put(
        lockUrl,
        { _id: id, locked: !profile.locked },
        config
      )
      if (isLocked) {
        setProfile((prev) => ({ ...prev, locked: !prev.locked }))
        setLocking(false)
        setBanner({
          success: 1,
          show: true,
          message: isLocked.data.data.locked
            ? "Account locked"
            : "Account unlocked",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 2000)
      } else {
        setLocking(false)
        setBanner({
          error: 1,
          show: true,
          message: profile.locked
            ? "Error unlocking member!"
            : "Error locking member!",
        })
        setTimeout(() => {
          setBanner((prev) => ({ ...prev, show: false }))
        }, 4000)
      }
    } catch (e) {
      setLocking(false)
      setBanner({
        error: 1,
        show: true,
        message: profile.locked
          ? "Error unlocking member!"
          : "Error locking member!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 4000)
    }
  }

  return (
    <section className="h-full w-full lg:w-5/6 xl:w-4/6 mx-auto">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex items-center justify-center z-20">
            <Banner message={banner} />
          </div>
          <ComponentModal>
            <Notify member={profile} />
          </ComponentModal>
          <div className="w-full flex-none sm:flex no-wrap md:-mx-2">
            <div
              className={`w-full sm:w-1/2 md:w-4/12 md:mx-2 shadow bg-white p-3 border-t-8 ${
                profile.role === "founder"
                  ? "border-fred"
                  : profile.role === "investor"
                  ? "border-fblue"
                  : "border-flime"
              }`}
            >
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src={profile.photo ? profile.photo.url : "null"}
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 uppercase font-bold text-xl my-2">
                {profile.firstName} {profile.lastName}
              </h1>
              <h3 className="text-gray-600 text-lg font-semibold mb-1">
                {profile.title}
              </h3>
              <h4 className="text-gray-600 text-base">{profile.companyName}</h4>
              <h4 className="mb-1">
                {profile.companyLink ? (
                  <a
                    href={profile.companyLink}
                    className="text-xs text-gray-600 hover:text-sky-600"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {profile.companyLink}
                  </a>
                ) : (
                  ""
                )}
              </h4>
              <div className="bg-gray-100 bg-opacity-60 text-gray-700 py-1 px-3 mt-3 divide-y ">
                <div className="flex items-center py-3">
                  <p className="uppercase text-sm text-grotesk">Status</p>
                  {profile.locked ? (
                    <div className="ml-auto bg-red-500 py-1 px-2 text-white text-sm shadow">
                      Locked
                    </div>
                  ) : profile.confirmed ? (
                    <div className="ml-auto bg-green-500 py-1 px-2 text-white text-sm shadow">
                      Active
                    </div>
                  ) : profile.notified ? (
                    <div className="ml-auto bg-yellow-500 py-1 px-2 text-white text-sm shadow">
                      Unconfirmed
                    </div>
                  ) : (
                    <div className="ml-auto bg-yellow-500 py-1 px-2 text-white text-sm shadow">
                      Not Notified
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start justify-center py-3">
                  <p className="uppercase mb-2 text-sm text-grotesk">
                    Member since
                  </p>
                  <div className="w-full grid grid-cols-2 gap-x-2">
                    <div className="ml-auto w-full text-center">
                      <p className="text-xs text-grotesk">Approved on</p>
                      <p className="font-bold text-xs md:text-sm">
                        {moment(profile.created).format("DD/M/YYYY")}
                      </p>
                    </div>
                    {profile.confirmed && (
                      <div className="ml-auto w-full text-center">
                        <p className="text-xs text-grotesk">Confirmed on</p>
                        <p className="font-bold text-xs md:text-sm">
                          {moment(profile.confirmed).format("DD/M/YYYY")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center py-3">
                  <p className="uppercase text-sm text-grotesk ">Application</p>
                  <div className="ml-auto">
                    {profile.applicationId ? (
                      <Link
                        to={`/admin/applicants/id/${profile.applicationId}`}
                        className="flex items-center justify-center font-bold hover:text-sky-600 text-sm"
                      >
                        Go to Application <ChevronRightIcon className="h-4" />
                      </Link>
                    ) : (
                      "No related application"
                    )}
                  </div>
                </div>
                {profile.notified && (
                  <div className="flex flex-col justify-center py-3">
                    <p className="uppercase text-sm text-grotesk">
                      Notified to Join
                    </p>
                    <p className="ml-auto font-bold text-sm">
                      {moment(profile.notified).format("DD/M/YYYY")}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="my-4"></div>
            <div
              className={`w-full sm:w-1/2 md:w-8/12 md:mx-1 shadow bg-white p-3 border-t-8 border-${
                styles[profile.role]
              }`}
            >
              <div className="bg-white p-3 text-base text-gray-700">
                <div className="flex items-center space-x-2 font-semibold uppercase text-sm my-2">
                  <UserIcon
                    className={`h-5 w-5 text-${styles[profile.role]}`}
                  />
                  <span className="tracking-wider text-grotesk">Details</span>
                </div>
                <div className="grid md:grid-cols-2">
                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      First Name
                    </div>
                    <div className="p-2 text-sm md:text-base">
                      {profile.firstName}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Last Name
                    </div>
                    <div className="p-2 text-sm md:text-base">
                      {profile.lastName}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Email
                    </div>
                    <div className="p-2  text-sm md:text-base break-all">
                      <a
                        href={`mailto:${profile.email}`}
                        className="hover:text-sky-600 "
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Location
                    </div>
                    <div className="p-2 text-sm md:text-base">
                      {profile.city}
                      {profile.country.length ? `, ${profile.country}` : ""}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Business Area
                    </div>
                    <div className="p-2 text-xs md:text-base">
                      {profile.businessArea}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 text-base text-gray-700">
                <div className="flex items-center space-x-2 font-semibold uppercase text-sm my-2">
                  <HashtagIcon
                    className={`h-5 w-5 text-${styles[profile.role]}`}
                  />
                  <span className="tracking-wider text-grotesk">About</span>
                </div>
                <div className="grid md:grid-cols-1 gap-2">
                  <div className="grid grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Bio
                    </div>
                    <div className="p-2 text-base">{profile.bio}</div>
                  </div>
                  <div className="grid grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Company Bio
                    </div>
                    <div className="p-2 text-base">{profile.companyBio}</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 text-base text-gray-700">
                <div className="flex items-center space-x-2 font-semibold uppercase text-sm my-2">
                  <CalendarIcon
                    className={`h-5 w-5 text-${styles[profile.role]}`}
                  />
                  <span className="tracking-wider text-grotesk">Events</span>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  <div className="grid grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Host
                    </div>
                    <div className="w-full max-h-80 flex flex-col justify-start px-2 mt-1 overflow-y-auto overflow-x-hidden">
                      {events.own.length ? (
                        events.own.map((event) => (
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
                    <div className="w-full max-h-80 flex flex-col justify-start px-2 mt-1 overflow-y-auto overflow-x-hidden">
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
          <div className="my-4 flex flex-col sm:flex-row items-center justify-around ">
            <button
              className="flex items-center justify-center space-x-4 px-8 py-2 w-5/6 shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
              onClick={() => setCModal(true)}
            >
              <MailIcon className="w-6 h-6" />
              <p>Notify by Email</p>
            </button>
            {user.role.search("admin") >= 0 && (
              <button
                className="bg-gray-700 transition duration-200 hover:bg-fred text-white px-8 py-2 w-5/6 shadow-lg sm:w-1/3  mb-4"
                onClick={() => lock()}
              >
                {locking ? (
                  <div className="flex justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                    ></div>
                  </div>
                ) : profile.locked ? (
                  "Unlock Access"
                ) : (
                  "Lock Access"
                )}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default MemberProfile
