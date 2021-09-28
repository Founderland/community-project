import { ReactComponent as SuccessIcon } from "../assets/success_logo.svg";
import { ReactComponent as ErrorIcon } from "../assets/error_logo.svg";

const NewQuestionResponse = ({ isSuccessful, isError }) => {
  return (
    <>
      <div
        className={
          isSuccessful
            ? `flex flex-row w-full justify-start items-center px-5 text-grotesk bg-fblue text-white`
            : `hidden`
        }>
        <SuccessIcon className="w-9" />
        <h1 className="px-3"> New question successfully added </h1>
      </div>
      <div
        className={
          isError
            ? `flex  flex-row  w-full  justify-start items-center px-5 text-grotesk bg-fpink-light`
            : `hidden`
        }>
        <ErrorIcon />
        <h1 className="px-3"> Sorry something went wrong </h1>
      </div>
    </>
  );
};

export default NewQuestionResponse;
