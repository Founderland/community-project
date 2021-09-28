import {ReactComponent as LogoLines} from "../assets/2_lines.svg";

const active = "border-r-4 border-white bg-blue-700"

const AdminMenu = ({view, changeView, setMenuToggle, menuToggle}) => {
    return (
        <div className={`fixed z-30 inset-y-0 left-0 w-60 transition duration-300 transform bg-fblue overflow-y-auto ${!menuToggle && '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
            <button className="w-full p-2" onClick={()=>setMenuToggle(!menuToggle)}><LogoLines className="text-white fill-current w-full"/></button>
            <nav className="text-white text-mono py-4 text-md">
                <button onClick={()=>{changeView(0)}} className={`block ${!view && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg><p className="px-2">Dashboard</p>
                </button>
                <button onClick={()=>{changeView(1)}} className={`block ${view === 1 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg><p className="px-2">New Applicants</p>
                </button>
                <button onClick={()=>{changeView(2)}} className={`block ${view === 2 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="px-2">Founders Form</p>
                </button>
                <button onClick={()=>{changeView(3)}} className={`block ${view === 3 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="px-2">Investors Form</p>
                </button>
                <button onClick={()=>{changeView(4)}} className={`block ${view === 4 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="px-2">Allies Form</p>
                </button>
                <button onClick={()=>{changeView(5)}} className={`block ${view === 5 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex items-center`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                <p className="px-2">Settings</p>
                </button>
                </nav>
    </div>
    )
}

export default AdminMenu