import { useEffect, useRef } from "react"

const AddAnswer = ({
  setNewAnswer,
  newAnswer,
  handleNewAnswer,
  memberType,
}) => {
  const addField = useRef()
  useEffect(() => {
    // addField.current.focus();
  }, [])
  return (
    <>
      <div className=' flex flex-col w-full lg:w-3/6 xl:w-3/6 text-mono py-5   items-between justify-between lg:flex-row xl:justify-start lg:items-center'>
        <label
          HtmlFor='newAnswer'
          className='text-grotesk font-bold w-full lg:w-1/4 mb-5 xl:w-3/6 lg:mb-0'>
          Add answer
        </label>
        <input
          type='text'
          id='newAnswer'
          className='p-3 border-solid  shadow-md lg:w-2/3 xl:w-full  '
          placeholder='New answer'
          ref={addField}
          value={newAnswer.answer}
          onChange={(e) => {
            const value = e.target.value.trimStart()
            setNewAnswer({
              ...newAnswer,
              answer: value.replace(value[0], value[0]?.toUpperCase()),
            })
          }}
        />
      </div>
      <div className='flex flex-col w-full lg:w-3/6 text-mono py-5   items-start  md:flex-row lg:justify-center md:items-center'>
        {memberType === "founder" && (
          <div className='flex w-2/3  lg:w-3/6 items-center lg:justify-around'>
            <label
              HtmlFor='newAnswer'
              className=' text-grotesk font-bold w-2/3 lg:w-2/6  lg:text-center lg:mb-0 '>
              Score
            </label>
            <input
              type='number'
              id='score'
              className=' p-2 shadow-md w-2/6 xl:w-2/6  '
              placeholder='0'
              value={newAnswer.points}
              onFocus={(e) => (e.target.value = "")}
              onChange={(e) =>
                setNewAnswer({
                  ...newAnswer,
                  points: Number(e.target.value),
                })
              }
            />
          </div>
        )}
        <div
          className={`flex flex-row  w-full  lg:w-5/6 text-mono py-5  items-center ${
            memberType === "founder" ? "justify-between" : "flex flex-col "
          } md:justify-evenly`}>
          {memberType === "founder" && (
            <>
              <label className=' text-grotesk font-bold text-center lg:w-2/6   lg:mb-0 lg:ml-5'>
                Ideal?{" "}
              </label>
              <input
                type='checkbox'
                className=' lg:w-1/6 w-5 h-5 '
                checked={newAnswer.ideal}
                onChange={() =>
                  setNewAnswer({
                    ...newAnswer,
                    ideal: !newAnswer.ideal,
                  })
                }
              />
            </>
          )}
          <button
            type='button'
            className='p-4 bg-fblue text-white lg:w-2/6  '
            onClick={() => {
              if (addField.current.value.length === 0) {
                addField.current.focus()
              } else {
                handleNewAnswer(addField)
                addField.current.focus()
              }
            }}>
            {" "}
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default AddAnswer
