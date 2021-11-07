import { useState, useEffect, useContext } from "react"
import AdminContext from "../../../contexts/Admin"
import ListWidget from "../Widgets/ListWidget"
import Loading from "../Widgets/Loading"
import TootlTip from "../Widgets/Tooltip"
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

const NewsLetterList = ({ role, newsletterDataHandler }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const { config, reload } = useContext(AdminContext)

  //FETCH DATA
  useEffect(() => {
    axios
      .get("/api/applicants/response/newsletter", config)
      .then((res) => {
        const header = {
          header: [
            { title: "Name", key: "firstName", style: "text-right text-sm" },
            { title: " ", key: "lastName", style: "text-left text-sm" },
            { title: "Email", key: "email", style: "text-center text-sm" },
            {
              title: "Interest",
              key: "interests",
              style: "text-center text-sm",
            },
            {
              title: "Subscribed On",
              key: "subscriptionDate",
              style: "text-center text-sm",
            },
          ],
        }

        const data = res
        data.data.forEach((element) => {
          if (element.subscriptionDate) {
            element.subscriptionDate = moment(element.subscriptionDate).format(
              "DD/M/YYYY"
            )
          }
        })
        setData({ ...header, ...data })
        setLoading(false)
        newsletterDataHandler(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [reload, role])

  return loading ? (
    <Loading />
  ) : (
    <>
      <ListWidget title="" data={data} styles={styles} showing={10} />
    </>
  )
}

export default NewsLetterList
