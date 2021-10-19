import { useState, useEffect, useContext, useMemo } from "react"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import axios from "axios"
import ListWidget from "../Widgets/ListWidget"
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
  disabledDiv: "group hover:bg-gray-300",
  disabledInput: "bg-gray-200 group-hover:bg-gray-300 placeholder-gray-500",
  enabledDiv: "bg-blue-200 ",
  enabledInput: "bg-blue-200 placeholder-gray-500",
}

const FormsList = ({ role, reload }) => {
  const [loading, setLoading] = useState(true)
  const { token } = useContext(AdminContext)

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const formsURL = "/api/applicants/response/"

  const [listData, setListData] = useState({
    data: [],
    header: [],
    colSize: [
      <colgroup>
        <col style={{ width: "40vw" }} />
        <col style={{ width: "10vw" }} />
        <col style={{ width: "8vw" }} />
      </colgroup>,
    ],
  })

  //FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/form/${role}/questions`, config)
        if (typeof result.data === "string") return
        if (result.data)
          setListData({
            ...listData,
            header: [
              {
                title: "Question",
                key: "question",
                style: "p-3 text-left text-sm",
              },
              {
                title: "Category",
                key: "category",
                style: "text-left text-md",
              },
              {
                title: "Type",
                key: "type",
                style: "text-left hidden xl:table-cell items-center text-md",
              },
              {
                title: "Rank",
                key: "rank",
                style:
                  role === "founder"
                    ? "text-left hidden xl:table-cell items-center text-sm"
                    : "hidden",
              },
              { title: "Actions", key: "-", style: "  text-center" },
            ],
            data: result.data,
          })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [reload])

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

export default FormsList
