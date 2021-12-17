import { useState, useEffect, useContext } from "react"
import AdminContext from "../../../contexts/Admin"
import ListWidget from "../Widgets/ListWidget"
import Loading from "../Widgets/Loading"
import axios from "axios"
import moment from "moment"

const styles = {
  new: "bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs",
  pending: "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs",
  reviewed: "bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs",
  founder: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  investor:
    "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
  sadmin: "bg-fred bg-opacity-50 py-1 px-3 rounded-full text-xs",
  admin: "bg-fblue bg-opacity-50 py-1 px-3 rounded-full text-xs",
  user: "bg-fpink bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const NewsLetterList = ({ role, newsletterDataHandler }) => {
  const [data, setData] = useState({
    header: [
      { title: "Name", key: "name", style: "text-right text-sm" },
      { title: "Email", key: "email", style: "text-center text-sm" },
      {
        title: "Interest",
        key: "interests",
        style: "hidden md:table-cell text-center text-sm",
      },
      {
        title: "Subscribed On",
        key: "subscribedOn",
        style: "text-center text-sm px-2",
      },
    ],
    data: [],
  })
  const [loading, setLoading] = useState(true)
  const { config, reload } = useContext(AdminContext)
  const [filter, setFilter] = useState([
    { key: "name", search: "", show: false, type: "text" },
    { key: "email", search: "", show: false, type: "text" },
    { key: "interests", search: "", show: false, type: "text" },
  ])
  //FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/applicants/response/newsletter",
          config
        )
        response.data.forEach((element) => {
          if (element.subscriptionDate) {
            element.subscribedOn = moment(element.subscriptionDate).format(
              "DD/M/YYYY"
            )
            element.name = element.firstName + " " + element.lastName
          }
        })
        let filteredData = [...response.data]
        filter.forEach(
          (term) =>
            (filteredData = [
              ...filteredData.filter((item) => {
                return item[term.key]
                  ?.toLowerCase()
                  .includes(term.search?.toLowerCase())
              }),
            ])
        )
        setData({ ...data, data: filteredData })
        setLoading(false)
        newsletterDataHandler(filteredData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [reload, role, filter])

  return loading ? (
    <Loading />
  ) : (
    <>
      <ListWidget
        title=""
        data={data}
        styles={styles}
        showing={10}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  )
}

export default NewsLetterList
