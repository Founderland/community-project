import axios from 'axios'
import { useEffect, useState } from 'react'
import ListWidget from './ListWidget'
import { Dialog } from '@headlessui/react'
import { ReactComponent as ErrorLogo } from '../../assets/error_logo.svg'

const usersAPI = '/api/users/all'

const Settings = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalMessage, setModalMessage] = useState({})
  const [modal, setModal] = useState(false)

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
        console.log(result)
        setData(result)
        setLoading(false)
      })
      .catch((err) => {
        setModalMessage(err)
        setModal(true)
      })
  }, [])

  return (
    <div>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen h-full">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          <div className="relative  bg-white rounded max-w-sm w-4/6 h-1/6 h-2/6 md:h-1/6 p-5">
            <div className="flex flex-col justify-between bg-gray-50 h-full rounded-lg shadow-inner items-center">
              <Dialog.Title className="bg-fred-light text-white text-center text-mono font-bold rounded-t p-2 w-full">
                Authentication Failed
              </Dialog.Title>
              <Dialog.Description className="flex justify-evenly items-center text-center text-mono text-lg w-full p-1 ">
                <ErrorLogo />
                {modalMessage}
              </Dialog.Description>
              <button
                className="  bg-flime text-black hover:bg-fblue hover:text-white text-mono p-2 w-1/2 sel"
                onClick={() => setModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      {loading && 'Loading'}
      {!loading && <ListWidget title="Users" data={data} />}
    </div>
  )
}

export default Settings
