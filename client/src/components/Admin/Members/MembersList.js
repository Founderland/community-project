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

const MembersList = ({ role, reload }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { setModalMessage, setIModal, token } = useContext(AdminContext)
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
            { title: "Name", key: "firstName", style: "text-right" },
            { title: " ", key: "lastName", style: "text-left" },
            { title: "Email", key: "email", style: "text-center" },
            { title: "Added on", key: "created", style: "text-center" },
            { title: "Notified on", key: "notified", style: "text-center" },
            { title: "Signed up on", key: "confirmed", style: "text-center" },
            { title: "", key: "-", style: "text-center" },
          ],
        }
        const data = res.data
        data.data.forEach((element) => {
          if (element.created) {
            element.created = moment(element.created).format("DD/M/YYYY hh:mm")
          }
          if (element.notified) {
            element.notified = moment(element.notified).format(
              "DD/M/YYYY hh:mm"
            )
          }
          if (element.confirmed) {
            element.confirmed = moment(element.confirmed).format(
              "DD/M/YYYY hh:mm"
            )
          }
        })
        setData({ ...header, ...data })
        setLoading(false)
      })
      .catch((err) => {
        setModalMessage({
          icon: "info",
          title: "Error loading the database set",
          message: "Sorry, something went wrong",
        })
        setIModal(true)
      })
  }, [reload, role, setIModal, setModalMessage, config])

  return loading ? (
    <Loading />
  ) : (
    <ListWidget title="" data={data} styles={styles} showing={5} />
  )
}

export default MembersList
