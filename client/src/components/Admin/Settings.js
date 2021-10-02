import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import ListWidget from './ListWidget'
import Loading from '../Loading'
import AdminContext from '../../contexts/Admin'
import Modal from '../Modal'
import { Tab } from '@headlessui/react'
import UserContext from '../../contexts/User'

const usersAPI = '/api/users/all'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const Settings = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { modalMessage, setModal, setModalMessage } = useContext(AdminContext)
  const { user } = useContext(UserContext)
  useEffect(() => {
    axios
      .get(usersAPI)
      .then((res) => {
        let result = {
          header: [
            { title: 'Name', key: 'name', style: '' },
            { title: 'Email', key: 'email', style: '' },
            { title: 'Role', key: 'role', style: '' },
            { title: 'Added on', key: 'date', style: '' },
            { title: 'Actions', key: '-', style: '' },
          ],
        }
        result = { ...result, ...res.data }
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setModalMessage({
          title: 'Error loading the database set',
          message: err,
        })
        setModal(true)
      })
  }, [])

  return (
    <div className="flex flex-col w-full">
      {/* Modal for Messages */}
      <Modal message={modalMessage} />
      {/* Tabs for Navigation */}
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-fblue">
          {user.role === 'sadmin' ? (
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-mono leading-5 font-medium ',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-40',
                  selected
                    ? 'text-fblue bg-white shadow-xl'
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                )
              }
            >
              Users
            </Tab>
          ) : (
            ''
          )}
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full py-2.5 text-mono leading-5 font-medium',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                selected
                  ? 'text-fblue bg-white shadow-xl'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              )
            }
          >
            Profile
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          {user.role === 'sadmin' ? (
            <Tab.Panel classname="p-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60">
              {loading && <Loading />}
              {!loading && (
                <ListWidget title="Current Registered Users" data={data} />
              )}
            </Tab.Panel>
          ) : (
            ''
          )}
          <Tab.Panel>{!loading && 'User Profile'}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {/* Data to display */}
    </div>
  )
}

export default Settings
