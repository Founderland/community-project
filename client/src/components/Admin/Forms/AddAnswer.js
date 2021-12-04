import { PlusIcon } from "@heroicons/react/outline"
import { useContext } from "react"
import { useRef } from "react"
import AdminContext from "../../../contexts/Admin"

const AddAnswer = ({
  setNewAnswer,
  newAnswer,
  handleNewAnswer,
  memberType,
}) => {
  const addField = useRef()
  const { user } = useContext(AdminContext)
  return user.role.includes("admin") ? (
    <>
      <div className="relative flex flex-col w-full p-3">
        <div className="w-full px-2">
          <label
            HtmlFor="newAnswer"
            className="block uppercase tracking-wide text-grey-darker text-sm font-bold mb-2"
          >
            Answer Options
          </label>
        </div>
        <div className=" flex flex-col md:flex-row w-full px-2">
          <div className="w-full md:w-9/12 mb-2 mt-2 px-2">
            <label
              HtmlFor="newAnswer"
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            >
              Answer
            </label>
            <input
              type="text"
              id="newAnswer"
              className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border py-3 px-4 mb-2 mt-2 shadow-md"
              placeholder="New answer"
              ref={addField}
              value={newAnswer.answer}
              onChange={(e) => {
                const value = e.target.value.trimStart()
                setNewAnswer({
                  ...newAnswer,
                  answer: value.replace(value[0], value[0]?.toUpperCase()),
                })
              }}
            />
          </div>
          {memberType === "founder" && (
            <>
              <div className="w-full md:w-2/12 mb-2 mt-2 px-2">
                <label
                  HtmlFor="newAnswer"
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                >
                  Score
                </label>
                <input
                  type="number"
                  id="score"
                  className="appearance-none outline-none block w-full bg-grey-lighter text-grey-darker border py-3 px-4 mb-2 mt-2 shadow-md"
                  placeholder="0"
                  value={newAnswer.points}
                  onFocus={(e) => (e.target.value = "")}
                  onChange={(e) =>
                    setNewAnswer({
                      ...newAnswer,
                      points: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="w-full flex flex-col items-center md:w-2/12 mb-2 mt-2 px-2">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                  Ideal?
                </label>
                <input
                  type="checkbox"
                  className=" lg:w-1/6 w-5 h-5 "
                  checked={newAnswer.ideal}
                  onChange={() =>
                    setNewAnswer({
                      ...newAnswer,
                      ideal: !newAnswer.ideal,
                    })
                  }
                />
              </div>
            </>
          )}
        </div>

        <div className="absolute top-0 right-0 flex justify-center items-center w-max p-2">
          <button
            type="button"
            className="flex justify-center items-center space-x-4 px-8 py-2 w-full shadow bg-flime transition duration-200 hover:bg-fblue hover:text-white mb-4"
            onClick={() => {
              if (addField.current.value.length === 0) {
                addField.current.focus()
              } else {
                handleNewAnswer(addField)
                addField.current.focus()
              }
            }}
          >
            <PlusIcon className="h-4 w-4" />{" "}
            <p className="hidden md:block md:text-sm">Add Answer</p>
          </button>
        </div>
      </div>
    </>
  ) : (
    ""
  )
}

export default AddAnswer
