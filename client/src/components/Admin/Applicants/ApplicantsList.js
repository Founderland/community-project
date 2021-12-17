import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import axios from "axios"
import moment from "moment"
import ListWidget from "../Widgets/ListWidget"
const styles = {
  founder: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  investor:
    "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const applicantsURL = "/api/applicants/response/"

const ApplicantsList = ({ role }) => {
  const [loading, setLoading] = useState(true)
  const { category } = useParams()
  const [listData, setListData] = useState({
    data: [],
    header: [],
  })
  const { config, selectedTab, reload } = useContext(AdminContext)
  const [filter, setFilter] = useState([
    { key: "name", search: "", show: false, type: "text" },
    { key: "location", search: "", show: false, type: "text" },
    { key: "totalScore", search: "", show: false, type: "number" },
  ])
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
  //FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          applicantsURL + category + "/" + role,
          config
        )
        let userData = result.data.map((item) => {
          const userLocation = item.answerData.filter(
            (x) => x.question.search("City") !== -1
          )
          let finalObject = {
            ...item,
            name: `${item.firstName} ${item.lastName}`,
            location: userLocation[0].answer_value
              ? userLocation[0].answer_value
              : "",
            submittedOn: getTimeDifference(item.submissionDate),
          }
          if (category !== "new") {
            const date = new Date(item.evaluatedOn)
            finalObject = {
              ...finalObject,
              evaluatedOn: moment(date).format("DD/M/YYYY"),
            }
          }

          return finalObject
        })
        let header = [
          {
            title: "Name",
            key: "name",
            style: "py-3 px-6 text-left ",
          },
          {
            title: "Location",
            key: "location",
            style: "text-center hidden lg:table-cell",
          },
          {
            title: "Score",
            key: "totalScore",
            style: `text-center ${role === "founder" ? "show" : "hidden"}`,
          },
          {
            title: category === "new" ? "Submitted" : "Evaluated On",
            key: category === "new" ? "submittedOn" : "evaluatedOn",
            style: "text-center hidden md:table-cell",
          },
          { title: "", key: "-", style: "text-center min-w-20" },
        ]
        filter.forEach(
          (term) =>
            (userData = [
              ...userData.filter((item) => {
                if (term.type === "text")
                  return item[term.key]
                    .toLowerCase()
                    .includes(term.search.toLowerCase())
                return Number(item[term.key]) >= Number(term.search)
              }),
            ])
        )
        setListData({
          header: [...header],
          data: [...userData],
          colSize: [<colgroup></colgroup>],
        })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [category, reload, selectedTab, filter])

  return loading ? (
    <Loading />
  ) : (
    <ListWidget
      title={""}
      data={listData}
      showing={10}
      colSize={listData.colSize}
      styles={styles}
      filter={filter}
      setFilter={setFilter}
    />
  )
}

export default ApplicantsList
