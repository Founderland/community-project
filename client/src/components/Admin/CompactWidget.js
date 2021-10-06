const CompactWidget = ({ data }) => {
  let style = 'text-green-500'
  if (data.change === 0) {
    style = 'text-red-500'
  }

  return (
    <div className="w-full md:w-1/3 lg:w-2/3 px-2">
      <div className="shadow-sm mb-4">
        <div className="bg-white shadow-md md:shadow-lg">
          <div className="px-3 pt-8 pb-10 text-center">
            <h4 className="text-sm uppercase text-gray-500 leading-tight">
              {data.label}
            </h4>
            <h3 className="text-3xl text-gray-700 font-bold my-3 ">
              {data.value}
            </h3>
            <p className={`text-xs ${style} leading-tight`}>{data.percent}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompactWidget
