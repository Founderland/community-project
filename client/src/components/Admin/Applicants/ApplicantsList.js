import { useState, useEffect, useContext, useMemo } from "react"
import { useParams } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import axios from "axios"
import moment from "moment"
import ListWidget from "../Widgets/ListWidget"
const styles = {
  founder:
    "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  investor: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const ApplicantsList = ({ status, role, reload }) => {
  const [loading, setLoading] = useState(true)
  const { token, selectedTab } = useContext(AdminContext)
  let { category } = useParams()

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const applicantsURL = "/api/applicants/response/"

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
              evaluatedOn: moment(date).format("DD/M/YYYY"),
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
            { title: "", key: "-", style: "text-center" },
          ],
          data: userData,
          colSize: [<colgroup></colgroup>],
        })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [category, selectedTab])

  return loading ? (
    <Loading />
  ) : (
    <ListWidget
      title={""}
      data={listData}
      showing={10}
      colSize={listData.colSize}
      styles={styles}
    />
  )
}

export default ApplicantsList
