import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import ListWidget from './ListWidget'
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router'
import AdminContext from '../../contexts/Admin'
// import AddQuestionForm from './AddQuestion/AddQuestionForm'

const ResponseList = () => {
  let history = useHistory()
  const { view } = useContext(AdminContext)
//   const [showList, setShowList] = useState(true)
   const [listData, setListData] = useState({ data: [], header: [] })
   
   useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await axios.get(`/api/form/founder/response`)
          console.log("RESPONSE RESULT", result.data) 
           if (result.data) {
            console.log("RESPONSE RESULT", result.data) 
            }
              
           
            setListData({
              header: [
                {
                  title: 'UserName',
                  key: 'applicantName',
                  style: 'py-3 px-6 text-left ',
                },
               //  { title: 'Category', key: 'category', style: 'text-left' },
               //  {
               //    title: 'Location',
               //    key: 'type',
               //    style: 'text-left hidden xl:table-cell items-center',
               //  },
                {
                  title: 'Score',
                  key: 'totalScore',
                  style:
                       'text-left'
                },
                { title: 'Actions', key: '-', style: 'text-center' },
              ],
              data: result.data,
              colSize: [
                <colgroup>
                  <col style={{ width: '40vw' }} />
                  <col style={{ width: '10vw' }} />
                  <col style={{ width: '10vw' }} />
                  <col style={{ width: '10vw' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>,
              ],
            })
        } catch (e) {
          console.log(e)
        }
      }
      fetchData()
   }, [ view])
  
   return (
      //  <div> Founders Response</div>
      <div className="w-full flex flex-col ">
         <div className=" flex justify-between items-center mx-2">
         {/* <div className=  {!showList && 'hidden'}  >Founders Response</div> */}
          <div className= " ">Founders Response</div>
          {/* <div
            onClick={() => setShowList(!showList)}
            className=" flex justify-center items-center space-around w-1/2 md:w-auto py-3 px-2 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black"
          >
            {showList ? (
              <PlusIcon className="w-5 h-5 mx-2" />
            ) : (
              <ArrowLeftIcon className="w-5 h-5 mx-2" />
            )}
            {showList ? 'Add new' : 'Back'}
          </div> */}
        </div>
        {/* {showList ? (
          <ListWidget
            data={listData}
            showing={10}
            colSize={listData.colSize}
            cellAlignment={'justify-start'}
          />
        ) : (
          <AddQuestionForm memberType={memberType} />
         )} */}
         <ListWidget
            data={listData}
            showing={10}
            colSize={listData.colSize}
            cellAlignment={'justify-start'}
          />


      </div>
    )
  }
  
  export default ResponseList

  