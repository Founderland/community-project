import React from 'react'

export default function ActiveDot() {
   return (
               <span class="flex h-3 w-3 relative mr-4">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
      <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
    </span>
   )
}
