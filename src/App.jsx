import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import { Quiz } from './components/Quiz'

function App() {
  const [isQuiz, setIsQuiz] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState([])
  const [formData, setFormData] = useState({
    category: "",
    questions: "5"
  })

  function setChange(event) {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  } 


  useEffect(() => {
    const QuestionsUrl = `https://api.api-ninjas.com/v1/trivia?category=${formData.category}&limit=${formData.questions}` 

    const controller = new AbortController()
    const signal = controller.abort()
    
    fetch(QuestionsUrl, {
      headers: {
        "X-Api-Key": import.meta.env.VITE_QUIZ_API,
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => setQuizQuestion(data))
    .catch(err => setQuizQuestion(err))


    return () => {
      fetch(QuestionsUrl, {
        signal: signal
      })
    }
  }, [!isQuiz])


  function submitHandler(event) {
    event.preventDefault()
    setIsQuiz(prevIsQuiz => !prevIsQuiz)
  }

  return (
    <div className="App">
      <Header />
      {
        isQuiz ? 
        
        <Quiz questions={quizQuestion} handleSubmit={submitHandler}/> : 
        
        <div className='form-box' onSubmit={submitHandler}>
          <form method="post">
            <select name='category' id="select" value={formData.category} onChange={setChange}>
              <option value="">random</option>
              <option value="general">general</option>
              <option value="sciencenature">science and nature</option>
              <option value="geography">geography</option>
              <option value="entertainment">entertainment</option>
              <option value="music">music</option>
              <option value="mathematics">mathematics</option>
              <option value="religionmythology">religion and mythology</option>
              <option value="sportsleisure">sports and leisure</option>
            </select>

            <select id="" name="questions" value={formData.questions} onChange={setChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>

            <button type="submit">Start Quiz!</button>
          </form>
        </div>
      }
    </div>
  )
}

export default App
