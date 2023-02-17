import '../style.css'
import Blob5 from '../images/blob5.png'
import Blobs from '../images/blobs.png'
import Dropdown from './Dropdown.js'

export default function UserInput(props) {
    return (
        <div className="settings-page">
            <img className='blob-right' alt="yellow-figure" src={Blob5} />
            <div className='settings-page--container'>
                <h1 className="settings-page--title">User settings</h1>
                <div className='dropdown-box'>
                    <p className="settings-page--text">Choose category: </p>
                    <Dropdown 
                        placeHolder="Select..." options={props.categoryChoices}
                        onChange={(value) => props.registerCategory(value)}/>
                </div>
                <div className='dropdown-box'>
                    <p className="settings-page--text">Choose difficulty: </p>
                    <Dropdown 
                        placeHolder="Select..." options={props.difficultyChoices}
                        onChange={(value) => props.registerDifficulty(value)}/>
                </div>
                <button className='start-page--btn' onClick={props.handleClick}>Start quiz</button>
            </div>
            
            <img className='blob-left' alt="blue-figure" src={Blobs} />
        </div>
    )
}