import { useState, useEffect, useContext, useMemo } from "react"
import { useRef } from "react"
import { useParams } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"
import ResponseWidget from "./ResponseWidget"
import Loading from "../Widgets/Loading"
import axios from "axios"
import moment from "moment"
import { AnswersContext } from "../../../contexts/AnswersProvider"

const ApplicantsList = ({ status, role, reload }) => {
  const [data, setData] = useState([])
  const [answerData, setAnswerData] = useState({ data: [], header: [] })

  const [loading, setLoading] = useState(true)
  const { setModalMessage, setIModal, token } = useContext(AdminContext)
  let { category } = useParams()

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const applicantsURL = "/api/founder/response/"
  const { viewButton, viewId, setViewButton, buttonClicked } =
    useContext(AnswersContext)

  const getTimeDifference = (DateToCompare) => {
    const today = Date.now()
    const compareDate = Date.parse(DateToCompare)
    let timeDifference = (today - compareDate) / 1000 / 60 / 60

    if (timeDifference >= 24) {
      timeDifference = parseInt((timeDifference /= 24)) + " d ago"
    } else if (timeDifference < 24 && timeDifference > 0.99) {
      timeDifference = Math.round(timeDifference) + " h ago"
    } else {
      timeDifference = parseInt((timeDifference *= 60)) + " m ago"
      if (timeDifference === "0 m ago") {
        timeDifference = "now"
      }
    }
    return timeDifference
  }
  const [listData, setListData] = useState({ data: [], header: [] })

  const style = {
    disabledDiv: "group hover:bg-gray-300",
    disabledInput: "bg-gray-200 group-hover:bg-gray-300 placeholder-gray-500",
    enabledDiv: "bg-blue-200 ",
    enabledInput: "bg-blue-200 placeholder-gray-500",
  }

  //FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          applicantsURL + category + "/" + role,
          config
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

          const location = questionLocation?.answer_value
          const email = questionEmail?.answer_value

          let finalObject = {
            ...item,
            applicantName: `${firstName} ${lastName}`,
            userLocation: location,
            userEmail: email,
            submitted: getTimeDifference(item.submissionDate),
          }

          if (status !== "new") {
            const date = new Date(item.evaluatedOn)
            finalObject = {
              ...finalObject,
              evaluatedOn: date.toLocaleDateString("de-DE"),
            }
          }

          return finalObject
        })

        setListData({
          header: [
            {
              title: "Name",
              key: "applicantName",
              style: "py-3 px-6 text-left ",
            },
            {
              title: "Email",
              key: "userEmail",
              style: "hidden md:table-cell text-left",
            },
            {
              title: "Location",
              key: "userLocation",
              style: "text-left hidden lg:table-cell items-center",
            },
            {
              title: status === "new" ? "Submitted" : "Evaluated On",
              key: status === "new" ? "submitted" : "evaluatedOn",
              style: "text-left hidden md:table-cell items-center",
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
              {/* <col style={{ width: "10vw" }} />
                  <col style={{ width: "15vw" }} />
                  <col style={{ width: "15vw" }} />
    
                  <col style={{ width: "10vw" }} /> */}
            </colgroup>,
          ],
        })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    if (!viewButton && status) {
      fetchData()
    }
  }, [reload])

  useEffect(() => {
    if (viewButton) {
      setViewButton(false)
    }
  }, [status])

  useEffect(() => {
    if (viewButton) {
      const answerList = viewId?.answerData.map((answer) => {
        // console.log("answer", answer);
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
        answerList: answerList,
        total_score: viewId.totalScore,
      })
    }
  }, [viewId, viewButton])

  return loading ? (
    <Loading />
  ) : (
    <ResponseWidget
      data={listData}
      showing={10}
      colSize={listData.colSize}
      cellAlignment={"justify-start"}
    />
  )
}

export default ApplicantsList
