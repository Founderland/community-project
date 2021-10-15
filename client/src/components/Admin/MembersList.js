import { useState, useEffect, useContext } from "react"
import AdminContext from "../../contexts/Admin"
import ListWidget from "./ListWidget"
import Loading from "../Loading"
import axios from "axios"

const MembersList = ({ role, reload }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { setModalMessage, setIModal, token } = useContext(AdminContext)
  const membersAPI = "/api/users/community/"

  //FOUNDERS
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    axios
      .get(membersAPI + role, config)
      .then((res) => {
        const header = {
          header: [
            { title: "Name", key: "firstName", style: "" },
            { title: " ", key: "lastName", style: "" },
            { title: "Email", key: "email", style: "" },
            { title: "Role", key: "role", style: "sm:block hidden" },
            { title: "Added on", key: "dateCreated", style: "" },
            { title: "Actions", key: "-", style: "" },
          ],
        }
        const data = res.data
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
  }, [reload])

  return loading ? (
    <Loading />
  ) : (
    <ListWidget
      title={"current registered " + role}
      data={data}
      showing={5}
      cellAlignment={"justify-center"}
    />
  )
}

export default MembersList
