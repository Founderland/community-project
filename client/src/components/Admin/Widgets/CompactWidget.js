import Loading from "./Loading"

const CompactWidget = ({ data, loading }) => {
  return (
    <div className="w-full px-2">
      <div className="shadow-sm mb-4">
        <div className="bg-white shadow-md md:shadow-lg">
          <div className="px-3 py-4 text-center">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h4 className="text-sm uppercase text-gray-500 leading-tight mt-3">
                  {data?.label}
                </h4>
                <h3 className="text-4xl text-gray-700 font-bold my-3 ">
                  {data?.value}
                </h3>
                <div
                  className={` mx-auto py-1 px-2 text-xs text-center w-max rounded-full py-1 px-2 mx-auto ${
                    data?.new === 0
                      ? "text-white bg-white"
                      : "text-white bg-green-400"
                  }`}
                >
                  <p className="text-xs leading-tight">
                    {data?.new} new this week
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompactWidget
