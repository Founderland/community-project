import { useState } from "react";

const AddQuestionForm = () => {
  // TODO
  const [questionInfo, setQuestionInfo] = useState({
    category: "About You",
    question: "",
    type: "open",
  });
  const [answerType, setAnswerType] = useState("");
  const [final, setFinal] = useState([]);
  const [newAnswer, setNewAnswer] = useState({
    answer: "",
    points: 0,
    ideal: false,
  });

  const handleNewAnswer = (e) => {
    setFinal((pre) => (pre.length > 0 ? [...pre, newAnswer] : [newAnswer]));
  };

  const handleSubmit = () => {
    const test = { ...questionInfo, answers: [final] };
    console.log(test);
  };

  return (
    <div className="h-1/2 flex flex-col justify-center bg-gray-100 text-xl">
      <div className="shadow-xl flex flex-col justify-center items-center bg-white ">
        <h1 className="text-grotesk font-bold p-3">Add new Questions</h1>
        <div className="h-5/6 w-5/6 bg-gray-100">
          <div className="  text-mono py-5  flex flex-col items-between justify-between lg:flex-row lg:justify-between lg:items-center ">
            <label for="newQuestion" className=" w-full lg:w-1/6 mb-5 lg:m-0 ">
              Question
            </label>
            <input
              type="text"
              id="newQuestion"
              name="newQuestion"
              className="p-3 border-solid border-gray-300 shadow-md w-full lg:w-5/6"
              placeholder="New question"
              onChange={(e) =>
                setQuestionInfo({ ...questionInfo, question: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-start lg:flex-row lg:justify-around lg:items-center ">
            <div className=" w-full lg:w-1/2 text-mono py-5  flex flex-col items-between justify-between lg:flex-row lg:justify-between lg:items-center">
              <label
                for="newQuestion"
                className=" w-full lg:w-1/3 mb-5  lg:mb-0">
                Category
              </label>
              <select
                id="category"
                className="p-3 border-solid border-gray-300 w-auto shadow-md w-full lg:w-2/3"
                onChange={(e) =>
                  setQuestionInfo({ ...questionInfo, category: e.target.value })
                }>
                <option default value="About You">
                  About you
                </option>
                <option value="About Your Business">About Your Business</option>
                <option value="Tell us more">Tell us more</option>
              </select>
            </div>
            <div className="w-full  lg:w-1/2  text-mono py-5  flex flex-col items-between justify-between lg:flex-row xl:justify-between xl:items-center">
              <label
                for="newQuestion"
                className=" lg:w-1/3  mb-5  lg:mx-6 lg:mb-0 lg:text-center">
                Type of answer
              </label>
              <select
                id="answerType"
                className="p-3  border-solid border-gray-300 w-auto shadow-md lg:w-2/3"
                onChange={(e) =>
                  setQuestionInfo({ ...questionInfo, type: e.target.value })
                }>
                <option value="open">Open</option>
                <option value="list">Dropdown list</option>
                <option value="choice"> Single Choice </option>
                <option value="multiple">Multiple selections </option>
              </select>
            </div>
          </div>
          <div className="text-mono py-5 flex flex-col flex-wrap  xl:flex-nowrap lg:flex-row items-center justify-between">
            {questionInfo.type !== "open" && (
              <>
                <div className="flex flex-col w-full lg:w-3/6 text-mono py-5   items-between justify-between lg:flex-row lg:justify-between lg:items-center">
                  <label
                    for="newAnswer"
                    className=" w-full lg:w-1/3 mb-5  lg:mb-0">
                    Add answer
                  </label>
                  <input
                    type="text"
                    id="newAnswer"
                    className="p-3 border-solid border-gray-300 shadow-md lg:w-2/3"
                    placeholder="New answer"
                    onChange={(e) =>
                      setNewAnswer({
                        ...newAnswer,
                        answer: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col w-full lg:w-3/6 text-mono py-5   items-start  md:flex-row lg:justify-around md:items-center">
                  <div className="flex w-2/3 items-center lg:justify-around">
                    <label
                      for="newAnswer"
                      className="  w-2/3 lg:w-4/6  lg:text-center lg:mb-0 ">
                      Score
                    </label>
                    <input
                      type="text"
                      id="score"
                      className=" p-2 border-solid border-gray-300 shadow-md w-2/6 xl:w-1/6"
                      placeholder="0"
                      onChange={(e) =>
                        setNewAnswer({ ...newAnswer, points: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-row  w-full  xl:w-2/4 text-mono py-5  items-center justify-between md:justify-evenly  xl:justify-evenly ">
                    <label className=" text-center lg:text-left lg:w-1/6   lg:mb-0 lg:mx-5">
                      Ideal?{" "}
                    </label>
                    <input
                      type="checkbox"
                      className=" lg:w-1/6 w-5 h-5"
                      onChange={() =>
                        setNewAnswer({ ...newAnswer, ideal: !newAnswer.ideal })
                      }
                    />
                    <button
                      type="button"
                      className="p-4 bg-fblue text-white lg:w-2/6"
                      onClick={handleNewAnswer}>
                      {" "}
                      Add
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className=" flex flex-col w-full items-center justify-between">
            <button
              type="button"
              className="p-4 bg-fblue text-white "
              onClick={handleSubmit}>
              {" "}
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
