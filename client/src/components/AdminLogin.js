import axios from 'axios'
import { useState } from 'react'
import { ReactComponent as LogoLines } from '../assets/2_lines.svg'
import { Dialog } from '@headlessui/react'

const loginURL = '/api/auth/log-in'

const AdminLogin = ({ setLogged }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [modal, setModal] = useState(true)
    const [modalMessage, setModalMessage] = useState('')

    const login = () => {
        const loginData = { email: username, password }
        //Axios call
        axios
            .post(loginURL, loginData)
            //If confirmed (setLogged - Save Username)
            .then((response) => {
                if (response.data.email) {
                    setLogged(true)
                } else {
                    setModalMessage(response.data.message)
                    setModal(true)
                }
            })
            //If error modal with error details
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="flex h-screen justify-center items-center w-full ">
            <Dialog open={modal} onClose={() => setModal(false)}>
                <Dialog.Overlay />

                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <p>{modalMessage}</p>

                <button onClick={() => setModal(false)}>Deactivate</button>
                <button onClick={() => setModal(false)}>Cancel</button>
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
