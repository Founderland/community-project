import axios from 'axios'
import { useContext, useState } from 'react'
import { ReactComponent as LogoLines } from '../../assets/line.svg'
import { ReactComponent as SmallLogo } from '../../assets/small.svg'
import AdminContext from '../../contexts/Admin'
import InfoModal from '../InfoModal'

const loginURL = '/api/auth/log-in'

const AdminLogin = () => {
	const { setUser, setIModal, setModalMessage } = useContext(AdminContext)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const login = async () => {
		const loginData = { email: email, password }
		//Axios call
		try {
			const response = await axios.post(loginURL, loginData)
			if (response.data.email) {
				setEmail('')
				setPassword('')
				setUser(response.data)
			} else {
				setModalMessage({
					title: 'Wrong Credentials',
					icon: 'shield',
					message: response.data.message
				})
				setIModal(true)
			}
		} catch (err) {
			//If error modal with error details
			setModalMessage({
				title: 'Server Error',
				icon: 'cross',
				message: 'Sorry, something went wrong'
			})
			setIModal(true)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		login()
	}
	return (
		<div className="flex h-screen justify-center items-center w-full ">
			<InfoModal />
			<div className="flex bg-white shadow-lg md:w-2/3 xl:w-1/2">
				<div className="relative hidden md:block md:w-1/2 bg-fblue">
					<SmallLogo className="absolute bottom-0 h-20 w-20 text-white fill-current" />
				</div>
				<div className="w-full p-8 md:w-1/2">
					<div className="flex justify-center">
						<LogoLines className="w-full" />
					</div>
					<div className="mt-4 flex items-center justify-between">
						<span className="border-b w-1/5 lg:w-1/4"></span>
						<p className="text-grotesk text-center text-blue-500 uppercase">Admin login</p>
						<span className="border-b w-1/5 lg:w-1/4"></span>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mt-4">
							<label className="text-grotesk block text-sm font-bold mb-2">email</label>
							<input
								className="border border-gray-300 py-2 px-4 block w-full appearance-none"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mt-4">
							<label className="text-grotesk block text-sm font-bold mb-2">Password</label>
							<input
								className="border border-gray-300 py-2 px-4 block w-full appearance-none"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="mt-1 flex justify-end">
							<button className="text-grotesk text-xs text-gray-500">Forgot Password?</button>
						</div>
						<div className="mt-8">
							<button
								type="submit"
								className="w-full px-4 py-2 text-mono bg-flime transition-colors ease-in-out duration-500 hover:bg-fblue text-sm text-black hover:text-white"
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AdminLogin
