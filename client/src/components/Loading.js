const animationDelay = [
  { animationDelay: '0.1s' },
  { animationDelay: '0.2s' },
  { animationDelay: '0.3s' },
]

const Loading = () => {
  return (
    <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
      <div
        class="bg-fblue p-2 w-4 h-4 rounded-full animate-bounce"
        style={animationDelay[0]}
      ></div>
      <div
        class="bg-fred p-2 w-4 h-4 rounded-full animate-bounce"
        style={animationDelay[1]}
      ></div>
      <div
        class="bg-flime p-2 w-4 h-4 rounded-full animate-bounce"
        style={animationDelay[2]}
      ></div>
    </div>
  )
}

export default Loading
