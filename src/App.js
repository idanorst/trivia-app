import './style.css';
import React from 'react'
import Quiz from './components/Quiz'
import Start from './components/Start'
import UserInput from './components/UserInput'
/* import {data} from './data.js' */

export default function App() {
  const [start, setStart] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [difficulty, setDifficulty] = React.useState()
  const [category, setCategory] = React.useState()
  const [nrOfQuestions, setNrOfQuestions] = React.useState()

  // These choices are chosen from the choices on the Open Trivia API page.
  const categoryChoices = [
    {value: "", label: "Any Category"}, 
    {value: "9", label: "General Knowledge"},  
    {value: "12", label: "Entertainment: Music"}, 
    {value: "13", label: "Entertainment: Musicals & Theatres"}, 
    {value: "17", label: "Science & Nature"}, 
    {value: "18", label: "Science: Computers"}, 
    {value: "20", label: "Mythology"}, 
    {value: "21", label: "Sports"}, 
    {value: "22", label: "Geography"}, 
    {value: "23", label: "History"}, 
    {value: "24", label: "Politics"}, 
    {value: "27", label: "Animals"}
  ]

  const difficultyChoices = [
    {value: "", label: "Any difficulty"}, 
    {value: "easy", label: "Easy"}, 
    {value: "medium", label: "Medium"}, 
    {value: "hard", label: "Hard"}
  ]

  const nrOfQuestionsChoices = [
    {value: "5", label: "5"},
    {value: "10", label: "10"},
    {value: "15", label: "15"},
    {value: "20", label: "20"}
  ]

  // Function that opens the quiz page by changing the state of 'showSettings' and 'start'
  function startQuiz() {
    setShowSettings(false)
    setStart(true)
  }

  // Function that opens the setting page by changing the state of 'showSettings'
  function enterSettings() {
    setShowSettings(true)
  }

  // Function that starts a new game, changing the state of 'start' 
  function newGame() {
    setStart(false)
  }

  // Three functions to save the category, difficulty and number of questions that the player chose in the settings. 
  function registerCategory(value) {
    setCategory(value)
  }

  function registerDifficulty(value) {
    setDifficulty(value) 
  }

  function registerNumberOfQuestions(value){
    setNrOfQuestions(value)
  }

  return (
    <div className="container">
      {!start && !showSettings && <Start 
        handleClick={enterSettings}
      />}
      {showSettings && 
        <UserInput 
          handleClick={startQuiz}
          registerCategory={registerCategory}
          registerDifficulty={registerDifficulty}
          registerNumberOfQuestions={registerNumberOfQuestions} 
          categoryChoices={categoryChoices} 
          difficultyChoices={difficultyChoices}
          nrOfQuestionsChoices={nrOfQuestionsChoices}
          />}
      {start && 
        <Quiz 
          handleClick={newGame}
          difficulty={difficulty}
          category={category}
          nrOfQuestions={nrOfQuestions} 
          />}
    </div>
    
  )
}
