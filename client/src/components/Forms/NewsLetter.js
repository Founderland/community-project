import React, { useState } from "react"
import axios from "axios"
import banner from "../../assets/images/bannerSymbol.png"
import logo from "../../assets/images/singleLineLogo.svg"
const Questions = [
  {
    question: "First Name",
    key: "firstName",
    type: "open",
  },
  {
    question: "Last Name",
    key: "lastName",
    type: "open",
  },
  {
    question: "What's your email address?",
    key: "email",
    type: "open",
  },
  {
    question: "What interests you most about Founderland?",
    key: "interests",
    type: "single choice",
    answers: [
      "News about women of colour founders and their startup success stories",
      "I'm interested in supporting women of colour founders in Europe as a partner or sponsor",
      "Events",
      "Jobs offered by diverse founders",
      "Learning about funding opportunities and microgrants",
      "Educational resources",
      "Curated deal flow for investors",
      "other",
    ],
  },
  {
    question:
      "Founderland is committed to protecting and respecting your privacy, and we’ll only use your personal information to administer your account and to provide the products and services you requested from us.",
    key: "consent",
    type: "single choice",
    answers: [
      "I agree to allow Founderland contact me, store and process my personal data (You can unsubscribe at any time )",
      "I do not agree to allow Founderland to contact me, store and process my personal data.",
    ],
  },
]

const NewsLetter = () => {
  const [answerValue, setAnswerValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interests: "",
    consent: "",
  })
  const [submit, setSubmit] = useState("Submit")
  const changeHandler = (value, index) => {
    setAnswerValue((prev) => ({ ...prev, [index]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmit("Submitting")
      if (answerValue.consent.search("I agree")) {
        await Promise.reject(new Error("You need to agree to submit"))
      }
      const response = await axios.post("/api/applicants/response/newsletter", {
        firstName: answerValue.firstName,
        lastName: answerValue.lastName,
        email: answerValue.email,
        interests:
          answerValue.interests === "other"
            ? answerValue.other
            : answerValue.interests,
      })
      if (response) setSubmit("Submitted - Thank you")
      else await Promise.reject(new Error("Sorry, Error saving"))
    } catch (e) {
      if (e.message.includes("404")) {
        setSubmit(e.response.data.error)
        setTimeout(() => setSubmit("Submit"), 3000)
      } else {
        setSubmit(e.message)
        setTimeout(() => setSubmit("Submit"), 3000)
      }
    }
  }
  console.log(answerValue)
  return (
    <section className="h-full p-4 bg-gray-100 bg-opacity-50 ">
      <form
        className="container  mx-auto shadow-md w-full md:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="p-4 bg-gray-100 border-t-4 border-fblue-600 bg-opacity-5">
          <div className="lg:flex">
            <div className="w-full lg:w-2/3 flex flex-col ">
              <h1 className="text-xl md:text-5xl text-grotesk font-bold px-2 mt-4 mb-8">
                Sign Up to Our NewsLetter
              </h1>
              <p className=" px-6 text-base md:text-lg text-gray-500 text-justify ">
                We’re creating a new inclusive and intersectional standard for
                entrepreneurs. Our aim is to be the largest community of women
                of colour founders. We're levelling the playing field, bringing
                together forward-thinking investors and engaged allies to get
                more diverse founders funded.
              </p>
            </div>
            <div className="hidden lg:block lg:w-1/3 ">
              <img
                className="w-full object-contain"
                src={banner}
                alt="banner"
              />
              <img className=" mt-4 m-2" src={logo} alt="logo" />
            </div>
          </div>
        </div>
        <div className="space-y-4 bg-white">
          {Questions.map((item) => (
            <div key={item.question}>
              {item.type === "open" ? (
                <div className="w-full p-4 space-y-4 text-black md:inline-flex md:space-y-0 items-center">
                  <h2 className="max-w-sm mx-auto md:w-1/3 font-medium text-lg md:text-xl text-grotesk font-semibold">
                    {item.question}
                  </h2>
                  <div className="max-w-sm mx-auto md:w-2/3">
                    <div className="relative">
                      <input
                        type={
                          item.question.includes("email") ? "email" : "text"
                        }
                        required
                        id={item.key}
                        value={answerValue[item.key]}
                        className={
                          item.type === "open"
                            ? "rounded-xs border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-600 focus:border-transparent"
                            : "form-radio"
                        }
                        placeholder={item.question}
                        onChange={(e) =>
                          changeHandler(e.target.value, item.key)
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 space-y-4 text-black  md:space-y-0">
                  <h2 className="font-semibold text-sm pl-8 text-grotesk mb-10">
                    {item.question}
                  </h2>

                  <div className="flex flex-col pl-8">
                    {item.answers.map((ans) => (
                      <div key={ans} className="mb-2">
                        <input
                          type="radio"
                          required
                          id={item.key}
                          className="form-radio"
                          name={item.key}
                          value={ans}
                          onChange={(e) =>
                            changeHandler(e.target.value, item.key)
                          }
                        />
                        <span className="ml-2 text-sm text-grotesk">{ans}</span>
                        {answerValue[item.key] === "other" &&
                        ans === "other" ? (
                          <div className="relative mt-2">
                            <input
                              type="text"
                              required
                              id="other"
                              className="rounded-xs border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-600 focus:border-transparent"
                              placeholder="Your answer"
                              value={answerValue.other}
                              onChange={(e) =>
                                changeHandler(e.target.value, "other")
                              }
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <hr />
            </div>
          ))}
          <div className="w-full px-4 pb-4 mx-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              className="py-2 px-4 bg-fblue hover:bg-fblue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  text-grotesk rounded-sm "
            >
              {submit}
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}
export default NewsLetter
