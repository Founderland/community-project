const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  // LOOP THROUGH TAB DATA
  return (
    <>
      <div className={`w-min flex p-1 bg-black outline-none justify-start`}>
        {tabs.map((tab) => (
          <div
            className={`w-32 px-1 py-0.5 text-sm text-mono tracking-wide font-medium outline-none flex justify-center items-center ${
              selectedTab === tab.index
                ? "font-bold bg-white shadow"
                : "text-white hover:bg-white hover:bg-opacity-20"
            }`}
            onClick={() => setSelectedTab(tab.index)}
          >
            <p>{tab.name}</p>
          </div>
        ))}
      </div>
      <div className="w-full border mt-0 border-t border-5 border-black outline-none"></div>
    </>
  )
}

export default Tabs
