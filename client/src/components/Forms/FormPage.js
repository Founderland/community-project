import Question from "./Question";
import smallLogo from "../../assets/images/smallLogo.svg";
import Thankyou from "./Thankyou";
import { useHistory } from "react-router-dom";

const FormPage = (props) => {
  const history = useHistory();

  const submitHandler = () => {
    let path = `thankyou`; 
    history.push(path);
  }
  
  const { questions, isFirst, isLast } = props;
  return (
    <div>
      <div className="max-h-screen w-full flex justify-center flex-col  ">
        <div className=" flex flex-col justify-between  p-10  h-screen">
          <div className="flex  justify-between mb-7">
            <div>
              {" "}
              <img src={smallLogo} alt="logo" className="w-14 xl:w-20" />{" "}
            </div>

            <div className="">
              {/* md:max-w-xs md:pl-24 */}
              <h2 className="text-mono font-medium text-xl xl:text-2xl ">
                DISRUPTING THE PIPELINE FOR INVESTORS{" "}
              </h2>
            </div>
          </div>
          <div>
            {questions.map((question, i) => (
              <Question key={i} {...question} />
            ))}
          </div>
          <div className="p-10 ">
            {
              !isFirst &&
              <button
              type="button"
              className="py-4 px-6 float-left bg-fblue hover:bg-fblue-dark focus:ring-fblue focus:ring-offset-white text-white text-mono w-1/2 md:w-1/3 xl:w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={props.previousStep}
            >
              Previous
            </button>
           } 
            <button
              type="button"
              className={"py-4 px-6 float-right focus:ring-offset-white text-white text-mono w-1/2 md:w-1/3 xl:w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 " + (isLast ? " bg-black  hover:bg-black focus:ring-black" : "bg-fblue hover:bg-fblue-dark focus:ring-fblue")}
              onClick={isLast ?  submitHandler : props.nextStep }
            >
              {isLast ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
