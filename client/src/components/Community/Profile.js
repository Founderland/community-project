import { useState, useContext } from "react"
import { useLocation, useHistory, useRouteMatch, Link } from "react-router-dom"
import UserContext from "../../contexts/User"

import {
  ShieldCheckIcon,
  HashtagIcon,
  UserIcon,
  CalendarIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline"

const styles = {
  founder: "fblue",
  investor: "fred",
  ally: "flime",
}

const Profile = () => {
  //   // grab the id from the link /community/profile?id=ejjj if none it will be null
  //   const [queryId, setQueryId] = useState(
  //     new URLSearchParams(useLocation().search).get("id")
  //   )
  const { user } = useContext(UserContext)
  const history = useHistory()
  //   history.goBack()

  const { id } = useRouteMatch("/community/profile/:id").params
  const isMyProfile = user.id === id
  console.log(isMyProfile)
  let profile
  if (isMyProfile) {
    profile = user
  }

  return (
    <div>
      {isMyProfile ? "myProfile" : id}
      <>
        {/* <div className="w-full flex items-center justify-center z-20">
            <Banner message={banner} />
          </div> */}
        <div className='sm:flex no-wrap md:-mx-2'>
          <div
            className={`w-full sm:w-1/2 md:w-3/12 md:mx-2 shadow bg-white p-3 border-t-8 ${
              profile.role === "founder"
                ? "border-fblue"
                : profile.role === "investor"
                ? "border-fred"
                : "border-flime"
            }`}>
            <div className='image overflow-hidden'>
              <img
                className='h-auto w-full mx-auto'
                src={profile.photo ? profile.photo.url : "null"}
                alt=''
              />
            </div>
            <h1 className='text-gray-900 uppercase font-bold text-xl my-2'>
              {profile.firstName} {profile.lastName}
            </h1>
            <h3 className='text-gray-600 text-ls font-semibold mb-1'>
              {profile.title}
            </h3>
            <h4 className='text-gray-600 text-base'>{profile.companyName}</h4>
            <h4 className='mb-1'>
              {profile.companyLink ? (
                <Link
                  to={profile.companyLink}
                  className='text-xs text-gray-600 hover:text-sky-600'>
                  {profile.companyLink}
                </Link>
              ) : (
                ""
              )}
            </h4>
            <div className='bg-gray-100 bg-opacity-60 text-gray-700 py-1 px-3 mt-3 divide-y '>
              <div className='flex items-center py-3'>
                <p className='uppercase text-sm text-grotesk'>Status</p>
                {profile.locked ? (
                  <div className='ml-auto bg-red-500 py-1 px-2 text-white text-sm shadow'>
                    Locked
                  </div>
                ) : profile.confirmed ? (
                  <div className='ml-auto bg-green-500 py-1 px-2 text-white text-sm shadow'>
                    Active
                  </div>
                ) : profile.notified ? (
                  <div className='ml-auto bg-yellow-500 py-1 px-2 text-white text-sm shadow'>
                    Unconfirmed
                  </div>
                ) : (
                  <div className='ml-auto bg-yellow-500 py-1 px-2 text-white text-sm shadow'>
                    Not Notified
                  </div>
                )}
              </div>
              <div className='flex flex-col items-start justify-center py-3'>
                <p className='uppercase mb-2 text-sm text-grotesk'>
                  Member since
                </p>
                <div className='w-full grid grid-cols-2 gap-x-2'>
                  <div className='ml-auto w-full text-center'>
                    <p className='text-xs text-grotesk'>Approved on</p>
                    <p className='font-bold'>
                      {/* {moment(profile.created).format("DD/M/YYYY")} */}
                    </p>
                  </div>
                  {profile.confirmed && (
                    <div className='ml-auto w-full text-center'>
                      <p className='text-xs text-grotesk'>Confirmed on</p>
                      <p className='font-bold'>
                        {/* {moment(profile.confirmed).format("DD/M/YYYY")} */}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className='flex items-center py-3'>
                <p className='uppercase text-sm text-grotesk'>Application</p>
                <div className='ml-auto'>
                  {profile.applicationId ? (
                    <Link
                      to={`/admin/applicants/id/${profile.applicationId}`}
                      className='flex items-center justify-center hover:text-sky-600'>
                      Go to Application <ChevronRightIcon className='h-4' />
                    </Link>
                  ) : (
                    "No related application"
                  )}
                </div>
              </div>
              {profile.notified && (
                <div className='flex items-center py-3'>
                  <p className='uppercase text-sm text-grotesk'>
                    Notified to Join
                  </p>
                  <p className='ml-auto font-bold'>
                    {/* {moment(profile.notified).format("DD/M/YYYY")} */}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className='my-4'></div>
          <div
            className={`w-full sm:w-1/2 md:w-9/12 md:mx-2 shadow bg-white p-3 border-t-8 border-${
              styles[profile.role]
            }`}>
            <div className='bg-white p-3 text-base text-gray-700'>
              <div className='flex items-center space-x-2 font-semibold uppercase text-sm my-2'>
                <UserIcon className={`h-5 w-5 text-${styles[profile.role]}`} />
                <span className='tracking-wider text-grotesk'>Details</span>
              </div>
              <div className='grid md:grid-cols-2'>
                <div className='grid grid-cols-2'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    First Name
                  </div>
                  <div className='p-2 text-base'>{profile.firstName}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Last Name
                  </div>
                  <div className='p-2 text-base'>{profile.lastName}</div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Email
                  </div>
                  <div className='p-2 text-base'>
                    <a
                      href={`mailto:${profile.email}`}
                      className='hover:text-sky-600'>
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className='grid grid-cols-2'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Location
                  </div>
                  <div className='p-2 text-base'>
                    {profile.city}, {profile.country}
                  </div>
                </div>
                <div className='grid grid-cols-2'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Business Area
                  </div>
                  <div className='p-2 text-base'>{profile.businessArea}</div>
                </div>
              </div>
            </div>
            <div className='bg-white p-3 text-base text-gray-700'>
              <div className='flex items-center space-x-2 font-semibold uppercase text-sm my-2'>
                <HashtagIcon
                  className={`h-5 w-5 text-${styles[profile.role]}`}
                />
                <span className='tracking-wider text-grotesk'>About</span>
              </div>
              <div className='grid md:grid-cols-1 gap-2'>
                <div className='grid grid-cols-1'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Bio
                  </div>
                  <div className='p-2 text-base'>{profile.about}</div>
                </div>
                <div className='grid grid-cols-1'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Company Bio
                  </div>
                  <div className='p-2 text-base'>{profile.companyBio}</div>
                </div>
              </div>
            </div>
            <div className='bg-white p-3 text-base text-gray-700'>
              <div className='flex items-center space-x-2 font-semibold uppercase text-sm my-2'>
                <CalendarIcon
                  className={`h-5 w-5 text-${styles[profile.role]}`}
                />
                <span className='tracking-wider text-grotesk'>Events</span>
              </div>
              <div className='grid md:grid-cols-1 gap-2'>
                <div className='grid grid-cols-1'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    hosted
                  </div>
                  <div className='p-2'>No events</div>
                </div>
                <div className='grid grid-cols-1'>
                  <div className='p-2 uppercase text-xs font-bold text-gray-400'>
                    Attended
                  </div>
                  <div className='p-2'>No events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Profile
