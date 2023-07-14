import React, { useRef, useState } from 'react'

export const Quiz = (props) => {  
  const [answer, setAnswer] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [score, setScore] = useState(0)

  const inputRef = useRef(null)

  let objAns = []

  const Quiz = props.questions.map((question,id)=>{
    return (
      <div key={id} className='question'>
        <p>
          {objAns.push(question.answer)}. &nbsp;&nbsp;
          {question.question}
        </p>
        <input type="text"
         name={id} 
         onChange={changeInput} 
         onFocus={changeInput} 
         className='answer'
         onBlur={changeInput}
         placeholder='Type Your Answer Here...'
         />

         <p className='hide'>{question.answer}</p>
      </div>
    )
  })
  
  function changeInput (event) {
    setAnswer(prevAnswer => {
      return {
        ...prevAnswer,
        [event.target.name]: "",
        [event.target.name]: event.target.value
      }
    })
  }

  const checkAnswer = (event) => {
    event.preventDefault()

    inputRef.current.querySelectorAll("input").forEach(input => {
      input.readOnly = true
    })

    const solution = Object.entries(answer).map(
      ([key, value]) => ({key, value})
    )

    if(!solution || solution == undefined || solution == null) {
      return setIsFinished(setFinish => !setFinish)
    }
    
    for (let index = 0; index < objAns.length; index++) {

      if(objAns[index].toLowerCase() === 
      solution[index]?.value.toLowerCase().trim()) {
        setScore(prevScore => prevScore + 1) 
      }
    }

    inputRef.current.querySelectorAll(".hide").forEach(p => {
      p.className = "show"
    })
    
    setIsFinished(setFinish => !setFinish)
  }

  return (
    <form method='post' onSubmit={checkAnswer} ref={inputRef}>
      {Quiz}

      <div className="submit">
        {
          isFinished ?
          <>
            <button type="button" onClick={props.handleSubmit}>Restart</button> 
            <div className='score'>
              <div className="score-board">
                {score}/{objAns.length}
              </div>
            </div>
          </> :
          <button type="submit">Finish</button>
        }
      </div>
    </form>
  )
}
