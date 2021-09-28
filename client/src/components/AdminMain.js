import { useState } from 'react'
import AdminMenu from './AdminMenu'
import AdminContent from './AdminContent'
import AdminHeader from './AdminHeader'

const views = [
    'Dashboard',
    'New Applicants',
    'Founders Form',
    'Investors Form',
    'Allies Form',
    'Settings',
    'Profile',
]

const AdminMain = ({ setLogged }) => {
    const [menuToggle, setMenuToggle] = useState(false)
    const [view, setView] = useState(0)
    const changeView = (view) => {
        setView(view)
        setMenuToggle(!menuToggle)
    }
    return (
        <div>
            <div>
                <div className="flex h-screen font-roboto">
                    <div
                        className={`${
                            menuToggle ? 'block ' : 'hidden '
                        }fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden`}
                        onClick={() => setMenuToggle(false)}
                    ></div>
                    <AdminMenu
                        view={view}
                        changeView={changeView}
                        menuToggle={menuToggle}
                        setMenuToggle={setMenuToggle}
                    />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <AdminHeader
                            view={views[view]}
                            setMenuToggle={setMenuToggle}
                            setLogged={setLogged}
                            setView={setView}
                        />
                        <AdminContent view={views[view]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMain
