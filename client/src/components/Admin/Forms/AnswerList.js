import Answer from "./Answer"

const AnswerList = ({ answersList, setAnswersList, memberType }) => {
  const handleAnswerChange = (i, updated) => {
    const updatedList = answersList.map((item, index) =>
      index === i ? { ...item, ...updated } : item
    )
    setAnswersList(updatedList)
  }

  const handleDelete = (i) => {
    const updatedList = [...answersList].filter((item, index) => index !== i)

    setAnswersList([...updatedList])
  }
  return (
    <>
      {answersList?.map((answer, i) => (
        <Answer
          key={i + answer.answer}
          handleAnswerChange={handleAnswerChange}
          answer={answer}
          memberType={memberType}
          handleDelete={handleDelete}
          i={i}
        />
      ))}
    </>
  )
}

export default AnswerList
