import React from 'react'
import '../style.css'
import {nanoid} from 'nanoid'
import Answer from './Answer.js'


export default function Question(props) {
    const randomSortedAnswers = props.mergedAnswers.sort(func)
    
    const [oldAnswers, setOldAnswers] = React.useState()
    const [answers, setAnswers] = React.useState(props.gameCompleted ? oldAnswers : createAnswerElements())
    const [answerMade, setAnswerMade] = React.useState(false)
    /* const [correct, setCorrect] = React.useState(false)
    const [inCorrect, setInCorrect] = React.useState(false) */
    /* const [registeredAnswer, setRegisteredAnswer] = React.useState(false) */
    /* const [correctAnswer, setCorrectAnswer] = React.useState(false) */

    const question = props.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&Eacute;/g,'É').replace(/&ograve;/g, 'ò')

    

    function func(a, b){
        return 0.5 - Math.random()
    }

    function createAnswerElements() {
        const answerArray = []
        for (let i = 0; i < 4; i++){
        answerArray.push(generateNewAnswer(i))
        }
        return answerArray
    } 

    function generateNewAnswer(i) {
        return {
            value: randomSortedAnswers[i], 
            clicked: false, 
            id: nanoid(), 
            correct: randomSortedAnswers[i] === props.correctAnswer
        }
    }

   /*  function updateExcistingAnswers() {
        console.log(answers)
    } */
    console.log(answers)
   const answerElements = answers.map(a => {
        return (
            <Answer 
                key={a.id}
                value={a.value}
                clicked={a.clicked}
                id={a.id}
                holdAnswer={holdAnswer}
                correct={a.correct}
                correctAnswer={props.correctAnswer}
                // setChosenAnswer={props.setChosenAnswer}
                chosenAnswers={props.chosenAnswers}
                answerMade={answerMade}
                //correctAnswer={correctAnswer} 
                /* gameCompleted={props.gameCompleted} */
                /* gameFinished={props.gameFinished} */
                />
        )
    })
   
    
    

    function holdAnswer(id, value) {
        setAnswers(oldAnswers => oldAnswers.map(a => {
            return a.id === id ? 
            {...a, clicked: !a.clicked} :
            a
        }))
        setAnswerMade(oldState => !oldState)
        /* if (value === props.solution){
            setCorrectAnswer(true)
        } */
        props.registerAnswer(value)
        setOldAnswers(answers)
    }

    console.log(oldAnswers)

    /* if (props.answersConfirmed){
        for (let i = 0; i < answers.length; i++){
            if (answers[i].clicked){
                setRegisteredAnswer(answers[i].value)
            }
        }
        console.log(registeredAnswer)
    } */

   /*  function confirmAnswer(){
        
    } */

        
    /* if (props.answersConfirmed) {
        var confirmedAnswer
        confirmedAnswer = answers.map(a => {
            var answer
            if (a.clicked){
                answer = a.value
            }
            return answer
        }) 
        for (let i = 0; i < answers.length; i++){
            console.log(answers[i].clicked)
            if (answers[i].clicked){
                console.log(answers[i].value)
                confirmedAnswer = answers[i].value
            }
        }
        console.log(confirmedAnswer)
        props.answerChosen(props.id, confirmedAnswer)
    } */
    
    

    return (
        <div className="question--container">
            <p className='question'>{question}</p>
            <div className="question--answers">
                {answerElements}
                {/* <div 
                    className='answer'
                    style={style}
                    id={nanoid()}
                    onClick={() => props.handleClick(this.id)}
                >
                    {answers[0]}
                </div>
                <div 
                    className='answer'
                    style={style}
                    id={anwers[i]}
                    onClick={() => props.handleClick(this.id)}
                >
                    {answers[1]}
                </div>
                <div 
                    className='answer'
                    style={style}
                    id={nanoid()}
                    onClick={() => props.handleClick(this.id)}
                >
                    {answers[2]}
                </div>
                <div 
                    className='answer'
                    style={style}
                    id={nanoid()}
                    onClick={() => props.handleClick(this.id)}
                >
                    {answers[3]}
                </div> */}
            </div>
            <hr className='hr-new' />
        </div>
    )
}