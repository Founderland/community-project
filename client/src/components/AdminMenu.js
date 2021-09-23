import { useState } from "react";
import {ReactComponent as LogoLines} from "../assets/2_lines.svg";
import AdminDashboard from "./AdminDashboard"

const views = [
    'dashboard',
    'new_applicants',
    'founders_form',
    'investors_form',
    'allies_form',
    'settings'
]
const active = "border-l-2 border-r-2 border-white bg-blue-700"
const AdminMenu = () => {
    const [menuToggle, setMenuToggle] = useState(true)
    const [view, setView] = useState(0)
    const changeView = (view) => {
        setView(view)
        setMenuToggle(!menuToggle)
    }
    return (
        <div className="relative min-h-screen md:flex">
        <div className="bg-fblue text-gray-100 flex justify-between md:hidden">

            <button className="p-4 focus:outline-none focus:bg-gray-700" onClick={()=>setMenuToggle(!menuToggle)}>
            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
        </div>

        <div className={`shadow sidebar bg-fblue w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out ${menuToggle && '-translate-x-full'}`}>
                    <button className="w-full" onClick={()=>setMenuToggle(!menuToggle)}><LogoLines className="text-white fill-current w-full"/></button>
            <nav className="text-white">
            <button onClick={()=>{changeView(0)}} className={`block ${!view && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg><p className="px-2">Dashboard</p>
            </button>
            <button onClick={()=>{changeView(1)}} className={`block ${view === 1 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
</svg><p className="px-2">New Applicants</p>
            </button>
            <button onClick={()=>{changeView(2)}} className={`block ${view === 2 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="px-2">Founders Form</p>
            </button>
            <button onClick={()=>{changeView(3)}} className={`block ${view === 3 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="px-2">Investors Form</p>
            </button>
            <button onClick={()=>{changeView(4)}} className={`block ${view === 4 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <p className="px-2">Allies Form</p>
            </button>
            <button onClick={()=>{changeView(5)}} className={`block ${view === 5 && active} text-left py-2.5 px-4 w-full transition duration-200 hover:bg-blue-700 flex`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            <p className="px-2">Settings</p>
            </button>
            </nav>
        </div>

        <div className="flex-1 p-10 text-2xl font-bold">
           {
               !view ? <AdminDashboard /> : views[view]
           }
        </div>
</div>
    )
}

export default AdminMenu