import { useState, useEffect, useContext, useMemo } from "react"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import axios from "axios"
import ListWidget from "../Widgets/ListWidget"
const styles = {
  notimportantjustforinfofurthercontext:
    "bg-gray-200 text-gray-600 py-1 px-3 rounded-full text-xs text-center w-max flex justify-center items-center",
  vitaldealmakerorbreaker:
    "bg-orange-200 text-orange-600 py-1 px-3 rounded-full text-xs text-center w-max flex justify-center items-center",
  veryimportantvariableisscrutinized:
    "bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs text-center w-max flex justify-center items-center",
}

const FormsList = ({ role, reload }) => {
  const [loading, setLoading] = useState(true)
  const { token, selectedTab } = useContext(AdminContext)

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const formsURL = `/api/form/${role}/questions`

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
        const result = await axios.get(formsURL, config)
        if (typeof result.data === "string") return
        if (result.data)
          setListData({
            ...listData,
            header: [
              {
                title: "Question",
                key: "question",
                style: "text-left table-cell text-sm break-normal md:break-all",
              },
              {
                title: "Category",
                key: "category",
                style: "text-left table-cell text-xs w-20",
              },
              {
                title: "Type",
                key: "type",
                style: "text-left hidden md:table-cell text-xs w-20",
              },
              {
                title: "Rank",
                key: "rank",
                style:
                  role === "founder"
                    ? "flex justify-center items-center hidden lg:table-cell text-sm w-40"
                    : "hidden",
              },
              {
                title: "Actions",
                key: "-",
                style: "text-xs text-center w-20",
              },
            ],
            data: result.data,
          })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [reload, selectedTab])

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
