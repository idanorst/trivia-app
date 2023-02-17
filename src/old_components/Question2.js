import React from 'react'
import '../style.css'

export default function Question2(props) {
    const randomSortedAnswers = props.answers.sort(func)

    const question = props.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&Eacute;/g,'É').replace(/&ograve;/g, 'ò')


    function func(a, b){
        return 0.5 - Math.random()
    }

    function holdAnswer(id, answer) {
        /* setAnswers(oldAnswers => oldAnswers.map(a => {
            return a.id === id ? 
            {...a, clicked: !a.clicked} :
            a
        }))
        setAnswerMade(oldState => !oldState) */
        
        props.registerAnswer(value)
    }

    return (
        {/* <div className="question--container">
            <p className='question'>{question}</p>
            <div className="question--answers">
                {{answerElements}}
                <div 
                    className='answer'
                    style={style}
                    onClick={() => holdAnswer(1, randomSortedAnswers[0].text)}
                >
                    {randomSortedAnswers[0].text}
                </div>
                <div 
                    className='answer'
                    //style={props.style}
                    id={2}
                    onClick={() => holdAnswer(2, randomSortedAnswers[1].text)}
                >
                    {randomSortedAnswers[1].text}
                </div>
                <div 
                    className='answer'
                    //style={props.style}
                    id={3}
                    onClick={() => holdAnswer(3, randomSortedAnswers[2].text)}
                >
                    {randomSortedAnswers[2].text}
                </div>
                <div 
                    className='answer'
                    //style={props.style}
                    id={4}
                    onClick={() => holdAnswer(4, randomSortedAnswers[3].text)}
                >
                    {randomSortedAnswers[3].text}
                </div>
            </div>
            <hr className='hr-new' />
    </div> */}
    )
}