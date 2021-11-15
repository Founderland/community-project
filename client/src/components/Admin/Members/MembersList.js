import { useState, useEffect, useContext, useMemo } from "react"
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
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, reload } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const membersAPI = "/api/users/community/members/"

  //FETCH DATA
  useEffect(() => {
    axios
      .get(membersAPI + role, config)
      .then((res) => {
        const header = {
          header: [
            { title: "Name", key: "name", style: "text-left text-sm" },
            {
              title: "Location",
              key: "location",
              style: "text-center text-sm",
            },
            { title: "Added on", key: "created", style: "text-center text-sm" },
            {
              title: "Notified on",
              key: "notified",
              style: "text-center text-sm",
            },
            {
              title: "Signed up on",
              key: "confirmed",
              style: "text-center text-sm",
            },
            { title: "", key: "-", style: "text-center text-sm" },
          ],
        }
        const data = res.data
        setMembersData(data.data)
        data.data.forEach((element) => {
          if (element.created) {
            element.created = moment(element.created).format("DD/M/YYYY")
          }
          if (element.notified) {
            element.notified = moment(element.notified).format("DD/M/YYYY")
          }
          if (element.confirmed) {
            element.confirmed = moment(element.confirmed).format("DD/M/YYYY")
          }
          element.name = element.firstName + " " + element.lastName
          element.location = element.city + ", " + element.country
        })
        setData({ ...header, ...data })
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [reload, role])

  return loading ? (
    <Loading />
  ) : (
    <ListWidget title='' data={data} styles={styles} showing={10} />
  )
}

export default MembersList
