import axios from 'axios'
import { useContext, useState } from 'react'
import { ReactComponent as LogoLines } from '../../assets/2_lines.svg'
import { ReactComponent as ErrorLogo } from '../../assets/error_logo.svg'
import { Dialog } from '@headlessui/react'
import { UserContext } from '../../contexts/User'

const loginURL = '/api/auth/log-in'

const AdminLogin = () => {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [modal, setModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('Sorry something went wrong')

  const login = async () => {
    const loginData = { email: username, password }
    //Axios call
    try {
      const response = await axios.post(loginURL, loginData)
      //If confirmed (setLogged - Save Username)
      if (response.data.email) {
        setUsername('')
        setPassword('')
        setUser(response.data)
      } else {
        setModalMessage(response.data.message)
        setModal(true)
      }
    } catch (err) {
      //If error modal with error details
      console.log(err)
      setModalMessage('Sorry something went wrong')
      setModal(true)
    }
  }

  return (
    <div className="flex h-screen justify-center items-center w-full ">
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
      <div className="flex bg-white shadow-lg lg:w-2/3 xl:w-1/2">
        <div className="hidden lg:block lg:w-1/2 bg-fblue"></div>
        <div className="w-full p-8 lg:w-1/2">
          <div className="flex justify-center">
            <LogoLines />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <p className="text-grotesk text-center text-blue-500 uppercase">
              Admin login
            </p>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="text-grotesk block text-sm font-bold mb-2">
              Username
            </label>
            <input
              className="border border-gray-300 py-2 px-4 block w-full appearance-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="text-grotesk block text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="border border-gray-300 py-2 px-4 block w-full appearance-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-1 flex justify-end">
            <button className="text-grotesk text-xs text-gray-500">
              Forget Password?
            </button>
          </div>
          <div className="mt-8">
            <button
              className="w-full px-4 py-2 text-mono font-bold bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-xs text-black hover:text-white"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
