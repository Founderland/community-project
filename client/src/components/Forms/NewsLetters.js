import React, { useState } from "react";
import axios from "axios";
import banner from "../../assets/images/bannerSymbol.png";
import logo from "../../assets/images/singleLineLogo.svg";
const Questions = [
  {
    question: "First Name ",
    type: "open",
  },
  {
    question: "Last Name ",
    type: "open",
  },
  {
    question: "What's your email address? ",
    type: "open",
  },
  {
    question: "What interests you most about Founderland? ",
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
      "Founderland is committed to protecting and respecting your privacy, and we’ll only use your personal information to administer your account and to provide the products and services you requested from us. ",
    type: "single choice",
    answers: [
      "I agree to allow Founderland contact me, store and process my personal data (You can unsubscribe at any time )",
      "I do not agree to allow Founderland to contact me, store and process my personal data.",
    ],
  },
];

export default function NewsLetters() {
  const [answerValue, setAnswerValue] = useState([]);
  const [submit, setSubmit] = useState(false);

  const changeHandler = (value, index) => {
    const element = answerValue?.findIndex((x) => x.id === index);
    if (element > -1) {
      answerValue[element].value = value;
    } else {
      answerValue.push({
        id: index,
        value: value,
      });
    }

    setAnswerValue([...answerValue]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("form is submitted");
    setSubmit(true);

    console.log(answerValue);

    axios.post("/api/applicants/response/newsletter", {
      firstName: answerValue[0].value,
      lastName: answerValue[1].value,
      email: answerValue[2].value,
      interests: answerValue[3].value,
    });
  };

  return (
    <div>
      <section class='h-full p-4 bg-gray-100 bg-opacity-50 '>
        <form
          class='container  mx-auto shadow-md w-1/2'
          onSubmit={handleSubmit}
        >
          <div class='p-4 bg-gray-100 border-t-4 border-fblue-600 rounded-lg bg-opacity-5'>
            <div className='lg:flex '>
              <div className='w-full lg:w-2/3 flex flex-col '>
                <h1 className=' text-5xl  text-grotesk font-bold px-2 mt-4 mb-12'>
                  Sign Up to Our NewsLetter{" "}
                </h1>
                <p className=' px-2 text-lg text-gray-500  '>
                  We’re creating a new inclusive and intersectional standard for
                  entrepreneurs. Our aim is to be the largest community of women
                  of colour founders.We're levelling the playing field, bringing
                  together forward-thinking investors and engaged allies to get
                  more diverse founders funded.
                </p>
              </div>
              <div className='hidden lg:block lg:w-1/3 '>
                <img
                  className='w-full object-contain'
                  src={banner}
                  alt='banner'
                />
                <img className=' mt-4 m-2' src={logo} alt='logo' />
              </div>
            </div>
          </div>

          <div class='space-y-6 bg-white'>
            {Questions.map((item, index) => (
              <div>
                {item.type === "open" ? (
                  <div className='items-center w-full p-4 space-y-4 text-black  text-xl md:inline-flex md:space-y-0'>
                    <h2 class='max-w-sm mx-auto md:w-1/3 font-medium  text-2xl text-grotesk font-semibold'>
                      {item.question}
                    </h2>
                    <div className='max-w-sm mx-auto md:w-2/3'>
                      <div className='relative'>
                        <input
                          type={
                            item.question.includes("email") ? "email" : "text"
                          }
                          required
                          id='user-info-email'
                          class={
                            item.type === "open"
                              ? "rounded-xs border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-600 focus:border-transparent"
                              : "form-radio"
                          }
                          placeholder='Your answer'
                          onChange={(e) => changeHandler(e.target.value, index)}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='w-full p-4 space-y-4 text-black  text-xl  md:space-y-0'>
                       
                           <h2 class=' font-semibold  text-2xl pl-8 text-grotesk mb-10'>
                      {item.question}
                    </h2>

                    <div class='flex flex-col pl-8'>
                      {item.answers.map((ans) => (
                        <div class='mb-2'>
                          <input
                            type='radio'
                            required
                            class='form-radio'
                            name='accountType'
                            value={ans}
                            onChange={(e) =>
                              changeHandler(e.target.value, index)
                            }
                          />
                          <span class='ml-2  text-grotesk'>{ans}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <hr />
              </div>
            ))}

            <div class='w-full px-4 pb-4 mx-auto text-gray-500 md:w-1/3'>
              <button
                type='submit'
                class='py-2 px-4  bg-fblue hover:bg-fblue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  text-xl text-grotesk rounded-sm '
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
