import Question from "./Question"
import smallLogo from "../../assets/images/smallLogo.svg"
import { useHistory } from "react-router-dom"
import { useState, useContext } from "react"
import { AnswersContext } from "../../contexts/AnswersProvider"
import gif from "../../assets/images/loadingGif.gif"

const FormPage = (props) => {
  const { questions, isFirst, isLast } = props
  const { submitHandler, nextHandler, prev, prevHandler } =
    useContext(AnswersContext)
  const [selected, setSelected] = useState([])
  const [gify, setGify] = useState(false)
  const [selectValidation, setSelectValidation] = useState(true)

  const history = useHistory()

  const submit = async () => {
    submitHandler(true)
    setGify(true)
    const timer = setTimeout(() => {
      let path = `/thankyou`
      history.push(path)
      setGify(false)
      submitHandler(false)
    }, 4000)

    return () => clearTimeout(timer)
  }

  const previous = () => {
    submitHandler(false)
    props.previousStep()
    prevHandler(true)
  }

  const nextClicked = () => {
    nextHandler(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const questionType = questions.filter(
      (item) => item.type === "choice" || item.type === "list"
    )
    if (
      questionType.length <= selected.length ||
      prev ||
      props.questionPreview
    ) {
      props.nextStep()
      setSelected([])
      prevHandler(false)
      setSelectValidation(true)
    } else {
      setSelectValidation(false)
    }
    if (isLast) submit()
  }

  const selectedAnswer = (answer) => {
    selected.push(answer)
    setSelected([...selected])
  }

  return (
    <div>
      {gify && (
        <div classname="absolute w-screen h-screen ">
          <img src={gif} alt="gif" />
          <p className="text-4xl font-monserrat font-semibold m-10">
            You Form is getting Submitted !!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className={
            !gify
              ? "max-h-screen w-screen md:w-full flex justify-center flex-col overflow-y-scroll md:overflow-hidden "
              : "hidden"
          }
        >
          <div className=" flex flex-col justify-between  p-10 h-screen">
            <div className="flex  justify-between md:justify-end mb-7">
              <div className="md:hidden mt-3">
                {" "}
                <img src={smallLogo} alt="logo" className="w-20 pr-5" />{" "}
              </div>

              <div className=" ">
                {/* md:max-w-xs md:pl-24 */}
                <h2 className=" hidden md:flex md:mt-5 text-mono font-semibold md:text-xl lg:text-xl xl:text-2xl md:tracking-wider">
                  DISRUPTING THE PIPELINE FOR INVESTORS{" "}
                </h2>
              </div>
            </div>
            <div>
              {questions.map((question, i) => (
                <Question
                  key={i}
                  {...question}
                  selectedAnswer={selectedAnswer}
                  selectValidation={selectValidation}
                  questionPreview={props.questionPreview}
                />
              ))}
            </div>
            <div className="p-10 ">
              {!isFirst && (
                <button
                  type="button"
                  className="py-2 px-4 xl:py-4 float-left bg-fblue opacity-80 hover:bg-fblue-dark focus:ring-fblue focus:ring-offset-white text-white text-mono w-2/5 md:w-1/3 xl:w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  onClick={previous}
                >
                  Prev
                </button>
              )}
              <button
                type="submit"
                disabled={isLast && props.questionPreview}
                className={
                  "py-2 px-4  xl:py-4 float-right focus:ring-offset-white text-white text-mono w-2/5 md:w-1/3 xl:w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 " +
                  (isLast
                    ? " bg-black  hover:bg-black focus:ring-black"
                    : "bg-fblue hover:bg-fblue-dark focus:ring-fblue") +
                  (isLast && props.questionPreview && " opacity-30")
                }
                onClick={isLast ? handleSubmit : nextClicked}
              >
                {isLast ? "Submit" : "next"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormPage
