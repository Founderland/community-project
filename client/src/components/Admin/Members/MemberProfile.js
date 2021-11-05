import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { useEffect, useState, useContext, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import Loading from "../Widgets/Loading"
import moment from "moment"
import {
  ShieldCheckIcon,
  HashtagIcon,
  UserIcon,
  CalendarIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline"

const memberUrl = "/api/users/community/profile/"
const notifyUrl = "/api/users/community/notify/"
const lockUrl = "/api/users/community/lock"

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
  founder: "fblue",
  investor: "fred",
  ally: "flime",
}

const MemberProfile = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [notifying, setNotifying] = useState(false)
  const [notified, setNotified] = useState(false)
  const [locking, setLocking] = useState(false)
  const [profile, setProfile] = useState(defaultProfile)
  const [banner, setBanner] = useState({ show: false })
  const { id } = useParams()
  const { token, reload, setReload } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
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
        }, 3000)
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
        }, 3000)
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
      }, 3000)
    }
  }

  const notify = async () => {
    setNotifying(true)
    try {
      const notified = await axios.post(notifyUrl + id, { _id: id }, config)
      console.log(notified)
      if (notified) {
        setNotified(true)
        setReload(reload + 1)
        setNotifying(false)
      }
    } catch (e) {
      console.log(e)
      setNotifying(false)
      setBanner({
        error: 1,
        show: true,
        message: "Error notifying the user!",
      })
      setTimeout(() => {
        setBanner((prev) => ({ ...prev, show: false }))
      }, 3000)
    }
  }

  return (
    <section className="h-full py-1 bg-white w-full lg:w-5/6 px-4 mx-auto mt-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full flex items-center justify-center z-20">
            <Banner message={banner} />
          </div>
          <div className="sm:flex no-wrap md:-mx-2">
            <div
              className={`w-full sm:w-1/2 md:w-3/12 md:mx-2 shadow bg-white p-3 border-t-8 ${
                profile.role === "founder"
                  ? "border-fblue"
                  : profile.role === "investor"
                  ? "border-fred"
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
              <h3 className="text-gray-600 text-ls font-semibold mb-1">
                {profile.title}
              </h3>
              <h4 className="text-gray-600 text-base">{profile.companyName}</h4>
              <h4 className="mb-1">
                {profile.companyLink ? (
                  <Link
                    to={profile.companyLink}
                    className="text-xs text-gray-600 hover:text-sky-600"
                  >
                    {profile.companyLink}
                  </Link>
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
                      <p className="font-bold">
                        {moment(profile.created).format("DD/M/YYYY")}
                      </p>
                    </div>
                    {profile.confirmed && (
                      <div className="ml-auto w-full text-center">
                        <p className="text-xs text-grotesk">Confirmed on</p>
                        <p className="font-bold">
                          {moment(profile.confirmed).format("DD/M/YYYY")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center py-3">
                  <p className="uppercase text-sm text-grotesk">Application</p>
                  <div className="ml-auto">
                    {profile.applicationId ? (
                      <Link
                        to={`/admin/applicants/id/${profile.applicationId}`}
                        className="flex items-center justify-center hover:text-sky-600"
                      >
                        Go to Application <ChevronRightIcon className="h-4" />
                      </Link>
                    ) : (
                      "No related application"
                    )}
                  </div>
                </div>
                {profile.notified && (
                  <div className="flex items-center py-3">
                    <p className="uppercase text-sm text-grotesk">
                      Notified to Join
                    </p>
                    <p className="ml-auto font-bold">
                      {moment(profile.notified).format("DD/M/YYYY")}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="my-4"></div>
            <div
              className={`w-full sm:w-1/2 md:w-9/12 md:mx-2 shadow bg-white p-3 border-t-8 border-${
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
                    <div className="p-2 text-base">{profile.firstName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Last Name
                    </div>
                    <div className="p-2 text-base">{profile.lastName}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Email
                    </div>
                    <div className="p-2 text-base">
                      <a
                        href={`mailto:${profile.email}`}
                        className="hover:text-sky-600"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Location
                    </div>
                    <div className="p-2 text-base">
                      {profile.city}, {profile.country}
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Business Area
                    </div>
                    <div className="p-2 text-base">{profile.businessArea}</div>
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
                    <div className="p-2 text-base">{profile.about}</div>
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
                <div className="grid md:grid-cols-1 gap-2">
                  <div className="grid grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      hosted
                    </div>
                    <div className="p-2">No events</div>
                  </div>
                  <div className="grid grid-cols-1">
                    <div className="p-2 uppercase text-xs font-bold text-gray-400">
                      Attended
                    </div>
                    <div className="p-2">No events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-mx-3 mt-8 px-4 py-4 flex flex-col-reverse sm:flex-row items-center justify-around ">
            {!profile.confirmed ? (
              <button
                className="flex items-center justify-center space-x-4 px-8 py-2 w-full shadow-lg sm:w-1/4 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-4"
                onClick={() => notify()}
                disabled={notified}
              >
                {notifying ? (
                  <div className="flex justify-center">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"
                    ></div>
                  </div>
                ) : notified ? (
                  <>
                    <ShieldCheckIcon className="w-6 h-6" />
                    <p>User notified</p>
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="w-6 h-6" />
                    <p>Notify Member</p>
                  </>
                )}
              </button>
            ) : (
              ""
            )}
            <button
              className="bg-gray-700 transition duration-200 hover:bg-fred text-white px-8 py-2 w-full shadow-lg sm:w-1/4  mb-4"
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
          </div>
        </>
      )}
    </section>
  )
}

export default MemberProfile
