import { useEffect, useState, useContext } from "react"
import axios from "axios"
import ListWidget from "./ListWidget"
import {
  ArrowLeftIcon,
  PencilAltIcon,
  PlusIcon,
} from "@heroicons/react/outline"
import AdminContext from "../../contexts/Admin"
import AddQuestionForm from "./AddQuestion/AddQuestionForm"

const QuestionsList = () => {
  const { memberType, selectedItem, setSelectedItem } = useContext(AdminContext)
  const [showList, setShowList] = useState(true)
  const [listData, setListData] = useState({ data: [], header: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`/api/form/${memberType}/questions`)
        if (typeof result.data === "string") return
        if (result.data)
          setListData({
            header: [
              {
                title: "Question",
                key: "question",
                style: "p-3 text-left ",
              },
              { title: "Category", key: "category", style: "text-left" },
              {
                title: "Type",
                key: "type",
                style: "text-left hidden xl:table-cell items-center",
              },
              {
                title: "Rank",
                key: "rank",
                style:
                  memberType === "founder"
                    ? "text-left hidden xl:table-cell items-center"
                    : "hidden",
              },
              { title: "Actions", key: "-", style: "  text-center" },
            ],
            data: result.data,
            colSize: [
              <colgroup>
                <col style={{ width: "40vw" }} />
                <col style={{ width: "10vw" }} />
                <col style={{ width: "8vw" }} />
              </colgroup>,
            ],
          })
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
    // setShowList(true);
  }, [memberType, showList])

  return (
    <div className='w-full flex flex-col text-xl '>
      <div className=' flex justify-between items-center mx-2 '>
        <div className={!showList && "hidden"}>Questions List</div>
        <div
          onClick={() => {
            setShowList(!showList)
            setSelectedItem(null)
          }}
          className=' flex justify-center items-center space-around text-lg w-1/2 md:w-auto py-3  px-5 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black'>
          {showList && !selectedItem ? (
            <PlusIcon className='w-5 h-5 mr-3 ' />
          ) : (
            <ArrowLeftIcon className='w-5 h-5 mr-3 ' />
          )}
          {showList && !selectedItem ? "Add new" : "Back"}
        </div>
      </div>
      {showList ? (
        <ListWidget
          data={listData}
          showing={10}
          colSize={listData.colSize}
          cellAlignment={"justify-start"}
          button1={<PencilAltIcon className='w-4' />}
          setShowList={() => setShowList(false)}
        />
      ) : (
        <AddQuestionForm functionality={selectedItem && "edit"} />
      )}
    </div>
  )
}

export default QuestionsList
