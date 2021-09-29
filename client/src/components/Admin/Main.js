import { useState } from 'react'
import Menu from './Menu'
import Content from './Content'
import Header from './Header'

const views = [
    'Dashboard',
    'New Applicants',
    'Founders Form',
    'Investors Form',
    'Allies Form',
    'Settings',
    'Profile',
]

const Main = ({ setLogged }) => {
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
                    <Menu
                        view={view}
                        changeView={changeView}
                        menuToggle={menuToggle}
                        setMenuToggle={setMenuToggle}
                    />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <Header
                            view={views[view]}
                            setMenuToggle={setMenuToggle}
                            setLogged={setLogged}
                            setView={setView}
                        />
                        <Content view={views[view]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
