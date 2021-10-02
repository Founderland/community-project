import { ChevronDownIcon } from '@heroicons/react/outline'

const AddUser = () => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div className="-mx-3 md:flex mb-4">
        <div className="md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Avatar
          </label>
          <div className="flex justify-center items-center">
            <div className="relative">
              <img
                src="https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png"
                className="w-36 md:w-44 rounded-xl p-2 mb-3"
                alt="Avatar"
              />
              <span className="absolute bottom-2 right-0 bg-flime p-1 h-8 w-8 text-center rounded-full cursor-pointer transition duration-200 hover:bg-fblue hover:text-white">
                <ChevronDownIcon className="h-6 w-6 fill-current " />
              </span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-3">
          <div className="md:w-full mb-2">
            <label className="block md:mt-6 uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Name
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
              type="text"
            />
          </div>
          <div className="md:w-full mb-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Password
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-7">
        <div className="md:w-full px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            for="grid-state"
          >
            Role
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              id="grid-state"
            >
              <option value="sadmin">Supervisor</option>
              <option value="admin">Administrator</option>
              <option value="reviewer">Reviewer</option>
            </select>
            <div className="pointer-events-none absolute flex items-center px-2 text-grey-darker bottom-3 right-0">
              <ChevronDownIcon className="h-6 w-6 fill-current" />
            </div>
          </div>
        </div>
      </div>
      <div className="-mx-3 px-3 flex flex-col-reverse sm:flex-row items-center justify-around mb-2">
        <button className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue my-2 text-white">
          Cancel
        </button>
        <button className="px-8 py-2 w-full shadow-lg sm:w-1/3 my-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white">
          Add User
        </button>
      </div>
    </div>
  )
}

export default AddUser
