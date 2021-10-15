import { useEffect, useState, useContext } from "react"
import axios from "axios"
import ListWidget from "./ListWidget"
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/outline"
import { useHistory } from "react-router"
import AdminContext from "../../contexts/Admin"
import { AnswersContext } from "../../contexts/AnswersProvider"
import ResponseWidget from "./ResponseWidget"
// import AddQuestionForm from './AddQuestion/AddQuestionForm'

const ResponseList = () => {
  let history = useHistory()
  const { view, views, applicantType } = useContext(AdminContext)
  const { viewButton, viewId, buttonClicked } = useContext(AnswersContext)
  const [listData, setListData] = useState({ data: [], header: [] })
  const [answerData, setAnswerData] = useState({ data: [], header: [] })
  viewButton === true && console.log("VIEWID", viewId)

  // create copy ?

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `/api/form/founder/response/${applicantType}`
        )

        const userData = result.data.map((item) => {
          // Getting first and last name
          const firstName = item.answerData.find(
            (x) => x.question === "First name"
          )?.answer_value
          const lastName = item.answerData.find(
            (x) => x.question === "Last name"
          )?.answer_value
          const questionLocation = item.answerData.find(
            (x) => x.question === "City,Country" || x.question === "Location"
          )
          const questionEmail = item.answerData.find(
            (x) => x.question === "email" || x.question === "Email"
          )
          console.log("item", item)
          const location = questionLocation.answer_value
          const email = questionEmail?.answer_value

          return {
            ...item,
            applicantName: `${firstName} ${lastName}`,
            userLocation: location,
            userEmail: email,
          }
        })

        console.log(userData)

        setListData({
          header: [
            {
              title: "UserName",
              key: "applicantName",
              style: "py-3 px-6 text-left ",
            },
            { title: "Email", key: "userEmail", style: "text-left" },
            {
              title: "Location",
              key: "userLocation",
              style: "text-left hidden xl:table-cell items-center",
            },
            {
              title: "Score",
              key: "totalScore",
              style: "text-left",
            },
            { title: "More Info", key: "-", style: "text-center" },
          ],
          data: userData,
          colSize: [
            <colgroup>
              <col style={{ width: "30vw" }} />
              <col style={{ width: "10vw" }} />
              <col style={{ width: "10vw" }} />
              <col style={{ width: "10vw" }} />
              <col style={{ width: "10vw" }} />
            </colgroup>,
          ],
        })
      } catch (e) {
        console.log(e)
      }
    }
    if (!viewButton) {
      fetchData()
    }
  }, [viewButton, applicantType])

  useEffect(() => {
    if (viewButton) {
      const answerData = viewId.answerData.map((answer) => {
        console.log("answer", answer)
        return {
          answer_id: answer.answer_id,
          answer_value: answer.answer_value,
          question_category: answer.category,
          question_value: answer.question,
          question_type: answer.type,
          question_id: answer._id,
          answer_score: answer.score,
          answer_rank: answer.rank,
        }
      })

      setAnswerData({
        header: [
          {
            title: "Question",
            key: "question_value",
            style: "py-3 px-6 text-left ",
          },
          {
            title: "Answer",
            key: "answer_value",
            style: "text-left",
          },
          {
            title: "Category",
            key: "question_category",
            style: "text-left hidden xl:table-cell items-center",
          },
          {
            title: "Score",
            key: "answer_score",
            style: "text-left",
          },
          {
            title: "Rank",
            key: "answer_rank",
            style: "text-left",
          },
        ],
        data: answerData,
        colSize: [
          <colgroup>
            <col style={{ width: "20vw" }} />
            <col style={{ width: "20vw" }} />
            <col style={{ width: "10vw" }} />
            <col style={{ width: "10vw" }} />
            <col style={{ width: "10vw" }} />
          </colgroup>,
        ],
      })
    }
  }, [viewId, viewButton])

  return (
    <div className='w-full flex flex-col '>
      <div className=' flex justify-between items-center mx-2'>
        <div className=' '>Founders Response</div>
        {viewButton && (
          <div
            onClick={() => buttonClicked(!viewButton)}
            className=' flex justify-center items-center space-around text-lg w-1/2 md:w-auto py-3  px-5 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black'>
            <ArrowLeftIcon className='w-5 h-5 mr-3 ' />
            Back
          </div>
        )}
      </div>
      <ResponseWidget
        data={viewButton ? answerData : listData}
        showing={10}
        colSize={viewButton ? answerData.colSize : listData.colSize}
        cellAlignment={"justify-start"}
      />
    </div>
  )
}

export default ResponseList
