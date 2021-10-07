import Form from '../Form'

const FormPreview = ({
    questionInfo,
    answersList,
    setShowPreview,
    memberType,
    questionPreview,
}) => {
    return (
        <div
            className="fixed h-full w-full bg-white 
        "
        >
            <div className="flex justify-start items-center bg-fblue-dark">
                <span
                    className="bg-fblue-dark px-5 cursor-pointer"
                    onClick={() => setShowPreview(false)}
                >
                    &#10060;
                </span>
                <h3 className="text-grotesk p-1 text-white">Close Preview</h3>
            </div>
            <div className="  h-full flex justify-center items-center">
                <Form
                    memberType={memberType}
                    questionPreview={questionPreview}
                />
            </div>
        </div>
    )
}

export default FormPreview
