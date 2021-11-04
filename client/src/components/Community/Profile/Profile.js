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
import ListOption from "../../Admin/Widgets/ListOption"
import Socialmedia from "./Socialmedia"
import Input from "./Input"
import CityandCountryInput from "./CityandCountryInput"
import Banner from "../../Admin/Widgets/Banner"
import DropzoneCloudinary from "../SignUp/DropzoneCloudinary"

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

let defaultBusinessAreas = [
  { name: "Select your business area", value: "Select your business area" },
  { name: "SaaS/Enterprise Software", value: "SaaS/Enterprise Software" },
  {
    name: "Mobility",
    value: "Mobility",
  },
  {
    name: "Sustainability/Impact investment",
    value: "Sustainability/Impact investment",
  },
  { name: "HealthTech", value: "HealthTech" },
  {
    name: "DTC",
    value: "DTC",
  },
  { name: "E-comm/Marketplaces", value: "E-comm/Marketplaces" },
  { name: "IoT", value: "IoT" },
  {
    name: "FoodTech",
    value: "FoodTech",
  },
  { name: "Gaming/Entertainment", value: "Gaming/Entertainment" },
  { name: "Engineering/DeepTech/AI", value: "Engineering/DeepTech/AI" },
  {
    name: "FinTech",
    value: "FinTech",
  },
  { name: "EdTech", value: "EdTech" },
  { name: "Other", value: "Other" },
]

