import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminMain from './AdminMain'

const Admin = () => {
    const [logged, setLogged] = useState(false)
    return (
        <>
        {logged ? <AdminMain setLogged={setLogged}/> : <AdminLogin setLogged={setLogged}/>}
        </>
    )
}

export default Admin