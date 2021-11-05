import { useParams } from "react-router-dom"
import { useContext } from "react"
import ApplicantsList from "./ApplicantsList"
import Application from "./Application"
import AdminContext from "../../../contexts/Admin"
import Tabs from "../Widgets/Tabs"

const Applicants = ({ status }) => {
  const { selectedTab, setSelectedTab, reload } = useContext(AdminContext)
  const { id, category } = useParams()
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
    <div className="w-full flex flex-col ">
      <Tabs
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        id={id}
      />
      <section className="flex justify-center bg-white outline-none pt-4 pb-8">
        {!id ? (
          <div className="w-full px-4 outline-none">
            <ApplicantsList
              status={category}
              role={tabs[selectedTab].role}
              reload={reload}
            />
          </div>
        ) : (
          <Application />
        )}
      </section>
    </div>
  )
}

export default Applicants
