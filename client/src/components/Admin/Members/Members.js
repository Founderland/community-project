import { useContext, useState } from "react"
import { useHistory, useParams } from "react-router"
import { UserAddIcon, CloudDownloadIcon } from "@heroicons/react/outline"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"
import MembersList from "./MembersList"
import AddMember from "./AddMember"
import MemberProfile from "./MemberProfile"
import NewsLetterList from "./NewsLetterList"
import CsvDownload from "react-json-to-csv"

const Members = () => {
  const history = useHistory()
  const { id } = useParams()
  const { reload, selectedTab, setSelectedTab } = useContext(AdminContext)
  const [newsLetterData, setNewsLetterData] = useState([])
  const [membersData, setMembersData] = useState([])
  const tabs = [
    {
      index: 0,
      name: "Founder",
      role: "founder",
      restricted: "",
    },
    {
      index: 1,
      name: "Investor",
      role: "investor",
      restricted: "",
    },
    {
      index: 2,
      name: "Ally",
      role: "ally",
      restricted: "",
    },
    {
      index: 3,
      name: "Newsletter",
      role: "Newsletter",
      restricted: "",
    },
  ]

  const handleTask = () => {
    history.push("members/id/new")
  }

  const newsletterDataHandler = (val) => {
    setNewsLetterData(val)
  }

  const formatData = (val) => {
    return val.map((el) => {
      let newObj = {
        Name: el.firstName,
        "Last name": el.lastName,
        Email: el.email,
        City: el.city,
        Country: el.country,
      }
      if (tabs[selectedTab].role === "founder") {
        newObj = {
          ...newObj,
          Bio: el.bio,
          Company: el.companyName,
          Website: el.companyLink,
          "Company Bio": el.companyBio,
        }
      }
      return newObj
    })
  }

  return (
    <div className='flex flex-col w-full '>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />

      <section className='flex justify-center bg-white outline-none pt-4 pb-8'>
        {!id ? (
          <div className='w-full px-4 outline-none'>
            {selectedTab === 3 ? (
              <NewsLetterList
                reload={reload}
                role={tabs[selectedTab].role}
                newsletterDataHandler={newsletterDataHandler}
              />
            ) : (
              <MembersList
                reload={reload}
                role={tabs[selectedTab].role}
                setMembersData={setMembersData}
              />
            )}

            <div className='flex '>
              <button className='flex items-center px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white text-mono text-sm'>
                <CloudDownloadIcon className='h-5 w-5' />
                <CsvDownload
                  data={
                    selectedTab === 3 ? newsLetterData : formatData(membersData)
                  }
                  filename={
                    selectedTab === 3
                      ? "newsletter.csv"
                      : `${tabs[selectedTab].role}.csv`
                  }
                />
              </button>

              {selectedTab !== 3 && (
                <button
                  className='flex px-8 py-2 space-x-2 shadow-lg m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white'
                  onClick={() => handleTask()}>
                  <UserAddIcon className='h-5 w-5' />
                  <p className='text-mono text-sm'>Add New</p>
                </button>
              )}
            </div>
          </div>
        ) : id === "new" ? (
          <AddMember role={tabs[selectedTab].role} />
        ) : (
          <MemberProfile />
        )}
      </section>
    </div>
  )
}

export default Members
