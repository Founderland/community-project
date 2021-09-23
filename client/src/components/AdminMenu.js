import { useState } from "react";
import {ReactComponent as LogoLines} from "../assets/2_lines.svg";
import AdminDashboard from "./AdminDashboard"

const views = [
    'dashboard',
    'new_applicants',
    'founders_form',
    'investors_form'
]

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
            <button onClick={()=>{changeView(0)}} className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Dashboard
            </button>
            <button onClick={()=>{changeView(1)}} className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                New Applicants
            </button>
            <button onClick={()=>{changeView(2)}} className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Founders Form
            </button>
            <button onClick={()=>{changeView(3)}} className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Investors Form
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