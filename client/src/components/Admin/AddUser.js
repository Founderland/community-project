const AddUser = () => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <div className="-mx-3 md:flex mb-4">
        <div className="md:w-1/2 px-3 ">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Avatar
          </label>
          <div className="relative inline-flex md:flex md:justify-center md:items-center">
            <img
              src="https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png"
              className="w-44 md:w-52 rounded-xl p-2 mb-3"
              alt="avatar"
            />
            <span className="absolute bottom-2 right-0 md:right-auto bg-green-200 p-2 h-9 w-12 text-center rounded-full cursor-pointer text-sm transition-all duration-100 hover:bg-green-500 hover:font-bold">
              Edit
            </span>
          </div>
        </div>
        <div className="md:w-1/2 px-3">
          <div className="md:w-full mb-2">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
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
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-full px-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Role
          </label>
          <div className="relative">
            <select className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
              <option>Supervisor</option>
              <option>Administrator</option>
              <option>Reviewer</option>
            </select>
            <div className="pointer-events-none absolute flex items-center px-2 text-grey-darker bottom-3 right-0">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="-mx-3 px-3 flex flex-col-reverse sm:flex-row items-center justify-around mb-2">
        <button class="px-10 py-2 w-full sm:w-1/3 bg-green-600 my-2 ">
          Cancel
        </button>
        <button class="px-8 py-2 w-full sm:w-1/3 bg-green-600 my-2">
          Add User
        </button>
      </div>
    </div>
  )
}

export default AddUser
