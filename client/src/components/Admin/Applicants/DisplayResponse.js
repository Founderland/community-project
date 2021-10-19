import { useEffect, useState } from "react"

export default function DisplayResponse(props) {
  const [answerData, setAnswerData] = useState([])
  const [catList, setCatList] = useState([])

  useEffect(() => {
    if (props.data.answerList && props.data.answerList?.length > 0) {
      const answerlist = props.data.answerList
      let catList = []
      let modList = []
      for (const item of answerlist) {
        if (catList.findIndex((x) => x === item.question_category) === -1) {
          catList.push(item.question_category)
          modList.push(
            answerlist.filter(
              (x) => x.question_category === item.question_category
            )
          )
        }
      }

      setCatList(catList)
      setAnswerData(modList)
    }

    return () => {
      setAnswerData([])
    }
  }, [props.data.answerList])

  const answerItem = (item) => (
    <>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
        <div className="text-sm font-semibold text-black text-lg">
          {item.question_value}
        </div>
        <div className="flex w-full ">
          <div className="mt-1 text-sm text-black sm:mt-0 sm:col-span-2 w-4/5 text-lg mr-3">
            {item.answer_value}
          </div>
          <div className="mt-1  hidden  md:flex text-sm text-black text-md font-semibold sm:mt-0 sm:col-span-3 w-1/5 ">
            {item.answer_score ? item.answer_score : "-"}
          </div>
        </div>
        <div>
          <dd className=" hidden  md:flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {" "}
            ({item.answer_rank} )
          </dd>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="bg-white border-2 bg-opacity-40 shadow sm:rounded-lg text-grotesk">
        {catList.map((catName, index) => (
          <>
            {" "}
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-bold text-xl text-black">
                {catName}{" "}
              </h3>
              {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="border-t border-gray-200 mb-5">
              <dl>{answerData[index].map((answer) => answerItem(answer))}</dl>
            </div>
          </>
        ))}
      </div>
    </>
  )
}
