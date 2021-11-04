import { PencilIcon } from "@heroicons/react/outline"
import { ReactComponent as InstagramLogo } from "../../../assets/images/instagram.svg"
import { ReactComponent as LinkedinLogo } from "../../../assets/images/linkedin.svg"
import { ReactComponent as TwitterLogo } from "../../../assets/images/twitter.svg"

const Socialmedia = ({ isMyProfile, profile, setProfile, disableEdit }) => {
  return (
    <div
      className={`flex ${
        isMyProfile ? "flex-col items-start " : "justify-center items-center"
      }  py-3`}>
      <p className='w-full uppercase text-sm text-grotesk text-center'>
        Socialmedia
      </p>
      <div
        className={`
            flex w-full items-center   ${!isMyProfile && " justify-center"}
          `}>
        <a
          target='_blank'
          href={profile.socialmedia?.instagram || "#"}
          rel='noreferrer'>
          <InstagramLogo
            className={`w-10 h-10 ${
              !profile.socialmedia?.instagram && " opacity-30"
            }`}
          />
        </a>
        {isMyProfile && (
          <input
            disabled={disableEdit}
            placeholder={profile.socialmedia?.instagram || "Add your profile"}
            defaultValue={profile.socialmedia?.instagram}
            onChange={(e) =>
              setProfile({
                ...profile,
                socialmedia: {
                  ...profile.socialmedia,
                  instagram: e.target.value,
                },
              })
            }
            className={`p-2 text-base w-3/4 xl:w-full  ${
              disableEdit ? "bg-white " : "bg-sky-50"
            }`}
          />
        )}
        {!disableEdit && <PencilIcon className='w-4 h-4 ml-2 text-black ' />}
      </div>
      <div
        className={`
            flex w-full items-center  py-2 ${
              !isMyProfile && " justify-center py-0"
            }
          `}>
        <a
          target='_blank'
          href={profile.socialmedia?.linkedin || "#"}
          rel='noreferrer'>
          <LinkedinLogo
            className={`w-10 h-10 ${
              !profile.socialmedia?.linkedin && " opacity-30"
            }`}
          />
        </a>
        {isMyProfile && (
          <input
            disabled={disableEdit}
            placeholder={profile.socialmedia?.linkedin || "Add your profile"}
            defaultValue={profile.socialmedia?.linkedin}
            onChange={(e) =>
              setProfile({
                ...profile,
                socialmedia: {
                  ...profile.socialmedia,
                  linkedin: e.target.value,
                },
              })
            }
            className={`p-2 text-base w-3/4 xl:w-full  ${
              disableEdit ? "bg-white " : "bg-sky-50"
            }`}
          />
        )}
        {!disableEdit && <PencilIcon className='w-4 h-4 ml-2 text-black ' />}
      </div>
      <div
        className={`
            flex w-full items-center   ${!isMyProfile && " justify-center"}
          `}>
        <a href={profile.socialmedia?.twitter || "#"}>
          <TwitterLogo
            className={`w-10 h-10 ${
              !profile.socialmedia?.twitter && " opacity-30"
            }`}
          />
        </a>
        {isMyProfile && (
          <input
            disabled={disableEdit}
            placeholder={profile.socialmedia?.twitter || "Add your profile"}
            defaultValue={profile.socialmedia?.twitter}
            onChange={(e) =>
              setProfile({
                ...profile,
                socialmedia: {
                  ...profile.socialmedia,
                  twitter: e.target.value,
                },
              })
            }
            className={`p-2 text-base w-3/4 xl:w-full  ${
              disableEdit ? "bg-white " : "bg-sky-50"
            }`}
          />
        )}
        {!disableEdit && <PencilIcon className='w-4 h-4 ml-2 text-black ' />}
      </div>
    </div>
  )
}

export default Socialmedia