const Profile = () => {
  const [disableEdit, setDisableEdit] = useState(true)
  const [businessAreas, setbusinessAreas] = useState([...defaultBusinessAreas])
  const { user } = useContext(UserContext)
  const history = useHistory()
  const { id } = useRouteMatch("/community/profile/:id").params
  const [banner, setBanner] = useState({})
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
      message: message,
    })
    setTimeout(() => {
      setBanner((prev) => ({ ...prev, show: false }))
    }, 3000)
  }

  useEffect(() => {
    if (uploadStatus.message.length) {
      triggerBanner(uploadStatus)
    }
  }, [uploadStatus])

  // check if the value entered by the user is included in the object list
  const isSelectionIncluded = (object) => {
    return Object.values(object).some(
      (item) => item.name === profile.businessArea
    )
  }
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

  const formatValue = (value) => {
    const newValue = value.trimStart()
    return newValue.replace(value[0], value[0]?.toUpperCase())
  }

  const submitChanges = () => {
    axios
      .put(`/api/users/community/profile/update`, profile, config)
      .then((res) => console.log(res))
  }

  return (
    <div>
      {/* {isMyProfile ? "myProfile" : id} */}
      <>
        <div className='w-full flex items-center justify-center z-20'>
          <Banner message={banner} />
        </div>

        <div className='sm:flex no-wrap overflow-hidden'>
          <div className='w-full sm:w-1/2 md:w-4/12 xl:w-3/12 shadow bg-white p-3 border-t-8 border-fpink '>
            <button
              type='button'
              onClick={() => {
                history.goBack()
              }}
              className={
                !isMyProfile
                  ? "group mb-5 lg:w-1/4 px-4 py-2 text-mono bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-lg text-black hover:text-white flex justify-center items-center  "
                  : "hidden"
              }>
              <ArrowLeftIcon className='w-5 h-5 mr-1' />
              <span className='hidden xl:block text-sm'>Back</span>
            </button>
            <div className='image overflow-hidden'>
              <img
                className='h-auto w-full mx-auto'
                src={profile.photo ? profile.photo.url : "null"}
                alt='profile'
              />
              {!disableEdit && (
                <div className='w-full flex justify-center'>
                  <DropzoneCloudinary
                    data={profile}
                    setData={setProfile}
                    type='profilePicture'
                    setUploadStatus={setUploadStatus}
                    noPreview
                  />
                </div>
              )}
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
                <a
                  target='_blank'
                  href={profile.companyLink}
                  className='text-xs text-gray-600 hover:text-sky-600'
                  rel='noreferrer'>
                  {profile.companyLink}
                </a>
              ) : (
                ""
              )}
            </h4>
            <div className=' text-gray-700 py-1 px-3 mt-3 divide-y '>
              <div className='flex flex-row items-start justify-center py-3'>
                <p className='w-1/2 uppercase text-sm text-grotesk'>
                  Member since
                </p>
                <p className='w-1/2 h-full text-sm text-grotesk text-right'>
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
            className='w-full sm:w-1/2 md:w-9/12  shadow bg-white p-3 border-t-8 border-fpink 
            '>
            <div className='bg-white p-3 text-base text-gray-700 '>
              <div className='flex items-center justify-between space-x-2 font-semibold uppercase text-sm my-2 '>
                <span className=' text-grotesk flex'>
                  <UserIcon className={`h-5 w-5 mr-2 text-fpink`} />
                  Details
                </span>
                {isMyProfile && (
                  <span
                    className='flex items-center cursor-pointer'
                    onClick={() => setDisableEdit((prev) => !prev)}>
                    {disableEdit ? (
                      <>
                        Edit
                        <PencilAltIcon className='ml-1 w-6 h-6' />{" "}
                      </>
                    ) : (
                      <span
                        onClick={submitChanges}
                        className='flex items-center'>
                        Confirm
                        <CheckCircleIcon className=' ml-1 w-6 h-6' />
                      </span>
                    )}
                  </span>
                )}
              </div>
              <div
                className={`grid ${
                  isMyProfile ? "md:grid-cols-3" : "md:grid-cols-2"
                } `}>
                <div className='grid grid-cols-2 md:grid-cols-1'>
                  <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center'>
                    First Name
                  </label>
                  <input
                    disabled
                    className='p-2 text-base bg-white '
                    value={profile.firstName}
                  />
                </div>
                <div className='grid grid-cols-2 md:grid-cols-1 md:px-1'>
                  <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center'>
                    Last Name
                  </label>
                  <input
                    disabled
                    className='p-2 text-base bg-white '
                    value={profile.lastName}
                  />
                </div>

                {isMyProfile && (
                  <>
                    <div className='grid grid-cols-2 md:grid-cols-1  '>
                      <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center'>
                        Email
                      </label>
                      <div
                        className={`p-2 text-base ${
                          !disableEdit && "cursor-not-allowed"
                        }`}>
                        {profile.email}
                      </div>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-1 '>
                      <Input
                        label='Position'
                        value={"title"}
                        disableEdit={disableEdit}
                        profile={profile}
                        setProfile={setProfile}
                        format
                      />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-1 md:px-1 '>
                      <Input
                        label='company'
                        value={"companyName"}
                        disableEdit={disableEdit}
                        profile={profile}
                        setProfile={setProfile}
                        format
                      />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-1 '>
                      {disableEdit ? (
                        <>
                          <label className='p-2  uppercase text-xs font-bold text-gray-400 flex items-center'>
                            Company Website
                          </label>

                          <a
                            target='_blank'
                            href={profile.companyLink}
                            className='text-base text-gray-600 hover:text-sky-600 p-2'
                            rel='noreferrer'>
                            {profile.companyLink}
                          </a>
                        </>
                      ) : (
                        <Input
                          label='company Website'
                          value={"companyLink"}
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
                <div className='grid grid-cols-2 md:grid-cols-1 '>
                  <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center'>
                    Business Area
                    {!disableEdit && (
                      <PencilIcon className='w-4 h-4 ml-2 text-black ' />
                    )}
                  </label>
                  {!disableEdit ? (
                    <div>
                      <ListOption
                        options={businessAreas}
                        required={true}
                        color={" bg-sky-50 "}
                        choice={
                          isSelectionIncluded(businessAreas)
                            ? profile.businessArea ||
                              "Select your business area"
                            : "Other"
                        }
                        setChoice={(value) => {
                          setProfile({
                            ...profile,
                            businessArea: value,
                          })
                        }}
                      />
                      <div
                        className={
                          profile.businessArea === "Other" ||
                          !isSelectionIncluded(businessAreas)
                            ? "w-full py-2 relative"
                            : "hidden"
                        }>
                        <input
                          type='text'
                          // placeholder='Enter your business area'
                          defaultValue={
                            isSelectionIncluded(businessAreas)
                              ? null
                              : profile.businessArea
                          }
                          className={
                            profile.businessArea === "Other" ||
                            !isSelectionIncluded(businessAreas)
                              ? "w-full text-sm appearance-none bg-grey-50 text-grey-500 border p-2 outline-none absolute top-1"
                              : "hidden"
                          }
                          onChange={(e) =>
                            setTimeout(() => {
                              setbusinessAreas([
                                ...businessAreas,
                                {
                                  name: formatValue(e.target.value),
                                  value: formatValue(e.target.value),
                                },
                              ])
                              setProfile({
                                ...profile,
                                businessArea: formatValue(e.target.value),
                              })
                            }, 5000)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='p-2 text-base'>{profile.businessArea}</div>
                  )}
                </div>
              </div>
            </div>
            <div className='bg-white p-3 text-base text-gray-700'>
              <div className='flex items-center space-x-2 font-semibold uppercase text-sm my-2'>
                <HashtagIcon className={`h-5 w-5 text-fpink`} />
                <span className='tracking-wider text-grotesk'>About</span>
              </div>
              <div className='grid md:grid-cols-1 gap-2'>
                <div className='grid grid-cols-1'>
                  <label className='p-2 uppercase text-xs font-bold text-gray-400 flex items-center'>
                    Bio
                    {!disableEdit && (
                      <PencilIcon className='w-4 h-4 ml-2 text-black ' />
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
                    }`}></textarea>
                </div>
                <div className='grid grid-cols-1'>
                  <label className='p-2 uppercase text-xs font-bold text-gray-400 flex'>
                    Company Bio
                    {!disableEdit && (
                      <PencilIcon className='w-4 h-4 ml-2 text-black ' />
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
                    }`}></textarea>
                </div>
              </div>
            </div>
            <div className='bg-white p-3 text-base text-gray-700'>
              <div className='flex items-center space-x-2 font-semibold uppercase text-sm my-2'>
                <CalendarIcon className={`h-5 w-5 text-fpink`} />
                <span className='tracking-wider text-grotesk'>Events</span>
              </div>
              <div className='grid md:grid-cols-2 gap-2'>
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
