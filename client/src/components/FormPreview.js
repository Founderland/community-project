const FormPreview = ({ questionInfo, final, setShowPreview }) => {
  return (
    <div className="fixed h-full w-full bg-white">
      <span onClick={() => setShowPreview(false)}> &#10060; </span>
      <div className="  h-full flex justify-center items-center">
        <div className="p-2 ">
          <label for="">{questionInfo.question}</label>
          {questionInfo.type === "open" ? (
            <input
              type="text"
              className="p-2 my-2"
              name="firstname"
              placeholder="Your answer"
            />
          ) : (
            <>
              {final.map((answer) => (
                <div className="flex m-2 ">
                  <input
                    type="radio"
                    className="m-2"
                    id={answer._id}
                    name="fav_language"
                    value={answer.answer}
                  />
                  {answer.answer !== "open" && (
                    <>
                      <label for="html"> {answer.answer}</label>
                    </>
                  )}
                  {answer.answer === "open" && (
                    <input
                      type="text"
                      id={answer._id}
                      className="p-1"
                      name={answer.answer}
                      placeholder="open"
                      onChange={(e) => console.log(e.target.id)}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
