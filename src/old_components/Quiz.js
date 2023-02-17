import '../style.css';
import React from 'react'
import BlobRight from '../images/blobs_small.png'
import BlobLeft from '../images/blobs_small_2.png'
import Question from './Question.js'
import {nanoid} from 'nanoid'

export default function Quiz(props) {
    const chosenAnswers = []
   /*  const answers = [] */
    const [quizData, setQuizData] = React.useState([]) 
    const [correctAnswers, setCorrectAnswers] = React.useState([])
    const [gameCompleted, setGameCompleted] = React.useState(false)
    /* const [selectedAnswer, setSelectedAnswer] = React.useState('')
    const [result, setResult] = React.useState({
        score: 0, 
        correctAnswers: 0, 
        wrongAnswers: 0,
    }) */
    var buttonClicked = false
    /* var gameFinished = false */
    const [countCorrect, setCountCorrect] = React.useState(0)
    /* const [answersConfirmed, setAnswersConfirmed] = React.useState(false) */
    var buttonClicked = false
    

    React.useEffect(() => {
        async function getQuizData() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            const data = await res.json()
            setQuizData(data.results)

            var correctAnswerList = []
            for (let i = 0; i < 5; i++){
                var correct = data.results[i].correct_answer
                correctAnswerList.push(correct)
                
            }
            setCorrectAnswers(correctAnswerList)
        }
        getQuizData()  

    }, [])

    const questionElements = quizData.map(q => {
        return (
            <Question 
                key={nanoid()}
                question={q.question} 
                correctAnswer={q.correct_answer} 
                incorrectAnswers={q.incorrect_answers}
                mergedAnswers={[q.correct_answer, ...q.incorrect_answers]}
                //answerChosen={answerChosen}
                registerAnswer={registerAnswer}
                chosenAnswers={chosenAnswers}
                //answersConfirmed={answersConfirmed} 
                gameCompleted={gameCompleted}
                /* gameFinished={gameFinished} */
                quizData={quizData} 
            />
        )
    })

    function registerAnswer(ans) {
        var inList = false
        /* answers.push(ans) */
        /* setChosenAnswers({...chosenAnswers, [id]: ans}) */
        for (let i = 0; i < chosenAnswers.length; i++) {
            if (ans === chosenAnswers[i]){
                chosenAnswers.pop(ans)
                inList = true
            }
        }
        if (!inList) {
            chosenAnswers.push(ans)
        }
        
        
        /* console.log(chosenAnswers) */
    }

    function checkResults() {
        /* setAnswersConfirmed(true) */
        console.log("Cheking results")
        /* gameFinished = true */
        setGameCompleted(true)
        
        for (let i = 0; i < chosenAnswers.length;i++) {
            for (let k = 0; k < correctAnswers.length; k++) {
                if (chosenAnswers[i] === correctAnswers[k]){
                    console.log("Correct")
                    setCountCorrect(oldCount => oldCount + 1)
                }
            }
        }
        /* if (chosenAnswers[0] in correctAnswers){
            console.log("Correct")
            countCorrect += 1
        } */
        /* console.log(correctAnswers)
        console.log(gameFinished)
        console.log(countCorrect) */
    }


    

    /* function handleClick(id) {
        console.log("Answers checked")
        console.log(id)
    } */

    
    

    return (
        <div className='quiz-page'>
            <img className="blob-right" src={BlobRight}/>
            <div className='quiz-page--container'>
                {questionElements}
                {/* <Question id={nanoid()} question={quizData[0].question} answer={quizData[0].answers} answerChosen={answerChosen}/>
                <Question question={quizData[1].question} answer={quizData[1].answers} />
                <Question question={quizData[2].question} answesr={quizData[2].answers} />
                <Question question={quizData[3].question} answer={quizData[3].answers} />
                <Question question={quizData[4].question} answer={quizData[4].answers} /> */}
            </div>
            {!gameCompleted && <button className='quiz-page--btn' onClick={checkResults}>Check answers</button>}
            {gameCompleted && 
            <div className='play-again--box'>
                <p className='result-text'>You scored {countCorrect}/5 correct answers</p>
                <button className="quiz-page--btn play-again-btn" onClick={props.handleClick}>Play again</button>
            </div>}
            <img className="blob-left" src={BlobLeft}/>
        </div>
    )
}