import headShots from "../../../assets/images/headshotPics.png"

import { Image, Transformation } from "cloudinary-react"
import {
  CheckCircleIcon,
  CheckIcon,
  CloudUploadIcon,
} from "@heroicons/react/outline"
import DropzoneAWS from "./DropzoneAWS"
import DropzoneCloudinary from "./DropzoneCloudinary"

const NextStep = ({ nextStep, previousStep, data, setData }) => {
  return (
    <div className='h-full w-screen flex flex-col  items-center p-5  lg:w-full lg:h-screen'>
      <div className='h-1/2 md:h-1/6  flex flex-col justify-around items-center p-4 '>
        <h1 className='font-bold text-xl md:text-2xl text-grotesk mb-3'>
          Upload your headshot
        </h1>
        <p className='text-grotesk md:text-xl lg:px-10'>
          One of Founderland's key pillars is generating visibility for the
          women in our community. We do this by sharing your image, your story
          and your business with the world, via our own channels, as well as
          with media partners.
        </p>
      </div>
      <div className=' flex flex-col justify-between md:justify-center lg:justify-around items-center h-2/3 lg:h-full w-full  bg-white  p-4'>
        <div className='flex flex-col h-full w-full justify-around items-center xl:flex-row xl:flex-wrap '>
          {/* upload response message for user */}
          {/* {uploadStatus.success ? (
            <div className=' w-full md:w-3/4 bg-green-400 flex items-center p-5 font-bold '>
              <CheckCircleIcon className='w-8 h-8' />
              {uploadStatus.message}
            </div>
          ) : (
            !uploadStatus.success &&
            uploadStatus.message && (
              <div className='w-full md:w-3/4 bg-red-400 flex items-center p-5 font-bold'>
                <CheckCircleIcon className='w-8 h-8' />
                {uploadStatus.message}
              </div>
            )
          )} */}
          <div className='w-full h-full lg:h-1/6 xl:h-auto xl:w-1/6  flex flex-col  justify-center xl:items-around pb-2'>
            <h1 className='block uppercase text-gray-800 text-md font-bold mb-2 text-center'>
              Headshot best practice
            </h1>

            <p className='text-lg py-2 text-grotesk'>
              &#8594; Use a full color image on a simple background
            </p>
            <p className='text-lg py-2 text-grotesk'>
              &#8594; 3/4 4:5 ratio vertical - Center yourself within the frame
            </p>
            <p className='text-lg py-2 text-grotesk '>
              &#8594; Frontal or 3/4 view don't crop your face
            </p>
            <p className='text-lg py-2 text-grotesk'>
              &#8594; Send us a few options: professional,playful expressive
            </p>
            <p className='text-lg py-2 md:hidden text-grotesk'>
              &#8594; check some real example here
            </p>
          </div>
          <div className='hidden md:flex h-3/6 lg:h-2/6  xl:h-4/6 xl:w-4/6'>
            <img
              src={headShots}
              alt='headshot'
              className='h-full object-contain'
            />
          </div>
          <div className='flex flex-col items-center justify-center h-1/3 w-full md:h-3/4 md:w-3/4 lg:w-3/4 lg:h-1/4'>
            {/* <DropzoneAWS data={data} setData={setData} type='headshot' /> */}
            <DropzoneCloudinary data={data} setData={setData} type='headshot' />
          </div>
        </div>
        {/* CLOUDINARY */}
        {/* <Image
          cloudName='founderland'
          publicId='profile_pictures/zvtphvyq5eb9hdvswyph'
          width='100'
          height='100'>
          <Transformation
            width='200'
            height='200'
            gravity='face'
            crop='thumb'
          />
          <Transformation radius='90' />
        </Image> */}

        <div className='w-full flex justify-between pt-10  lg:w-5/6'>
          <button
            type='button'
            className='p-5 bg-fblue font-bold text-lg text-white shadow-lg '
            onClick={() => previousStep()}>
            Back
          </button>
          <button
            type='button'
            className='p-5 bg-fblue font-bold text-lg text-white shadow-lg '
            onClick={() => nextStep()}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default NextStep
