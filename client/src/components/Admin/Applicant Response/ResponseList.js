import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";

import {
  ArrowLeftIcon,
  PlusIcon,
  CheckCircleIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

import AdminContext from "../../../contexts/Admin";
import { AnswersContext } from "../../../contexts/AnswersProvider";

// import ResponseWidget from "../ResponseWidget"

import ResponseWidget from "./ResponseWidget";
import DisplayResponse from "./DisplayResponse";
// import AddQuestionForm from './AddQuestion/AddQuestionForm'

const style = {
  disabledDiv: "group hover:bg-gray-300",
  disabledInput: "bg-gray-200 group-hover:bg-gray-300 placeholder-gray-500",
  enabledDiv: "bg-blue-200 ",
  enabledInput: "bg-blue-200 placeholder-gray-500",
};

const ResponseList = () => {
  const { applicantType } = useContext(AdminContext);
  const { viewButton, viewId, setViewButton, buttonClicked } =
    useContext(AnswersContext);
  const [listData, setListData] = useState({ data: [], header: [] });
  const [answerData, setAnswerData] = useState({ data: [], header: [] });
  const [score, setScore] = useState(viewId.totalScore);

  // viewButton === true && console.log("VIEWID", viewId);

  const [disabled, setDisabled] = useState(true);

  const answerInput = useRef();
  // create copy ?

  const getTimeDifference = (DateToCompare) => {
    const today = Date.now();
    const compareDate = Date.parse(DateToCompare);
    let timeDifference = (today - compareDate) / 1000 / 60 / 60;

    if (timeDifference >= 24) {
      timeDifference = parseInt((timeDifference /= 24)) + " d ago";
    } else if (timeDifference < 24 && timeDifference > 0.99) {
      timeDifference = Math.round(timeDifference) + " h ago";
    } else {
      timeDifference = parseInt((timeDifference *= 60)) + " m ago";
      if (timeDifference === "0 m ago") {
        timeDifference = "now";
      }
    }
    return timeDifference;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `/api/founder/response/${applicantType}`
        );

        const userData = result.data.map((item) => {
          // Getting first and last name
          const firstName = item.answerData.find(
            (x) => x.question === "First name"
          )?.answer_value;
          const lastName = item.answerData.find(
            (x) => x.question === "Last name"
          )?.answer_value;
          const questionLocation = item.answerData.find(
            (x) => x.question === "City,Country" || x.question === "Location"
          );
          const questionEmail = item.answerData.find(
            (x) => x.question === "email" || x.question === "Email"
          );

          const location = questionLocation?.answer_value;
          const email = questionEmail?.answer_value;

          let finalObject = {
            ...item,
            applicantName: `${firstName} ${lastName}`,
            userLocation: location,
            userEmail: email,
            submitted: getTimeDifference(item.submissionDate),
          };

          if (applicantType !== "New") {
            const date = new Date(item.evaluatedOn);
            finalObject = {
              ...finalObject,
              evaluatedOn: date.toLocaleDateString("de-DE"),
            };
          }

          return finalObject;
        });

        setListData({
          header: [
            {
              title: "UserName",
              key: "applicantName",
              style: "py-3 px-6 text-left ",
            },
            {
              title: "Email",
              key: "userEmail",
              style: "hidden md:table-cell text-left",
            },
            {
              title: "Location",
              key: "userLocation",
              style: "text-left hidden lg:table-cell items-center",
            },
            {
              title: applicantType === "New" ? "Submitted" : "Evaluated On",
              key: applicantType === "New" ? "submitted" : "evaluatedOn",
              style: "text-left hidden md:table-cell items-center",
            },
            {
              title: "Score",
              key: "totalScore",
              style: "text-left",
            },
            { title: "More Info", key: "-", style: "text-center" },
          ],
          data: userData,
          colSize: [
            <colgroup>
              {/* <col style={{ width: "10vw" }} />
              <col style={{ width: "15vw" }} />
              <col style={{ width: "15vw" }} />

              <col style={{ width: "10vw" }} /> */}
            </colgroup>,
          ],
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (!viewButton && applicantType) {
      fetchData();
    }
  }, [viewButton, applicantType]);

  useEffect(() => {
    if (viewButton) {
      setViewButton(false);
    }
  }, [applicantType]);

  useEffect(() => {
    if (viewButton) {
      const answerList = viewId?.answerData.map((answer) => {
        // console.log("answer", answer);
        return {
          answer_id: answer.answer_id,
          answer_value: answer.answer_value,
          question_category: answer.category,
          question_value: answer.question,
          question_type: answer.type,
          question_id: answer._id,
          answer_score: answer.score,
          answer_rank: answer.rank,
        };
      });

      setAnswerData({
        answerList: answerList,
        total_score: viewId.totalScore,
      });
    }
  }, [viewId, viewButton]);

  const approveApplicant = async (e) => {
    try {
      const approved = await axios.put(
        `api/founder/response/Approved/${viewId._id}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const rejectApplicant = async () => {
    try {
      const rejected = await axios.put(
        `api/founder/response/Rejected/${viewId._id}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const editScore = async () => {
    try {
      const edit = await axios.put(
        `api/founder/response/${viewId._id}/${score}`
      );
    } catch (e) {
      console.log(e);
    }
    alert("Score is updated");
    setDisabled(!disabled);
  };

  return (
    <div className='w-full flex flex-col '>
      <div className>
        {/* <div className=' '>Founders Response</div> */}
        {viewButton && (
          <div className='flex justify-between text-grotesk items-center mx-2'>
            <div className='flex  justify-center items-center ml-5 w-5/12'>
              <div className='flex items-center'>
                <div className='text-md lg:text-xl font-semibold'>
                  TOTAL SCORE
                </div>
                <div className=' '>
                  <input
                    defaultValue={viewId.totalScore}
                    disabled={disabled}
                    type='number'
                    ref={answerInput}
                    onChange={(e) => setScore(e.target.value)}
                    className={
                      "ml-3 w-10/12 flex justify-center text-center font-semibold text-base bg-flime border border-black text-md lg:text-xl rounded-full p-3 text-black mb-3 focus:border-fred"
                    }
                  />
                </div>
              </div>

              {/* Score Editing Section */}
              <div>
                <button
                  className={`font-3xl w-1/3 md:w-auto  mx-2 p-3 ${
                    !disabled && "hidden"
                  }`}
                  onClick={() => {
                    setDisabled(!disabled);
                    setTimeout(() => {
                      answerInput.current.focus();
                    }, 0);
                  }}
                >
                  <PencilAltIcon className='h-8 w-8 m-auto' />
                </button>

                <button
                  className={` w-1/3 md:w-auto mx-2 p-3 ${
                    disabled
                      ? style.disabledInput + " hidden"
                      : style.enabledInput
                  } `}
                  onClick={editScore}
                >
                  <CheckCircleIcon className='h-8 w-8 m-auto ' />
                </button>
              </div>
            </div>
            {/* End  Score Editing Section */}

            <div
              className={
                applicantType === "New" || applicantType === "Pending"
                  ? "w-full flex flex-col md:flex-row  justify-center"
                  : "hidden"
              }
            >
              <button
                class='bg-flime-500 hover:bg-flime-700 text-black font-bold py-2 px-4 rounded text-xl mt-5 mr-3 mb-10'
                onClick={approveApplicant}
              >
                Approve
              </button>
              <button
                class='bg-fred-400 hover:bg-fred-800 text-white font-bold py-2 px-4 rounded text-xl mt-5 mr-3 mb-10'
                onClick={rejectApplicant}
              >
                Reject
              </button>
            </div>
            <div
              onClick={() => buttonClicked(!viewButton)}
              className=' flex justify-center items-center space-around text-lg  mb-3 w-4/12 lg:w-2/12  md:w-auto py-3 px-3 text-mono font-bold bg-fblue transition-colors ease-in-out duration-500 hover:bg-flime text-xs text-white hover:text-black'
            >
              <ArrowLeftIcon className='w-5 h-5 mr-3 ' />
              Back
            </div>
          </div>
        )}
      </div>
      {viewButton ? (
        <DisplayResponse data={answerData} />
      ) : (
        <ResponseWidget
          data={listData}
          showing={10}
          colSize={listData.colSize}
          cellAlignment={"justify-start"}
        />
      )}
    </div>
  );
};

export default ResponseList;
