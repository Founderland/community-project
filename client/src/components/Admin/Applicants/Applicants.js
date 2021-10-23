import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
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
      component: !id ? (
        <div className="w-full px-4">
          <ApplicantsList status={category} role="founder" reload={reload} />
        </div>
      ) : (
        <Application />
      ),
    },
    {
      index: 1,
      name: "Investor",
      role: "investor",
      component: !id ? (
        <div className="w-full px-4 outline-none">
          <ApplicantsList status={category} role="investor" reload={reload} />
        </div>
      ) : (
        <Application />
      ),
    },
    {
      index: 2,
      name: "Ally",
      role: "ally",
      component: !id ? (
        <div className="w-full px-4 outline-none">
          <ApplicantsList status={category} role="ally" reload={reload} />
        </div>
      ) : (
        <Application />
      ),
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
      <tab className="flex justify-center bg-white outline-none md:border border-black pt-4 pb-8">
        {tabs[selectedTab].component}
      </tab>
    </div>
  )
}

export default Applicants
