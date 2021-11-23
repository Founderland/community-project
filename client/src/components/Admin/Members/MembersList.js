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
  founder:
    "bg-fblue bg-opacity-50 text-blue-900 py-1 px-3 rounded-full text-xs",
  investor: "bg-fred bg-opacity-50 text-red-900 py-1 px-3 rounded-full text-xs",
  ally: "bg-flime bg-opacity-50 py-1 px-3 rounded-full text-xs",
  sadmin: "bg-fred bg-opacity-50 py-1 px-3 rounded-full text-xs",
  admin: "bg-fblue bg-opacity-50 py-1 px-3 rounded-full text-xs",
  user: "bg-fpink bg-opacity-50 py-1 px-3 rounded-full text-xs",
}

const MembersList = ({ role, setMembersData }) => {
  const [data, setData] = useState({
    header: [
      { title: "Name", key: "name", style: "text-left text-sm" },
      {
        title: "Location",
        key: "location",
        style: "text-center text-sm",
      },
      { title: "Added on", key: "createdOn", style: "text-center text-sm" },
      {
        title: "Notified on",
        key: "notifiedOn",
        style: "text-center text-sm",
      },
      {
        title: "Signed up on",
        key: "confirmedOn",
        style: "text-center text-sm",
      },
      { title: "", key: "-", style: "text-center text-sm" },
    ],
    data: [],
  })
  const [loading, setLoading] = useState(true)
  const { config, reload } = useContext(AdminContext)
  const membersAPI = "/api/users/community/members/"
  const [filter, setFilter] = useState([
    { key: "name", search: "", show: false, type: "text" },
    { key: "location", search: "", show: false, type: "text" },
  ])
  //FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(membersAPI + role, config)
        result.data.data.forEach((element) => {
          if (element.created) {
            element.createdOn = moment(element.created).format("DD/M/YYYY")
          }
          if (element.notified) {
            element.notifiedOn = moment(element.notified).format("DD/M/YYYY")
          }
          if (element.confirmed) {
            element.confirmedOn = moment(element.confirmed).format("DD/M/YYYY")
          }
          element.name = element.firstName + " " + element.lastName
          element.location = element.city.length ? element.city : ""
          element.location += element.country.length
            ? ", " + element.country
            : ""
        })
        let filteredData = [...result.data.data]
        filter.forEach(
          (term) =>
            (filteredData = [
              ...filteredData.filter((item) =>
                item[term.key].toLowerCase().includes(term.search.toLowerCase())
              ),
            ])
        )
        setMembersData([...filteredData])
        setData({ ...data, data: [...filteredData] })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [reload, role, filter])

  return loading ? (
    <Loading />
  ) : (
    <ListWidget
      title=""
      data={data}
      styles={styles}
      showing={10}
      filter={filter}
      setFilter={setFilter}
    />
  )
}

export default MembersList
