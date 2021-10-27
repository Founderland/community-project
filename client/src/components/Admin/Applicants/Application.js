import { useContext, useMemo, useEffect, useState } from "react"
import { useParams } from "react-router"
import axios from "axios"
import moment from "moment"
import AdminContext from "../../../contexts/Admin"
import Loading from "../Widgets/Loading"
import ComponentModal from "../Widgets/ComponentModal"
import ApproveApplicant from "./ApproveApplicant"
import ApplicationComments from "./ApplicationComments"
import Tooltip from "../Widgets/Tooltip"
import { Link } from "react-router-dom"
import { ChevronRightIcon } from "@heroicons/react/outline"

const styles = {
  founder: { bg: "fblue ", text: "white ", border: "fblue " },
  investor: { bg: "fred ", text: "black ", border: "fred " },
  ally: { bg: "flime ", text: "black ", border: "flime " },
  low: { bg: "red-200 ", text: "red-900 " },
  med: { bg: "yellow-200 ", text: "yellow-900 " },
  high: { bg: "green-200 ", text: "green-900 " },
  info: {
    bg: "gray-200",
    text: "gray-600 border-opacity-20",
    border: "gray-900",
  },
  vital: { bg: "green-200", text: "green-600", border: "green-900" },
  important: { bg: "orange-200", text: "orange-400", border: "orange-900" },
  moderate: { bg: "yellow-200", text: "yellow-600", border: "yellow-900" },
}
const responseURL = "/api/applicants/response/"

