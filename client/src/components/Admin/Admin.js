import { useState } from 'react'
import Login from './Login'
import Main from './Main'

const Admin = () => {
    const [logged, setLogged] = useState(false)
    return (
        <>
            {logged ? (
                <Main setLogged={setLogged} />
            ) : (
                <Login setLogged={setLogged} />
            )}
        </>
    )
}

export default Admin
