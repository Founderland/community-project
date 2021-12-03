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
  const { reload, selectedTab, setSelectedTab, user } = useContext(AdminContext)
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
    <>
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <section className="relative h-full w-full flex md:px-4  items-center flex-col bg-white outline-none overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-blue-100 scrollbar-thumb-fblue">
        {!id ? (
          <>
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
            <div className="absolute md:flex bottom-0 md:bottom-5 right-0 md:left-4 space-x-2">
              <button className="flex px-8 py-2 w-52 space-x-2 shadow-xl m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white">
                <CloudDownloadIcon className="h-5 w-5" />
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
              {selectedTab !== 3 && user.role.includes("admin") && (
                <button
                  className="flex px-8 py-2 w-52 space-x-2 shadow-xl m-2 bg-flime transition duration-200 hover:bg-fblue hover:text-white"
                  onClick={() => handleTask()}
                >
                  <UserAddIcon className="h-5 w-5" />
                  <p className="text-mono text-sm">Add New</p>
                </button>
              )}
            </div>
          </>
        ) : id === "new" ? (
          <div className="relative self-center flex flex-col w-full xl:w-5/6 2xl:w-4/6 pb-6 shadow-lg border-0">
            <AddMember role={tabs[selectedTab].role} />
          </div>
        ) : (
          <MemberProfile />
        )}
      </section>
    </>
  )
}

export default Members
