import { useEffect, useState, useContext, useMemo } from "react"
import axios from "axios"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"

const eventsUrl = "/api/events/"

const EventsList = ({ state }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, reload, selectedTab } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])

  useEffect(() => {
    axios
      .get(eventsUrl + state, config)
      .then((res) => {
        console.log(res)
        setData(res.data.data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [reload, selectedTab])

  return loading ? (
    <Loading />
  ) : (
    <div>
      List of {state} Events ({data?.length})
    </div>
  )
}

export default EventsList
