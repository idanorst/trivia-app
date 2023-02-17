import '../style.css';
import React from 'react'
import BlobRight from '../images/blobs_small.png'
import BlobLeft from '../images/blobs_small_2.png'
import {nanoid} from 'nanoid'

export default function Quiz(props) {
    const [chosenAnswers, setChosenAnswers] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [gameCompleted, setGameCompleted] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [countCorrect, setCountCorrect] = React.useState(0)

    React.useEffect(() => {
        async function getQuizData() {
            var http = "https://opentdb.com/api.php?encode=base64&amount=5&type=multiple"
            if (props.difficulty !== ""){
                http += `&difficulty=${props.difficulty}`
            }
            if (props.category !== ""){
                http += `&category=${props.category}`
            }
            const res = await fetch(http)
            const data = await res.json()
            setQuestions(data.results.map(question => {
                return {
                    question: atob(question.question),
                    id: nanoid(),
                    answered: false,  
                    answers: answerArray(question),
                }
            }))

            var correctAnswerList = []
            for (let i = 0; i < 5; i++){
                var correct = atob(data.results[i].correct_answer)
                correctAnswerList.push(correct)
                
            }
            setCorrectAnswers(correctAnswerList)
        }
        
        function answerArray(question) {
            var answers = []
            answers.push(atob(question.correct_answer))
            answers.push(atob(question.incorrect_answers[0]))
            answers.push(atob(question.incorrect_answers[1]))
            answers.push(atob(question.incorrect_answers[2]))

            answers.sort(func)

            const answerArray = answers.map(answer => { return {
                text: answer,
                chosen: false, 
                correct: answer === atob(question['correct_answer']) ? true : false
            }   
            })
            
            return answerArray
        }
        
        getQuizData()
    }, [props.difficulty, props.category])

    function func(a, b){
        return 0.5 - Math.random()
    }

    function holdAnswer(id, answer) {

        const newQuestions = questions.map(question => {
            if (question.id === id){
                const index = question.answers.findIndex($answer => $answer.text === answer)
                question.answers[index].chosen = !question.answers[index].chosen
                question.answered = !question.answered
            }
            return question
        })
       
        setQuestions(newQuestions)
        registerAnswer(answer)
    }

    const questionElements = questions.map(q => {
        return (
            <div className="question--container" key={q.question}>
                <p className='question'>{q.question}</p>
                <div className="question--answers">
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

    function registerAnswer(ans) {
        var inList = false
        var chosenAnswersList = chosenAnswers 
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

    function checkResults() {
        setGameCompleted(true)

        for (let i = 0; i < chosenAnswers.length;i++) {
            for (let k = 0; k < correctAnswers.length; k++) {
                if (chosenAnswers[i] === correctAnswers[k]){
                    console.log("Correct")
                    setCountCorrect(oldCount => oldCount + 1)
                }
            }
        }
    }
    
    return (
        <div className='quiz-page'>
            <img className="blob-right" alt="yellow-figure" src={BlobRight}/>
            <div className='quiz-page--container'>
                {questionElements}
            </div>
            {!gameCompleted && <button className='quiz-page--btn' onClick={checkResults}>Check answers</button>}
            {gameCompleted && 
            <div className='play-again--box'>
                <p className='result-text'>You scored {countCorrect}/5 correct answers</p>
                <button className="quiz-page--btn play-again-btn" onClick={props.handleClick}>Play again</button>
            </div>}
            <img className="blob-left" alt="blue-figure" src={BlobLeft}/>
        </div>
    )
} 