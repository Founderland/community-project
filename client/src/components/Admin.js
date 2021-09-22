import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminMenu from './AdminMenu'

const Admin = () => {
    const [logged, setLogged] = useState(false)
    return (
        <>
        {logged ? <AdminMenu /> : <AdminLogin setLogged={setLogged}/>}
        </>
    )
}

export default Admin