const Application = () => {
  const { id } = useParams()
  const { token, setCModal } = useContext(AdminContext)
  const config = useMemo(() => {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }, [token])
  const [data, setData] = useState({ categories: "", data: "", task: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //GET DATA FROM DB WITH APPLICATIONID FROM URL
  useEffect(() => {
    axios
      .get(responseURL + id, config)
      .then((res) => {
        if (res.data) {
          const categories = res.data.answerData
            .map((item) => item.category)
            .filter((item, i, self) => i === self.indexOf(item))
          setData({ ...data, categories: categories, data: res.data })
          setLoading(false)
        } else {
          setError("No application found with this ID")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const updateApplication = (status) => {
    setData((prev) => ({ ...prev, task: status }))
    setCModal(true)
  }

  return (
    <section className="h-full py-1 bg-white w-full lg:w-5/6 px-4 mx-auto mt-6">
      {loading ? (
        <Loading />
      ) : error ? (
        error
      ) : (
        <>
          <ComponentModal>
            <ApproveApplicant data={data} />
          </ComponentModal>
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg border-0">
            <div
              className={`border-${
                styles[data?.data.role]?.border
              } border-t-8 mb-0 pl-6 pr-4 py-6`}
            >
              <div className="text-center flex justify-between">
                <div
                  className={`text-2xl font-bold uppercase flex flex-col justify-between`}
                >
                  {data.data.firstName + " " + data.data.lastName}
                  <span
                    className={`mx-auto bg-${
                      styles[data?.data.role]?.bg
                    }  py-1 px-2 text-${styles[data?.data.role]?.text} text-xs`}
                  >
                    {data.data.role}
                  </span>
                </div>
                <div className=" hidden md:block flex-grow flex flex-col justify-center items-center"></div>
                <div className="flex items-center">
                  {data.data.totalScore ? (
                    <div
                      className={`bg-${
                        data.data.totalScore > 75 && data.data.totalScore <= 150
                          ? styles.med.bg + "text-" + styles.med.text
                          : data.data.totalScore > 150
                          ? styles.high.bg + "text-" + styles.high.text
                          : styles.low.bg + "text-" + styles.low.text
                      } font-bold text-2xl p-4 max-h-16 shadow-xl rounded-full outline-none focus:outline-none`}
                    >
                      {data.data.totalScore}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="w-full px-4 pt-2 grid md:grid-cols-5 sm:grid-cols-2 text-xs">
              <div className="mb-2">
                <p className=" text-xs text-grotesk">Submitted on</p>
                <p className={`font-bold text-sm`}>
                  {moment(data.data.submissionDate).format("DD/M/YYYY HH:mm")}
                </p>
              </div>
              {data.data.evaluatedOn && (
                <div className="mb-2">
                  <p className=" text-xs text-grotesk">Last reviewed on</p>
                  <p className={`font-bold text-sm`}>
                    {moment(data.data.evaluatedOn).format("DD/M/YYYY")}
                  </p>
                </div>
              )}
              {data.data.status !== "new" && (
                <>
                  <div className="mb-2">
                    <p>&nbsp;</p>
                    <span
                      className={`mx-auto ${
                        data.data.status === "approved"
                          ? "bg-green-200 text-green-900 border-green-900 border"
                          : data.data.status === "pending"
                          ? "bg-yellow-200 text-yellow-900 border-yellow-900 border"
                          : "bg-red-200 text-red-900 border-red-900 border"
                      } py-1 px-2 text-xs uppercase`}
                    >
                      {data.data.status}
                    </span>
                  </div>
                  <div className="mb-2">
                    <p className=" text-xs text-grotesk">
                      {data.data.status === "reviewed"
                        ? "Last reviewed by"
                        : data.data.status === "approved"
                        ? "Approved by"
                        : "Rejected by"}
                    </p>
                    <p className={`font-bold text-sm`}>
                      {data.data.evaluatedBy}
                    </p>
                  </div>
                </>
              )}
              {data.data.memberId && (
                <div className="mb-2">
                  <p className=" text-xs text-grotesk">&nbsp;</p>
                  <p className={`font-bold text-sm`}>
                    <Link
                      to={`/admin/members/id/${data.data.memberId}`}
                      className="flex px-2 text-xs"
                    >
                      <p>Go to Member Profile</p>
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>
                  </p>
                </div>
              )}
            </div>
            <hr
              className={`mt-6 border-b-1 border-${
                styles[data.data.role].border
              }`}
            />
            <div
              className={`px-4 pb-6 divide-y divide-${
                styles[data.data.role].border
              }`}
            >
              {/*LOOP THROUGH CATEGORIES OF QUESTIONS */}
              {data.categories.map((category, i) => (
                <div key={category}>
                  <h6 className="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    {category}
                  </h6>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3">
                    {data.data.answerData
                      .filter((item) => item.category === category)
                      .map((item, i) => {
                        return (
                          <div key={item.question + i} className="w-full px-4">
                            <div className=" w-full mb-3">
                              <div className=" uppercase text-gray-400 text-xs font-bold mb-2 ">
                                {item.question}
                              </div>
                              <div
                                className={`border-l-4 border-${
                                  styles[item.rank]?.text
                                } px-3 py-3 bg-white text-lg w-full ease-linear transition-all duration-150`}
                              >
                                {item.answer_value}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              ))}
            </div>
            <ApplicationComments data={data} styles={styles} />
            <footer className="p-4 mt-2">
              {data.data.status === "new" || data.data.status === "pending" ? (
                <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
                  <button
                    class="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-fred-300 transition duration-200 hover:bg-fred-800 text-white mb-4"
                    onClick={() => updateApplication("rejected")}
                  >
                    Reject
                  </button>
                  <button
                    class="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                    onClick={() => updateApplication("approved")}
                  >
                    Approve
                  </button>
                </div>
              ) : data.data.status === "rejected" ? (
                <div className="px-4 pt-6 flex flex-col-reverse sm:flex-row items-center justify-around ">
                  <button
                    class="px-8 py-2 w-full shadow-lg sm:w-1/4 bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
                    onClick={() => updateApplication("approved")}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                ""
              )}
            </footer>
          </div>
        </>
      )}
    </section>
  )
}

export default Application
