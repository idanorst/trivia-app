import React from 'react'
import '../style.css'


export default function Answer(props){
    var correctAnswer = false

    if (props.clicked && props.value === props.correctAnswer) {
        correctAnswer = true
    }

    /* console.log(props.gameFinished) */

    const style = {
        backgroundColor: 
            (!props.gameCompleted && props.clicked ? "#D6DBF5" : "white") || 
            (props.gameCompleted && 
                    (correctAnswer && "#94D7A2") || (!correctAnswer && "#F8BCBC")) || ("white")
    }

    const answer = props.value.replace(/&ndash;/g, '_').replace(/&#039;/g, "'")

    return (
        <div 
            className={`answer ${props.answerMade && !props.clicked && 'not-clickable'} `} 
            style={style}
            onClick={() => props.holdAnswer(props.id, answer)}>
            {answer}
        </div>
    )

}