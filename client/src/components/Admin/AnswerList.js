import Answer from './Answer'

const AnswerList = ({ answersList, setAnswersList, memberType }) => {
  const handleAnswerChange = (i, updated) => {
    console.log(i)
    const updatedList = answersList.map((item, index) =>
      index === i ? { ...item, ...updated } : item
    )
    setAnswersList(updatedList)
  }

  const handleDelete = (i) => {
    const updatedList = [...answersList]
    updatedList.splice(i, 1)
    console.log(updatedList, 'upLIST')
    setAnswersList([...updatedList])
  }

  return (
    <>
      {answersList?.map((answer, i) => {
        return (
          <Answer
            key={i + answer.answer}
            handleAnswerChange={handleAnswerChange}
            answer={answer}
            memberType={memberType}
            handleDelete={handleDelete}
            i={i}
          />
        )
      })}
    </>
  )
}

export default AnswerList
