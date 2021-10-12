import { useState } from 'react'
import Login from './Login'
import Main from './Main'
import UserContext from '../../contexts/User'

const Admin = () => {
  const [user, setUser] = useState(true)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user ? <Main /> : <Login />}
    </UserContext.Provider>
  )
}

export default Admin
