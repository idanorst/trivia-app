import '../style.css';
import React from 'react'
import Blob5 from '../images/blob5.png'
import Blobs from '../images/blobs.png'

export default function Start(props) {
    return (
        <div className="start-page">
            <img className='blob-right' alt="yellow-figure" src={Blob5} />
            <div className='start-page--container'>
                <h1 className='start-page--title'>Quizzical</h1>
                <p className='start-page--info'>This is a trivia quiz game. Let's get started!</p>
                <button className='start-page--btn' onClick={props.handleClick}>Start quiz</button>
            </div>
            
            <img className='blob-left' alt="blue-figure" src={Blobs} />
        </div>
    )
}