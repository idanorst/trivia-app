import '../style.css';
import React from 'react'
import loading from '../images/loading.png'
import {nanoid} from 'nanoid'

export default function Quiz(props) {
    const [chosenAnswers, setChosenAnswers] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [gameCompleted, setGameCompleted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [countCorrect, setCountCorrect] = React.useState(0)
    const [isCountdownVisible, setIsCountdownVisible] = React.useState(true)
    
    // Using a useEffect-hook to make the API-call and set the quiz-data
    React.useEffect(() => {

        async function getQuizData() {
            // The url to the open trivia API, where I already have chosen the type of encoding and what type of questions to be chosen
            var http = "https://opentdb.com/api.php?encode=base64&type=multiple"
            // If the player chose a difficulty
            if (typeof props.difficulty !== 'undefined'){
                http += `&difficulty=${props.difficulty}`
            }
            // or a category
            if (typeof props.category !== 'undefined'){
                // these are added to the url. 
                http += `&category=${props.category}`
            }
            // Finally the number of questions, that the player wants, is added to the url.
            if (typeof props.nrOfQuestions === 'undefined') {
                http += `&amount=5`
            } else {
                http += `&amount=${props.nrOfQuestions}`
            }
            const res = await fetch(http)
            const data = await res.json()

            // Mapping through the data fetched in the api-call, 
            setQuestions(data.results.map(question => {
                // and creating question objects.
                return {
                    // Atob() is used to encode the strings.
                    question: atob(question.question),
                    id: nanoid(),
                    answered: false,  
                    // The answers objects are created by another helper-function
                    answers: answerArray(question),
                }
            }))

            // Collecting the correct answers in a separate list.
            var correctAnswerList = []
            for (let i = 0; i < props.nrOfQuestions; i++){
                var correct = atob(data.results[i].correct_answer)
                correctAnswerList.push(correct)
                
            }
            setCorrectAnswers(correctAnswerList)
        }
        
        // The helper function that creates the answers-objects for each question object.
        function answerArray(question) {
            var answers = []
            answers.push(atob(question.correct_answer))
            answers.push(atob(question.incorrect_answers[0]))
            answers.push(atob(question.incorrect_answers[1]))
            answers.push(atob(question.incorrect_answers[2]))

            // To make sure that the correct answer is not always the first choice, a sort function is used to mix the order.
            answers.sort(func)

            // The answer objects are created
            const answerArray = answers.map(answer => { return {
                text: answer,
                chosen: false, 
                correct: answer === atob(question['correct_answer']) ? true : false
            }   
            })   
            return answerArray
        }        
        getQuizData()
    }, [props.difficulty, props.category, props.nrOfQuestions])

    // Using setTimeout() to make the loading-overlay disappear after three seconds.
    setTimeout(() => {
        setIsCountdownVisible(false)
    }, 3000)

    // The helper function to sort the answers list. 
    function func(a, b){
        return 0.5 - Math.random()
    }

    // A function which holds the chosen answer
    function holdAnswer(id, answer) {
        // by mapping through the questions array,
        const newQuestions = questions.map(question => {
            // finding the question with the correct ID, 
            if (question.id === id){
                // then finding the chosen answer, 
                const index = question.answers.findIndex($answer => $answer.text === answer)
                // and changing it's chosen value.
                question.answers[index].chosen = !question.answers[index].chosen
                // Also changing the question's answered value. 
                question.answered = !question.answered
            }
            return question
        })
       
        setQuestions(newQuestions)
        // At the same time the answer is registered to be used later when checking the score.
        registerAnswer(answer)
    }

    // The function which saves the chosen answers,
    function registerAnswer(ans) {
        var inList = false
        var chosenAnswersList = chosenAnswers 
        // making sure that only one answer is saved for each question, also if the player is clicking many times on the same answer. 
        for (let i = 0; i < chosenAnswersList.length; i++) {
            if (ans === chosenAnswersList[i]){
                chosenAnswersList.pop(ans)
                inList = true
            }
        }
        if (!inList) {
            chosenAnswersList.push(ans)
        }
    }

    // The function which is checking the score of the game, called when clicking on the 'Check results' button. 
    function checkResults() {
        // First the sate of 'GameCompleted' is set to true.
        setGameCompleted(true)

        // Then the chosen answers and the correct answers are compared
        for (let i = 0; i < chosenAnswers.length;i++) {
            for (let k = 0; k < correctAnswers.length; k++) {
                if (chosenAnswers[i] === correctAnswers[k]){
                    // and a point is added if there is a match. 
                    setCountCorrect(oldCount => oldCount + 1)
                }
            }
        }
    }

    // Creating question elements by mapping through the questions array.
    const questionElements = questions.map(q => {
        return (
            <div className="question--container" key={q.question}>
                <p className='question'>{q.question}</p>
                <div className="question--answers">
                    {/* There are a lot of functionality in the className part, deciding the style of the answer div at certain points of the game. */}
                    <div 
                        className={`answer ${q.answers[0].chosen && 'answer-hold'} ${q.answered && !q.answers[0].chosen && 'not-clickable'} ${gameCompleted && q.answers[0].correct && 'correct-answer'} ${gameCompleted && !q.answers[0].correct && q.answers[0].chosen && 'wrong-answer'} ${gameCompleted && !q.answers[0].correct && !q.answers[0].chosen && 'not-chosen'}`}
                        onClick={() => holdAnswer(q.id, q.answers[0].text)}
                    >
                        {q.answers[0].text}
                    </div>
                    <div 
                        className={`answer ${q.answers[1].chosen && 'answer-hold'} ${q.answered && !q.answers[1].chosen && 'not-clickable'} ${gameCompleted && q.answers[1].correct && 'correct-answer'} ${gameCompleted && !q.answers[1].correct && q.answers[1].chosen && 'wrong-answer'} ${gameCompleted && !q.answers[1].correct && !q.answers[1].chosen && 'not-chosen'}`}
                        id={2}
                        onClick={() => holdAnswer(q.id, q.answers[1].text)}
                    >
                        {q.answers[1].text}
                    </div>
                    <div 
                        className={`answer ${q.answers[2].chosen && 'answer-hold'} ${q.answered && !q.answers[2].chosen && 'not-clickable'} ${gameCompleted && q.answers[2].correct && 'correct-answer'} ${gameCompleted && !q.answers[2].correct && q.answers[2].chosen && 'wrong-answer'} ${gameCompleted && !q.answers[2].correct && !q.answers[2].chosen && 'not-chosen'}`}
                        id={3}
                        onClick={() => holdAnswer(q.id, q.answers[2].text)}
                    >
                        {q.answers[2].text}
                    </div>
                    <div 
                        className={`answer ${q.answers[3].chosen && 'answer-hold'} ${q.answered && !q.answers[3].chosen && 'not-clickable'} ${gameCompleted && q.answers[3].correct && 'correct-answer'} ${gameCompleted && !q.answers[3].correct && q.answers[3].chosen && 'wrong-answer'} ${gameCompleted && !q.answers[3].correct && !q.answers[3].chosen && 'not-chosen'}`}
                        id={4}
                        onClick={() => holdAnswer(q.id, q.answers[3].text)}
                    >
                        {q.answers[3].text}
                    </div>
                </div>
                <hr className='hr-new' />
        </div>
        )
    })
    
    return (
        <div className='quiz-page'>
            {/* Using an overlay until the questions are loaded */}
            {isCountdownVisible && 
            <div className='countdown-overlay'>
                <div>
                    <img src={loading} alt='loading icon'/>
                </div>
            </div>}
            <div className='quiz-page--container'>
                {questionElements}
            </div>
            {!gameCompleted &&<button className='quiz-page--btn' onClick={checkResults}>Check answers</button>}
            {gameCompleted && 
            <div className='play-again--box'>
                <p className='result-text'>You scored {countCorrect}/{typeof props.nrOfQuestions === 'undefined' ? '5' : props.nrOfQuestions} correct answers</p>
                <button className="quiz-page--btn play-again-btn" onClick={props.handleClick}>Play again</button>
            </div>}
        </div>
    )
} 