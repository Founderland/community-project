import StepWizard from 'react-step-wizard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import FormPage from './Forms/FormPage'
import symbolsVertical from '../assets/images/symbol_vertical_big.png'
import whiteLogo from '../assets/images/twoLinesWhite.svg'
import CategoryItem from './Forms/CategoryItem'
import symbolsHorizontal from '../assets/images/SymbolsHorizontal.png'
// const dumyData = [
//   {
//     _id: "614af929a47c96b7a3decf1e",
//     category: "About You",
//     question: "Name",
//     rank: "Not Important - just for info/further context",
//     type: "open",
//     answers: [
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614af929a47c96b7a3decf1f",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614af997a47c96b7a3decf21",
//     category: "About You",
//     question: "Title/Position",
//     rank: "Not Important - just for info/further context",
//     type: "open",
//     answers: [
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614af997a47c96b7a3decf22",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614af9aaa47c96b7a3decf24",
//     category: "About You",
//     question: "Contact Information",
//     rank: "Not Important - just for info/further context",
//     type: "open",
//     answers: [
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614af9aaa47c96b7a3decf25",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614afa73a47c96b7a3decf27",
//     category: "About You",
//     question:
//       "Do you identify as a woman who has faced obstacles tied to your ethnicity/race and gender in your entrepreneurial journey?",
//     rank: "Very Important - variable is scrutinized",
//     type: "choice",
//     answers: [
//       {
//         answer: "Yes",
//         ideal: "yes",
//         points: 50,
//         notes: "",
//         _id: "614afa73a47c96b7a3decf28",
//       },
//       {
//         answer: "No",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614afa73a47c96b7a3decf29",
//       },
//       {
//         answer: "open",
//         ideal: "yes",
//         points: 0,
//         notes: "",
//         _id: "614afa73a47c96b7a3decf2a",
//       },
//     ],
//     __v: 0,
//   },
//   {
//     _id: "614afc27a47c96b7a3decf2c",
//     category: "About Your Business",
//     question: "Where is your Business registered (based)?",
//     rank: "Vital - Deal Maker or Breaker",
//     type: "choice",
//     answers: [
//       {
//         answer: "Continental Europe",
//         ideal: "yes",
//         points: 50,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf2d",
//       },
//       {
//         answer: "United Kingdom",
//         ideal: "yes",
//         points: 50,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf2e",
//       },
//       {
//         answer:
//           "Not in Europe or the UK but planning on relocating to that area",
//         ideal: "yes",
//         points: 200,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf2f",
//       },
//       {
//         answer: "Not in Europe or the UK",
//         ideal: "no",
//         points: 0,
//         notes: "",
//         _id: "614afc27a47c96b7a3decf30",
//       },
//     ],
//     __v: 0,
//   },
// ];
const Form = ({ match }) => {
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
            .get('http://localhost:3001/api/form/founder/questions')
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
                const catArray = questions.filter(
                    (item) => item.category === cat
                )

                // Finding the highest page number for each category in CatArray
                const maxPageNumber = catArray.reduce(function (prev, current) {
                    return parseInt(prev.categoryPage) >
                        parseInt(current.categoryPage)
                        ? prev
                        : current
                }).categoryPage

                // splitting catArray into different arrays with unique pageNumbers
                for (let i = 1; i <= maxPageNumber; i++) {
                    pageArray.push(
                        catArray.filter((item) => item.categoryPage === i)
                    )
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
    }, [questions])

    //eg:pagesInCategory=[[3],[2],1[]]
    // activeStep = 4
    // setactiveStep(2)
    const getActiveStep = (activeStep) => {
        let sum = 0
        // console.log(pagesInCategory)
        for (let i = 0; i < pagesInCategory.length; i++) {
            sum = sum + pagesInCategory[i]
            if (activeStep <= sum) {
                setactiveStep(i)
                break
            }
        }
    }

    const WizardNav = ({ activeStep }) => (
        <div className=" hidden md:flex flex-col  h-screen  items-center bg-fblue z-10  text-white md:w-3/12">
            <div className="h-3/4 w-full flex items-center justify-center pl-8">
                <ul>
                    {categoryNames.map((item, index) => (
                        <CategoryItem
                            text={item}
                            isActive={activeStep === index}
                        />
                    ))}
                </ul>
            </div>
            <div className="h-1/4 w-2/3 flex items-center  ">
                <img className="text-fpink" src={whiteLogo} alt="logo" />
            </div>
        </div>
    )

    const Symbols = () => (
        <>
            <div className="hidden md:w-1/12 md:flex md:justify-end">
                <img src={symbolsVertical} alt="symbols" />
            </div>
            <div className="md:hidden h-12 items-end fixed bottom-0 z-10">
                <img
                    src={symbolsHorizontal}
                    alt="logo"
                    className="h-full object-cover object-left"
                />
            </div>
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
                                    uniquePageNumber={
                                        pageIndex.toString() +
                                        catIndex.toString()
                                    }
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
