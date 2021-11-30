import { useState, useEffect, useContext } from "react"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import axios from "axios"
import ListWidget from "../Widgets/ListWidget"
const styles = {
  info: "mx-auto bg-gray-200 text-gray-600 py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl",
  vital:
    "mx-auto bg-green-200 text-green-600 py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl",
  important:
    "mx-auto bg-orange-200 text-orange-600 py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl",
  moderate:
    "mx-auto bg-yellow-200 text-yellow-600 py-1 px-2 text-xs text-center w-max flex justify-center items-center rounded-xl",
}

const FormsList = ({ role, reload }) => {
  const [loading, setLoading] = useState(true)
  const { config, selectedTab } = useContext(AdminContext)
  const [filter, setFilter] = useState([
    { key: "question", search: "", show: false, type: "text" },
    { key: "category", search: "", show: false, type: "text" },
    { key: "type", search: "", show: false, type: "text" },
    { key: "rank", search: "", show: false, type: "text" },
  ])
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
        let filteredData = [...result.data]
        filter.forEach(
          (term) =>
            (filteredData = [
              ...filteredData.filter((item) => {
                if (role === "founder") {
                  return item[term.key]
                    .toLowerCase()
                    .includes(term.search.toLowerCase())
                } else {
                  return term.key !== "rank"
                    ? item[term.key]
                        .toLowerCase()
                        .includes(term.search.toLowerCase())
                    : item
                }
              }),
            ])
        )
        let header = [
          {
            title: "Question",
            key: "question",
            style: "text-left table-cell text-sm break-normal md:break-all",
          },
          {
            title: "Category",
            key: "category",
            style: "text-center table-cell text-xs w-20",
          },
          {
            title: "Type",
            key: "type",
            style: "text-center hidden md:table-cell text-xs w-20",
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
        ]
        setListData({
          ...listData,
          data: [...filteredData],
          header: [...header],
        })
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [reload, selectedTab, filter])
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

export default FormsList
