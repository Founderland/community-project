import React from 'react'
import ActiveDot from './ActiveDot'
// import "./CategoryItem.css"


export default function CategoryItem({ text, isActive }) {
    

    return (
        <div className= "relative flex items-center py-2" >
            {isActive ? (
                <ActiveDot />
            ) : (
                <span className="flex h-4 w-4 relative mr-4">
                    <span className="relative inline-flex rounded-full h-4 w-4 border-white border-2 bg-fblue"></span>
                </span>
            )}
            <li
                className={
                    'item text-xl xl:text-2xl text-mono ' +
                    (isActive && 'my-4 font-bold')
                }
            >
                {text}
            </li>
        </div>
    )
}
