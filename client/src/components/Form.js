import StepWizard from "react-step-wizard"
import axios from "axios"
import { useEffect, useState } from "react"
import FormPage from "./Forms/FormPage"
import symbolsVertical from "../assets/images/symbol_vertical_big.png"
import whiteLogo from "../assets/images/twoLinesWhite.svg"
import CategoryItem from "./Forms/CategoryItem"
import symbolsHorizontal from "../assets/images/SymbolsHorizontal.png"
import { AnswersContext } from "../contexts/AnswersProvider"

import { useContext } from "react"

const Form = ({ match }) => {
  const { submit } = useContext(AnswersContext)
  // console.log(match);
  // memberType is grabbed from the parameter specified on the ApplicantsDispatcher Link and can be either : founder, investor, ally or newsletter.
  // const { memberType } = match.params;

  const [questions, setQuestions] = useState([])
  const [activeStep, setactiveStep] = useState(0)

  const [categoryNames, setCategoryNames] = useState([])
  const [pagesInCategory, setPagesInCategory] = useState([])
  const [formatedQuestions, setFormatedQuestions] = useState([])

  useEffect(() => {
    axios
      .get("/api/form/founder/questions")
      .then((res) => {
        setQuestions(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (questions.length > 0) {
      const QuestionsArray = []
      const pagesInEachCategory = []

      //  Finding the unique category value in the question array of objects
      const uniqueCategories = [
        ...new Set(questions?.map((item) => item.category)),
      ]

      // Looping through each unique category
      for (const cat of uniqueCategories) {
        const pageArray = []

        // Filtering unique Category items and saving it to CatArray
        const catArray = questions.filter((item) => item.category === cat)

        // Finding the highest page number for each category in CatArray
        const maxPageNumber = catArray.reduce(function (prev, current) {
          return parseInt(prev.categoryPage) > parseInt(current.categoryPage)
            ? prev
            : current
        }).categoryPage

        // splitting catArray into different arrays with unique pageNumbers
        for (let i = 1; i <= maxPageNumber; i++) {
          pageArray.push(catArray.filter((item) => item.categoryPage === i))
        }

        //output Array:
        // QuestionsArray = [cat1,cat2,cat3]
        // cat1 = [[pg1],[pg2]]
        // cat2 = [[pg1],[pg2]]
        // cat3 = [[pg1],[pg2]]
        // pg1 = question object with page 1 ...
        QuestionsArray.push(pageArray)

        pagesInEachCategory.push(maxPageNumber)
      }
      setCategoryNames(uniqueCategories)
      setPagesInCategory(pagesInEachCategory)
      setFormatedQuestions(QuestionsArray)
    }
  }, [])

  const WizardNav = ({ activeStep }) => (
    <div className=" hidden md:flex flex-col  h-screen  items-center bg-fblue z-10  text-white md:w-3/12">
      <div
        className={
          !submit
            ? "h-3/4 w-full flex items-center justify-center pl-8"
            : "hidden"
        }
      >
        <ul>
          {categoryNames.map((item, index) => (
            <CategoryItem text={item} isActive={activeStep === index} />
          ))}
        </ul>
      </div>
      <div className="h-1/4 w-2/3 flex items-center">
        <img className="text-fpink" src={whiteLogo} alt="logo" />
      </div>
    </div>
  )

  const Symbols = () => (
    <>
      {/* setactiveStep(res.activeStep) */}
      <StepWizard
        initialStep={1}
        onStepChange={(res) => getActiveStep(res.activeStep)}
        className="h-screen md:w-8/12 mb-8"
      >
        {formatedQuestions.map((catItems, catIndex, catArray) =>
          catItems.map((pagesItems, pageIndex, pageArray) => (
            <FormPage
              questionPreview={questionPreview}
              questions={pagesItems}
              isFirst={pageIndex === 0 && catIndex === 0}
              isLast={
                pageIndex === pageArray.length - 1 &&
                catIndex === catArray.length - 1
              }
              uniquePageNumber={pageIndex.toString() + catIndex.toString()}
            />
          ))
        )}
      </StepWizard>
    </>
  )

  return (
    <div className=" m-0 flex flex-row-reverse w-screen items-end h-screen overflow-hidden">
      <Symbols />
      {questions && (
        <>
          {/* setactiveStep(res.activeStep) */}
          <StepWizard
            initialStep={1}
            onStepChange={(res) => getActiveStep(res.activeStep)}
            className="h-screen md:w-8/12 mb-8"
          >
            {formatedQuestions.map((catItems, catIndex, catArray) =>
              catItems.map((pagesItems, pageIndex, pageArray) => (
                <FormPage
                  questions={pagesItems}
                  isFirst={pageIndex === 0 && catIndex === 0}
                  isLast={
                    pageIndex === pageArray.length - 1 &&
                    catIndex === catArray.length - 1
                  }
                  uniquePageNumber={pageIndex.toString() + catIndex.toString()}
                />
              ))
            )}
          </StepWizard>
        </>
      )}
      <WizardNav activeStep={activeStep} />
    </div>
  )
}

export default Form
