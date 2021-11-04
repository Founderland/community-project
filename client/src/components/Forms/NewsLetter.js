import React from "react";
import banner from "../../assets/images/bannerSymbol.png";
import logo from "../../assets/images/singleLineLogo.svg"
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

export default function NewsLetter() {
  return (
    <div>
      <section class='h-full p-4 bg-gray-100 bg-opacity-50 '>
        <form class='container  mx-auto shadow-md w-3/5'>
          <div class='p-4 bg-gray-100 border-t-4 border-fblue-600 rounded-lg bg-opacity-5'>
            {/* <div class='max-w-sm mx-auto md:w-full md:mx-0'>
                  <div class='inline-flex items-center space-x-4'>
                     <a href='#' class='block relative'>
                        <img
                        alt='profil'
                        src={banner}
                        class='mx-auto object-cover rounded-full h-16 w-16 '
                        />
                     </a>
                     
                  </div>
                  </div> */}

            <div className='lg:flex '>
              <div className='w-full lg:w-2/3 flex flex-col '>
                <h1 className=' text-5xl  text-grotesk font-bold px-2 mt-4 mb-12'>
                  Sign Up to Our NewsLetter{" "}
                </h1>
                <p className=' px-2 text-lg text-gray-500  '>
                  We’re creating a new inclusive and intersectional standard for
                  entrepreneurs. Our aim is to be the largest community of women of
                  colour founders.We're levelling the playing field, bringing
                  together forward-thinking investors and engaged allies to get
                  more diverse founders funded.
                </p>
              </div>
              <div className='hidden lg:block lg:w-1/3 '>
                       <img className='w-full object-contain' src={banner} alt='banner' />
                       <img className=" mt-4 m-2" src={logo} alt="logo" /> 
                    </div>
             
                 </div>
                 
          </div>

          <div class='space-y-6 bg-white'>
            {Questions.map((item) => (
              <div>
                <div class='items-center w-full p-4 space-y-4 text-black  text-xl md:inline-flex md:space-y-0'>
                  <h2 class='max-w-sm mx-auto md:w-1/3 font-medium  text-2xl text-grotesk'>
                    {item.question}
                  </h2>
                  <div class='max-w-sm mx-auto md:w-2/3'>
                    <div className='relative'>
                      {item.type === "open" ? (
                        <input
                          //   {item.Type==='open'? 'input ': 'radio'}
                          type='text'
                          required
                          id='user-info-email'
                          class={
                            item.type === "open"
                              ? "rounded-xs border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-fblue-600 focus:border-transparent"
                              : "form-radio"
                          }
                          placeholder='Your answer'
                        />
                      ) : (
                        <div class='flex flex-col'>
                          {item.answers.map((ans) => (
                            <div class='mb-2'>
                              <input
                                type='radio'
                                required
                                class='form-radio'
                                name='accountType'
                                value='personal'
                              />
                              <span class='ml-2  text-grotesk'>{ans}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
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
