import { useParams } from "react-router"
import { useEffect, useState, useContext, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Banner from "../Widgets/Banner"
import Loading from "../Widgets/Loading"
import moment from "moment"
import { HashtagIcon, UserIcon } from "@heroicons/react/outline"

const memberUrl = "/api/users/community/profile/"
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

const MemberProfile = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(defaultProfile)
  const [banner, setBanner] = useState({})
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
    if (id !== "new") {
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
    }
    return () => {
      setProfile(defaultProfile)
    }
  }, [])
  console.log(profile)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="px-8 py-5">
          <div className="w-full flex items-center justify-center z-20">
            <Banner message={banner} />
          </div>
          <div className="sm:flex no-wrap md:-mx-2">
            <div className="w-full sm:w-1/2 md:w-3/12 md:mx-2 shadow">
              <div
                className={`bg-white p-3 border-t-8 ${
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
                <h1 className="text-gray-900 font-bold text-xl my-2">
                  {profile.firstName} {profile.lastName}
                </h1>
                <h3 className="text-gray-600 font-lg text-semibold leading-6">
                  {profile.title}
                </h3>
                <h4 className="text-gray-600 text-sm text-semibold leading-6">
                  {profile.companyName}
                </h4>
                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      {profile.confirmed ? (
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      ) : profile.locked ? (
                        <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                          Locked
                        </span>
                      ) : profile.notified ? (
                        <span className="bg-yellow-500 py-1 px-2 rounded text-white text-sm">
                          Unconfirmed
                        </span>
                      ) : (
                        <span className="bg-yellow-500 py-1 px-2 rounded text-white text-sm">
                          Not Notified
                        </span>
                      )}
                    </span>
                  </li>
                  <li className="flex flex-col items-start justify-center py-3">
                    <p>Member since</p>
                    <div className="ml-auto w-full text-center">
                      <p className="text-xs">Created on</p>
                      <p className="font-bold">
                        {moment(profile.created).format("DD/M/YYYY")}
                      </p>
                    </div>
                    {profile.confirmed && (
                      <span className="ml-auto w-full text-center">
                        <p className="text-xs">Signed up on</p>
                        <p className="font-bold">
                          {moment(profile.confirmed).format("DD/M/YYYY")}
                        </p>
                      </span>
                    )}
                  </li>
                  <li className="flex flex-col items-start justify-center py-3">
                    <span>Application</span>
                    <span className="ml-auto">
                      LinkTo:profile.applicationId
                    </span>
                  </li>
                  {profile.notified && (
                    <li className="flex flex-col items-center justify-center py-3">
                      <span className="bg-blue-500 py-1 px-2 rounded text-white text-sm">
                        Notified
                      </span>
                      <p className="text-xs">
                        {moment(profile.notified).format("DD/M/YYYY")}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
              <div className="my-4"></div>
            </div>
            <div className="w-full sm:w-1/2 md:w-9/12 mx-2 h-64 shadow-xl">
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <UserIcon className="w-5 h-5" />
                  </span>
                  <span className="tracking-wide">Contact Details</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">{profile.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{profile.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">{profile.email}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact </div>
                      <div className="px-4 py-2">{profile.contact}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Location</div>
                      <div className="px-4 py-2">
                        {profile.city},{profile.country}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Business Area
                      </div>
                      <div className="px-4 py-2">{profile.businessArea}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <HashtagIcon className="h-5 w-5" />
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-1 text-sm">
                    <div className="grid grid-cols-1">
                      <div className="px-4 py-2 font-semibold">Bio</div>
                      <div className="px-4 py-2">{profile.about}</div>
                    </div>
                    <div className="grid grid-cols-1">
                      <div className="px-4 py-2 font-semibold">Company Bio</div>
                      <div className="px-4 py-2">{profile.companyBio}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MemberProfile
