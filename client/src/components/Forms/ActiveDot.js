import React from 'react'

export default function ActiveDot() {
    return (
        <span className="flex h-5 w-5 relative mr-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-white"></span>
        </span>
    )
}
