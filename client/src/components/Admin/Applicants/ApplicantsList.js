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

const applicantsURL = "/api/applicants/response/"

const ApplicantsList = ({ status, role, reload }) => {
  const [loading, setLoading] = useState(true)
  const { config, selectedTab } = useContext(AdminContext)
  let { category } = useParams()

  const getTimeDifference = (DateToCompare) => {
    const today = Date.now()
    const compareDate = Date.parse(DateToCompare)
    //getting hours
    let timeDifference = (today - compareDate) / 1000 / 60 / 60
    if (timeDifference >= 24) {
      //getting days
      timeDifference /= 24
      //if less than 60 days shows num of days, if more shows the full date
      timeDifference =
        timeDifference <= 60
          ? parseInt(timeDifference) + " d ago"
          : new Date(DateToCompare).toLocaleDateString("de-DE")
    } else if (timeDifference < 24 && timeDifference > 0.99) {
      //shows hours
      timeDifference = Math.round(timeDifference) + " h ago"
    } else {
      //shouws minutes
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
          const userLocation = item.answerData.filter(
            (x) => x.question.search("City") === 0
          )
          let finalObject = {
            ...item,
            applicantName: `${item.firstName} ${item.lastName}`,
            userLocation: userLocation[0].answer_value,
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
              title: "Location",
              key: "userLocation",
              style: "text-left hidden lg:table-cell items-center",
            },
            {
              title: status === "new" ? "Submitted" : "Evaluated On",
              key: status === "new" ? "submitted" : "evaluatedOn",
              style: "text-left hidden md:table-cell items-center",
            },
            role === "founder"
              ? {
                  title: "Score",
                  key: "totalScore",
                  style: "text-left",
                }
              : "null",
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
