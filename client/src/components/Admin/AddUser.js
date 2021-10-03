import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useState } from 'react'

const avatarColors = [
  'bg-gradient-to-t from-red-300 to-red-500 bg-cover',
  'bg-gradient-to-t from-orange-300 to-orange-500',
  'bg-gradient-to-t from-yellow-300 to-yellow-500',
  'bg-gradient-to-t from-green-300 to-green-500',
  'bg-gradient-to-t from-teal-300 to-teal-500',
  'bg-gradient-to-t from-sky-300 to-sky-500',
  'bg-gradient-to-t from-indigo-300 to-indigo-500',
  'bg-gradient-to-t from-purple-300 to-purple-500',
  'bg-gradient-to-t from-pink-300 to-pink-500',
]

const addUserURL = '/api/users/add'

const AddUser = ({ setAdd }) => {
  const [avatar, setAvatar] = useState(avatarColors[0])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('sadmin')
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const avatarInitials = () => {
    let initials = firstName.length ? firstName[0].toUpperCase() : ''
    initials += lastName.length ? lastName[0].toUpperCase() : ''
    return initials
  }

  const saveUser = async () => {
    const data = { firstName, lastName, email, password, role, avatar }
    axios
      .post(addUserURL, data)
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="bg-white p-4 flex rounded flex-col w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="-mx-3 md:flex mb-4">
          <div className="md:w-1/2 px-3 flex items-center justify-center">
            <div className="flex justify-center items-center">
              <Popover className="relative group">
                <Popover.Button
                  as="div"
                  className={`w-40 h-40 md:w-52 md:h-52 rounded-2xl p-2 mb-3 border-2 border-gray-100 cursor-pointer transition duration-200 group-hover:border-fblue`}
                >
                  <div
                    className={`rounded-full w-36 h-36 md:w-48 md:h-48 ${avatar} flex justify-center items-center`}
                  >
                    <p className="text-6xl md:text-8xl text-mono">
                      {avatarInitials()}
                    </p>
                  </div>
                </Popover.Button>
                <Popover.Button className="absolute bottom-0 right-0 bg-flime p-1 h-8 w-8 text-center rounded-full cursor-pointer transition duration-200 group-hover:bg-fblue group-hover:text-white">
                  <ChevronDownIcon className="h-6 w-6" />
                </Popover.Button>
                <Popover.Panel className="absolute -bottom-32 right-3 md:right-2 rounded shadow-lg bg-white w-32 h-32 p-2 flex flex-wrap justify-between ">
                  {avatarColors.map((color) => (
                    <span
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 hover:border-blue-600 ${color} ${
                        color === avatar ? 'border-green-600' : 'border-white'
                      }`}
                      onClick={() => setAvatar(color)}
                    ></span>
                  ))}
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          <div className="md:w-1/2 px-3">
            <div className="md:w-full mb-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="md:w-full mb-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3"
                type="text"
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>
            <div className="md:w-full mb-2">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                Email
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
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
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="-mx-3 md:flex mb-7">
          <div className="md:w-full px-3">
            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
              Role
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="sadmin" selected={role === 'sadmin'}>
                  Supervisor
                </option>
                <option value="admin" selected={role === 'admin'}>
                  Administrator
                </option>
                <option value="reviewer" selected={role === 'reviewer'}>
                  Reviewer
                </option>
              </select>
              <div className="pointer-events-none absolute flex items-center px-2 text-grey-darker bottom-3 right-0">
                <ChevronDownIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="-mx-3 px-3 flex flex-col-reverse sm:flex-row items-center justify-around">
          <button
            className="px-10 py-2 w-full shadow-lg sm:w-1/3 bg-gray-700 transition duration-200 hover:bg-fblue text-white mb-2"
            onClick={() => {
              setAdd(false)
            }}
          >
            Cancel
          </button>
          <button className="px-8 py-2 w-full shadow-lg sm:w-1/3 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-2">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddUser
