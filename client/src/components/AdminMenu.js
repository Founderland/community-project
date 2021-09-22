import { useState } from "react";

const AdminMenu = () => {
    const [menuToggle, setMenuToggle] = useState(false)
    

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
                <button  onClick={()=>setMenuToggle(!menuToggle)}>
                    <span className="pl-2 text-hanson text-xl">FounderLand</span>
                </button>
            <nav className="text-white">
            <button className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Dashboard
            </button>
            <button className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                New Applicants
            </button>
            <button className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Founders Form
            </button>
            <button className="block text-left py-2.5 px-4 w-full rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                Investors Form
            </button>
            </nav>
        </div>

        <div className="flex-1 p-10 text-2xl font-bold">
            content goes here
        </div>
</div>
    )
}

export default AdminMenu