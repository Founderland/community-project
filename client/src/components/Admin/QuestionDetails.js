import Question from '../Forms/Question'
import AddQuestionForm from './AddQuestion/AddQuestionForm'

const QuestionDetails = () => {
  const question = {
    _id: '614afc27a47c96b7a3decf2c',
    category: 'About You',
    question:
      'Do you identify as a woman who has faced obstacles tied to your ethnicity/race and gender in your entrepreneurial journey? ',
    rank: 'Very Important - variable is scrutinized',
    type: 'choice',
    answers: [
      {
        answer: 'Continental Europe',
        ideal: true,
        points: 50,
        notes: '',
        _id: '614afc27a47c96b7a3decf2d',
      },
      {
        answer: 'United Kingdom',
        ideal: true,
        points: 50,
        notes: '',
        _id: '614afc27a47c96b7a3decf2e',
      },
      {
        answer:
          'Not in Europe or the UK but planning on relocating to that area',
        ideal: true,
        points: 200,
        notes: '',
        _id: '614afc27a47c96b7a3decf2f',
      },
      {
        answer: 'Not in Europe or the UK',
        ideal: false,
        points: 0,
        notes: '',
        _id: '614afc27a47c96b7a3decf30',
      },
    ],
    __v: 0,
    categoryPage: 2,
  }
  return (
    <>
      {/* <div className="h-screen w-screen">
          
          <div className=" flex bg-white p-4 rounded-lg">
            <label className="w-1/5">Category: </label>
            <input className="w-4/5" value={question.category} />
          </div>
          <div className=" flex bg-white p-4 rounded-lg">
            <label className="w-1/5">type: </label>
            <input className="w-4/5" value={question.type} />
          </div>
          <div className=" flex bg-white p-4 rounded-lg">
            <label className="w-1/5">Rank: </label>
            <input className="w-4/5" value={question.rank} />
          </div>
        </div>
      </div> */}
      <AddQuestionForm
        functionality={'edit'}
        question={question}
        answers={question.answers}
        memberType={'founderr'}
      />
    </>
  )
}

export default QuestionDetails
