const Tooltip = ({ message }) => {
  return (
    <div className="opacity-0 w-48 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full px-3 pointer-events-none">
      <p className=" break-all overflow-auto">{message}</p>
      <svg
        className="absolute text-black h-2 w-full left-0 top-full"
        viewBox="0 0 255 255"
      >
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  )
}

export default Tooltip
