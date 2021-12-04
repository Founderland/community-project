import { useParams } from "react-router-dom"
import { useContext } from "react"
import ApplicantsList from "./ApplicantsList"
import Application from "./Application"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"

const Applicants = () => {
  const { selectedTab, setSelectedTab } = useContext(AdminContext)
  const { id } = useParams()
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
  ]

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
          <ApplicantsList role={tabs[selectedTab].role} />
        ) : (
          <Application />
        )}
      </section>
    </>
  )
}

export default Applicants
