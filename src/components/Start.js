import '../style.css';
import React from 'react'

export default function Start(props) {
    // Rendering out the start page with a title, a small description and a button. 
    return (
        <div className="start-page">
            <div className='start-page--container'>
                <h1 className='start-page--title'>Quizzical</h1>
                <p className='start-page--info'>This is a trivia quiz game. Let's get started!</p>
                <button className='start-page--btn' onClick={props.handleClick}>Start quiz</button>
            </div>
        </div>
    )
}